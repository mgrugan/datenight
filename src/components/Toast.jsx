import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 16, x: "-50%" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-[60] flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-cream shadow-2xl backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <span className="h-2 w-2 rounded-full bg-rose" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
