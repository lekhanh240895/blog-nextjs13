/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF486A",
        secondary: "#7169FE",
      },
      keyframes: {
        slideUp: {
          "0%": {
            opacity: 100,
            transform: "translateY(calc(50%)) translateX(-50%)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(calc(50% + 10px)) translateX(-50%)",
          },
        },
        opacity: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 100,
          },
        },
      },
      animation: {
        slideUp: "slideUp 1s ease-in-out reverse",
      },
    },
  },
  plugins: [],
};
