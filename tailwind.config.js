/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    borderRadius: {
      "4xl": "2rem", // 32px
      "5xl": "2.5rem", // 40px
      "6xl": "3rem", // 48px
      "7xl": "3.5rem", // 56px
      "8xl": "4rem", // 64px
      "9xl": "4.5rem", // 72px
      "10xl": "5rem", // 80px
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
