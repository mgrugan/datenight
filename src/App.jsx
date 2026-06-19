import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ITEMS, FILTERS } from "./data.js";
import { usePlans } from "./usePlans.js";
import Hero from "./components/Hero.jsx";
import Card from "./components/Card.jsx";
import CalendarView from "./components/Calendar.jsx";
import Modal from "./components/Modal.jsx";
import Toast from "./components/Toast.jsx";

const TABS = [
  { key: "ideas", label: "Date Ideas" },
  { key: "calendar", label: "Calendar" },
];
const uid = () => Date.now() + "-" + Math.random().toString(36).slice(2, 7);
const fmtShort = (ds) => {
  const [y, m, d] = ds.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function App() {
  const [tab, setTab] = useState("ideas");
  const [filter, setFilter] = useState("all");
  const [pending, setPending] = useState(null); // item being scheduled
  const [toast, setToast] = useState("");
  const { plans, addPlan, removePlan, status } = usePlans();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const goto = (t) => {
    setTab(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visible = useMemo(
    () => (filter === "all" ? ITEMS : ITEMS.filter((i) => i.category === filter)),
    [filter]
  );

  const savePlan = (item, date, note) => {
    addPlan({ uid: uid(), itemId: item.id, title: item.title, category: item.category, date, note });
    setPending(null);
    setToast(`Saved — ${item.title} on ${fmtShort(date)}`);
  };
  const onRemove = (id) => {
    removePlan(id);
    setToast("Removed from your calendar");
  };
  const surprise = () => {
    goto("ideas");
    setPending(ITEMS[Math.floor(Math.random() * ITEMS.length)]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <button onClick={() => goto("ideas")} className="flex items-baseline gap-2.5">
            <span className="font-display text-xl font-semibold italic text-cream">Noor Date Nights</span>
            <span
              className="hidden items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-cream/40 sm:inline-flex"
              title={
                status === "live"
                  ? "Shared & synced across devices"
                  : status === "offline"
                  ? "Offline — showing saved plans"
                  : "Connecting…"
              }
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === "live"
                    ? "bg-emerald-400"
                    : status === "offline"
                    ? "bg-amber"
                    : "bg-cream/40"
                }`}
              />
              {status === "live" ? "Synced" : status === "offline" ? "Offline" : "Syncing"}
            </span>
          </button>

          <LayoutGroup id="tabs">
            <nav className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1">
              {TABS.map((t) => (
                <button key={t.key} onClick={() => goto(t.key)}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    tab === t.key ? "text-ink" : "text-cream/65 hover:text-cream"
                  }`}>
                  {tab === t.key && (
                    <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-rose"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {t.label}
                    {t.key === "calendar" && plans.length > 0 && (
                      <span className={`grid h-4 min-w-4 place-items-center rounded-full px-1 text-[0.6rem] font-bold ${
                        tab === "calendar" ? "bg-ink/20 text-ink" : "bg-rose text-ink"
                      }`}>
                        {plans.length}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </nav>
          </LayoutGroup>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {tab === "ideas" ? (
          <motion.main key="ideas"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Hero onSurprise={surprise} onCalendar={() => goto("calendar")} />

            <section className="mx-auto max-w-6xl px-6 pb-24">
              {/* Filters */}
              <LayoutGroup id="filters">
                <div className="mb-8 flex flex-wrap gap-2">
                  {FILTERS.map((f) => (
                    <button key={f.key} onClick={() => setFilter(f.key)}
                      className={`relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                        filter === f.key ? "border-rose text-ink" : "border-white/12 text-cream/65 hover:border-white/30 hover:text-cream"
                      }`}>
                      {filter === f.key && (
                        <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-rose"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                      )}
                      <span className="relative z-10">{f.label}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>

              <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visible.map((item) => (
                    <Card key={item.id} item={item} onAdd={setPending} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          </motion.main>
        ) : (
          <motion.main key="calendar"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <CalendarView plans={plans} onRemove={onRemove} onGoto={goto} />
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/8 py-8 text-center text-sm text-cream/40">
        Made for Noor · Pittsburgh, Summer 2026 · Plans are saved on this device.
      </footer>

      <Modal item={pending} onClose={() => setPending(null)} onSave={savePlan} />
      <Toast message={toast} />
    </div>
  );
}
