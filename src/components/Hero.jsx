import { motion } from "framer-motion";
import { Sparkle, Calendar } from "../icons.jsx";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ onSurprise, onCalendar }) {
  return (
    <section className="relative overflow-hidden">
      {/* animated gradient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-rose/30 blur-[120px] animate-blob-drift" />
        <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-amber/20 blur-[100px] animate-blob-drift [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-rose-deep/30 blur-[110px] animate-blob-drift [animation-delay:-11s]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center sm:pt-32"
      >
        <motion.span
          variants={rise}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-rose-soft"
        >
          <Sparkle width={13} height={13} /> For Noor · Pittsburgh
        </motion.span>

        <motion.h1
          variants={rise}
          className="font-display mt-7 text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl"
        >
          Pick a date,
          <br />
          <span className="text-gradient italic animate-shimmer">make a memory.</span>
        </motion.h1>

        <motion.p
          variants={rise}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70"
        >
          A curated collection of date ideas, restaurants and July 2026 events —
          all a short walk, bus or drive from Pitt's campus. Find something you
          love and drop it onto your calendar.
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            onClick={onSurprise}
            className="group inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-bold text-ink transition-all hover:bg-rose-soft hover:shadow-[0_0_30px_-6px] hover:shadow-rose"
          >
            <Sparkle className="transition-transform group-hover:rotate-90" />
            Surprise me
          </button>
          <button
            onClick={onCalendar}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-cream transition-colors hover:border-rose/60 hover:text-rose-soft"
          >
            <Calendar />
            View calendar
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
