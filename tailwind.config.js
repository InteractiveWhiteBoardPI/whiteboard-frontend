/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-clr-10": "rgba(255, 255, 255, 0.1)",
        "light-clr-20": "rgba(255, 255, 255, 0.2)",
        "light-clr-60": "rgba(255, 255, 255, 0.6)",
        "light-clr-80": "rgba(255, 255, 255, 0.8)",

        "dark-clr-30": "rgba(0, 0, 0, 0.3)",
        "dark-clr-50": "rgba(41, 41, 41, 1)",
        "dark-clr-70": "rgba(0, 0, 0, 0.7)",

        "label-clr" : "linear-gradient(108deg,_#F9FDFF_0.9%,_rgba(160,_160,_160,_0.90)_100.9%)",

        selected: "#6AC6FF",
      },
    },
    plugins: [require("daisyui")],
  },
};
