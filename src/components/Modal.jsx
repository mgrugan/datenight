import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DEFAULT_DATE } from "../data.js";
import { Close } from "../icons.jsx";

export default function Modal({ item, onClose, onSave }) {
  const [date, setDate] = useState(DEFAULT_DATE);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (item) {
      setDate(item.date || DEFAULT_DATE);
      setNote("");
    }
  }, [item]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-plum p-7 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-cream/50 transition-colors hover:text-cream"
            >
              <Close />
            </button>

            <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-amber">
              Add to calendar
            </span>
            <h3 className="font-display mt-2 text-2xl font-medium leading-snug text-cream">
              {item.title}
            </h3>

            <label
              htmlFor="date-input"
              className="mt-6 block text-sm font-semibold text-cream/80"
            >
              Which day?
            </label>
            <input
              id="date-input"
              type="date"
              value={date}
              min="2026-01-01"
              max="2027-12-31"
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-cream outline-none focus:border-rose"
            />

            <label
              htmlFor="note-input"
              className="mt-4 block text-sm font-semibold text-cream/80"
            >
              A note (optional)
            </label>
            <textarea
              id="note-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. 7pm reservation, bring a blanket…"
              className="mt-2 min-h-[64px] w-full resize-y rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-cream outline-none placeholder:text-cream/35 focus:border-rose"
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-cream/80 transition-colors hover:border-white/30"
              >
                Cancel
              </button>
              <button
                onClick={() => date && onSave(item, date, note.trim())}
                className="flex-1 rounded-xl bg-rose px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-rose-soft"
              >
                Save date
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
