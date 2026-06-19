/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"Satoshi"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0d0a0f",
        cream: "#f4ece8",
        rose: {
          DEFAULT: "#ff5d8f",
          soft: "#ffa1bf",
          deep: "#c0265b",
        },
        plum: "#1a121f",
        amber: "#ffb877",
      },
      keyframes: {
        "blob-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-5%, 4%) scale(0.96)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 18s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
