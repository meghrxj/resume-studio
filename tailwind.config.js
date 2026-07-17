/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F3F5F7",
        surface: "#FFFFFF",
        ink: "#1C2430",
        muted: "#5D6875",
        line: "#E3E8ED",
        pine: {
          DEFAULT: "#0E6B4E",
          dark: "#0A5740",
          soft: "#E6F2ED",
        },
        clay: {
          DEFAULT: "#B4690E",
          soft: "#F8EEDF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sheet: "0 1px 2px rgba(16,24,40,.06), 0 12px 32px -12px rgba(16,24,40,.18)",
        card: "0 1px 2px rgba(16,24,40,.05)",
      },
    },
  },
  plugins: [],
};
