/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    backgroundColor: ["responsive", "hover", "focus"],
    translate: ["responsive", "hover", "focus", "motion-safe"],
  },
}
