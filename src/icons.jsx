const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Pin = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

export const Bus = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <rect x="4" y="5" width="16" height="11" rx="2" />
    <path d="M4 11h16M8 16v2M16 16v2" />
  </svg>
);

export const Clock = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Plus = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </svg>
);

export const Calendar = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M4 10h16M8 3v4M16 3v4" />
  </svg>
);

export const Close = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
