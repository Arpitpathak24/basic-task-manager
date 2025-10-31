/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#3b82f6", // Tailwind blue-500
        accent: "#2563eb",  // Blue-600
        lightBg: "#f9fafb",
        darkText: "#111827",
        lightText: "#6b7280",
      },
    },
  },
  plugins: [],
};
