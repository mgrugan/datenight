import { motion } from "framer-motion";
import { CATEGORIES } from "../data.js";
import { Pin, Bus, Clock, Plus, ArrowUpRight, Calendar } from "../icons.jsx";

export default function Card({ item, onAdd }) {
  const cat = CATEGORIES[item.category];
  const isResto = item.category === "dinner";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.035] p-5 backdrop-blur-sm transition-colors hover:border-white/15"
    >
      {/* glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 24px 60px -28px ${cat.accent}` }}
      />

      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-cream/55">
          <span className="h-2 w-2 rounded-full" style={{ background: cat.accent }} />
          {cat.label}
        </span>
        {item.dateLabel && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[0.7rem] font-semibold text-cream/75">
            <Calendar width={12} height={12} style={{ color: cat.accent }} />
            {item.dateLabel}
          </span>
        )}
      </div>

      <h3 className="font-display mt-3 text-xl font-medium leading-snug text-cream">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/60">{item.blurb}</p>

      <div className="mt-4 space-y-1.5 text-[0.82rem] text-cream/55">
        <div className="flex items-start gap-2">
          <Pin className="mt-0.5 shrink-0 text-cream/40" />
          <span>{item.where}</span>
        </div>
        {item.transit && (
          <div className="flex items-start gap-2">
            <Bus className="mt-0.5 shrink-0 text-cream/40" />
            <span>{item.transit}</span>
          </div>
        )}
        {item.time && (
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 shrink-0 text-cream/40" />
            <span>{item.time}</span>
          </div>
        )}
      </div>

      {item.budget && (
        <div className="mt-4 rounded-xl bg-white/[0.04] px-3 py-2.5 text-[0.8rem] text-cream/70">
          <span className="font-semibold text-rose-soft">~$80 plan:</span> {item.budget}
        </div>
      )}

      <div className="mt-auto flex items-center gap-3 pt-5">
        <button
          onClick={() => onAdd(item)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose/90 px-3 py-2.5 text-sm font-bold text-ink transition-all hover:bg-rose"
        >
          <Plus />
          {isResto ? "Plan dinner" : "Add to calendar"}
        </button>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-cream/70 transition-colors hover:text-rose-soft"
        >
          {item.linkLabel || "Details"}
          <ArrowUpRight />
        </a>
      </div>
    </motion.article>
  );
}
