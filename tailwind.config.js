/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        normal: "0 0 10px rgba(0,0,0,0.2)",
      },
      colors: {
        primary: {
          50: "#ebf3f7",
          100: "#d8e7f0",
          200: "#a3c2d9",
          300: "#739cbf",
          400: "#2c5891",
          500: "#002060",
          600: "#001b57",
          700: "#001447",
          800: "#00103b",
          900: "#000a2b",
          950: "#00061c",
        },
        secondary: {
          50: "#fcf6f0",
          100: "#faece1",
          200: "#f0cbb4",
          300: "#e6a58a",
          400: "#d4563f",
          500: "#c00000",
          600: "#ad0000",
          700: "#8f0000",
          800: "#730000",
          900: "#570000",
          950: "#380000",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
