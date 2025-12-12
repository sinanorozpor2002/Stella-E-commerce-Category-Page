/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js,css}", "./*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
      screens: {
        xl: "1200px",
      },
    },
    screens: {
      xs: "380px",
      mobile: "574px",
      md: "768px",
      desktop: "992px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
