/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#393E46",
        third: "#00ADB5",
        fourth: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
