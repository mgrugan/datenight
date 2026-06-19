import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";

// localStorage acts as an offline cache / fallback so the app still shows the
// last-known plans if Supabase is ever unreachable.
const CACHE = "noorDateNights.plans.v3";
const loadCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE)) || [];
  } catch {
    return [];
  }
};
const saveCache = (p) => {
  try {
    localStorage.setItem(CACHE, JSON.stringify(p));
  } catch {
    /* ignore */
  }
};

const rowToPlan = (r) => ({
  uid: r.uid,
  itemId: r.item_id,
  title: r.title,
  category: r.category,
  date: r.date,
  note: r.note || "",
});
const planToRow = (p) => ({
  uid: p.uid,
  item_id: p.itemId,
  title: p.title,
  category: p.category,
  date: p.date,
  note: p.note || "",
});

export function usePlans() {
  const [plans, setPlans] = useState(loadCache);
  // "syncing" | "live" | "offline"
  const [status, setStatus] = useState("syncing");

  useEffect(() => {
    let active = true;

    supabase
      .from("plans")
      .select("*")
      .order("date", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setStatus("offline");
          return;
        }
        const mapped = (data || []).map(rowToPlan);
        setPlans(mapped);
        saveCache(mapped);
        setStatus("live");
      });

    const channel = supabase
      .channel("plans-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "plans" },
        (payload) =>
          setPlans((cur) =>
            cur.some((p) => p.uid === payload.new.uid)
              ? cur
              : [...cur, rowToPlan(payload.new)]
          )
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "plans" },
        (payload) =>
          setPlans((cur) => cur.filter((p) => p.uid !== payload.old.uid))
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => saveCache(plans), [plans]);

  // Optimistic add — realtime INSERT will dedupe by uid.
  const addPlan = async (plan) => {
    setPlans((cur) =>
      cur.some((p) => p.uid === plan.uid) ? cur : [...cur, plan]
    );
    const { error } = await supabase.from("plans").insert(planToRow(plan));
    if (error) setStatus("offline");
  };

  // Optimistic remove — realtime DELETE keeps other devices in sync.
  const removePlan = async (uid) => {
    setPlans((cur) => cur.filter((p) => p.uid !== uid));
    const { error } = await supabase.from("plans").delete().eq("uid", uid);
    if (error) setStatus("offline");
  };

  return { plans, addPlan, removePlan, status };
}
