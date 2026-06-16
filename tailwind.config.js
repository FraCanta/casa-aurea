/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
      fxl: "120rem",
    },
    extend: {
      colors: {
        ivory: "#f7f2e9",
        paper: "#fbf8f1",
        ink: "#171b14",
        muted: "#5d5a50",
        olive: "#8e8456",
        forest: "#183126",
      },
      fontFamily: {
        serif: ['"Baskerville"', '"Libre Baskerville"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Manrope"', '"Inter"', '"Avenir Next"', '"Segoe UI"', "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 70px rgba(23, 27, 20, 0.08)",
      },
    },
  },
  plugins: [],
};
