// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        iwish: {
          50: "#fdf7f5",
          100: "#faefe9",
          200: "#f4ddd3",
          300: "#efcbc0",
          400: "#e8b9aa",
          500: "#df9b85", // main accent - warm peach
          600: "#c67b65",
          700: "#9a5847",
          800: "#6e372b",
          900: "#452318",
        },
        neutralSoft: {
          50: "#fbfbfb",
          100: "#f6f6f6",
          200: "#ececec",
          300: "#dcdcdc",
          400: "#bdbdbd",
          500: "#8d8d8d",
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};