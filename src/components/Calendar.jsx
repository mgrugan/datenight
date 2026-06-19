import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "../data.js";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "../icons.jsx";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n) => String(n).padStart(2, "0");
const todayStr = () => {
  const n = new Date();
  return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`;
};
const fmtLong = (ds) => {
  const [y, m, d] = ds.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
};

export default function CalendarView({ plans, onRemove, onGoto }) {
  const [cursor, setCursor] = useState({ y: 2026, m: 6 }); // July 2026
  const [selected, setSelected] = useState(null);

  const byDate = useMemo(() => {
    const map = {};
    for (const p of plans) (map[p.date] ||= []).push(p);
    return map;
  }, [plans]);

  const first = new Date(cursor.y, cursor.m, 1);
  const startDow = first.getDay();
  const days = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const monthLabel = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const move = (dir) =>
    setCursor((c) => {
      let m = c.m + dir, y = c.y;
      if (m < 0) { m = 11; y--; }
      if (m > 11) { m = 0; y++; }
      return { y, m };
    });

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++)
    cells.push(`${cursor.y}-${pad(cursor.m + 1)}-${pad(d)}`);

  const sorted = [...plans].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="mx-auto max-w-4xl px-6 pt-14">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => move(-1)} aria-label="Previous month"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-cream/80 transition-colors hover:border-rose/60 hover:text-rose-soft">
          <ChevronLeft />
        </button>
        <AnimatePresence mode="wait">
          <motion.h2 key={monthLabel}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-display text-2xl font-medium sm:text-3xl">
            {monthLabel}
          </motion.h2>
        </AnimatePresence>
        <button onClick={() => move(1)} aria-label="Next month"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-cream/80 transition-colors hover:border-rose/60 hover:text-rose-soft">
          <ChevronRight />
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-7 bg-white/[0.03]">
          {DOW.map((d) => (
            <div key={d} className="py-2.5 text-center text-[0.66rem] font-bold uppercase tracking-[0.1em] text-cream/45">
              {d}
            </div>
          ))}
        </div>
        <motion.div key={monthLabel} className="grid grid-cols-7 gap-px bg-white/8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {cells.map((ds, i) => {
            if (!ds) return <div key={`e${i}`} className="min-h-[78px] bg-ink/60" />;
            const evs = byDate[ds] || [];
            const isToday = ds === todayStr();
            return (
              <button key={ds} onClick={() => setSelected(ds)}
                className={`flex min-h-[78px] flex-col gap-1 p-2 text-left transition-colors ${
                  evs.length ? "bg-white/[0.05]" : "bg-ink/80"
                } hover:bg-white/[0.08] ${isToday ? "ring-1 ring-inset ring-rose" : ""}`}>
                <span className={`text-xs font-semibold ${evs.length ? "text-cream" : "text-cream/45"}`}>
                  {Number(ds.slice(-2))}
                </span>
                <div className="flex flex-col gap-1">
                  {evs.slice(0, 2).map((e) => (
                    <span key={e.uid}
                      className="truncate rounded px-1.5 py-0.5 text-[0.62rem] font-medium text-cream"
                      style={{ background: `${CATEGORIES[e.category].accent}26`, borderLeft: `2px solid ${CATEGORIES[e.category].accent}` }}>
                      {e.title}
                    </span>
                  ))}
                  {evs.length > 2 && (
                    <span className="text-[0.6rem] text-cream/45">+{evs.length - 2} more</span>
                  )}
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* selected day panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div key={selected}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden">
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-display text-xl font-medium">{fmtLong(selected)}</h3>
              {(byDate[selected] || []).length === 0 ? (
                <p className="mt-2 text-sm text-cream/55">Nothing planned for this day yet.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {(byDate[selected] || []).map((e) => (
                    <PlanItem key={e.uid} plan={e} onRemove={onRemove} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* all plans */}
      <div className="mb-24 mt-10">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-amber">Your plans</span>
        <h2 className="font-display mt-1 text-2xl font-medium">All planned dates</h2>
        {sorted.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-cream/55">
            <p>No dates planned yet.</p>
            <p className="mt-1">
              Head to{" "}
              <button onClick={() => onGoto("ideas")} className="font-semibold text-rose-soft underline">
                Date Ideas
              </button>{" "}
              and start filling the calendar.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <AnimatePresence>
              {sorted.map((e) => {
                const dt = new Date(e.date + "T00:00");
                return (
                  <motion.div key={e.uid} layout
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                    className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="w-12 shrink-0 text-center">
                      <div className="font-display text-2xl leading-none text-rose-soft">{dt.getDate()}</div>
                      <div className="text-[0.62rem] uppercase tracking-wide text-cream/45">
                        {dt.toLocaleDateString("en-US", { month: "short" })}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-cream">{e.title}</div>
                      <div className="truncate text-sm text-cream/55">
                        {CATEGORIES[e.category].label}
                        {e.note ? ` · ${e.note}` : ""}
                      </div>
                    </div>
                    <RemoveBtn uid={e.uid} title={e.title} onRemove={onRemove} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanItem({ plan, onRemove }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/[0.04] p-3">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: CATEGORIES[plan.category].accent }} />
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-cream">{plan.title}</div>
        {plan.note && <div className="text-sm text-cream/55">{plan.note}</div>}
      </div>
      <RemoveBtn uid={plan.uid} title={plan.title} onRemove={onRemove} />
    </div>
  );
}

function RemoveBtn({ uid, title, onRemove }) {
  return (
    <button onClick={() => onRemove(uid)} aria-label={`Remove ${title}`}
      className="shrink-0 rounded-lg px-2 py-1 text-cream/40 transition-colors hover:bg-white/5 hover:text-rose">
      ✕
    </button>
  );
}
