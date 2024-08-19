/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          // Customizing the default theme
          primary: "#debf59", // orange-500
          "primary-content": "#FFFFFF",
          secondary: "#000000", // black
          accent: "#FFCA62", // yellow
          neutral: "#3A3B46", //gray-600
          "base-100": "#FFFFFF", // Change this to the background color you want
          info: "#76D0FC",
          success: "#1CCD83",
          error: "#FA8AC0",
          warning: "#FFCA62",
        },
      },
    ],
  },
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      primary: "#debf59",
      black: "#000",
      white: "#fff",
      gray: {
        100: "#CBC6B6",
        200: "#cccccc",
        300: "#797256",
        400: "#413A4A",
        500: "#3B3447",
      },
      gold: {
        500: "#DEBF59",
        300: "#E5DEC0",
        200: "#F6F1E0",
        100: "#FAF9F4",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1500px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
