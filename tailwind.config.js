/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-clr-10": "rgba(255, 255, 255, 0.1)",
        "light-clr-20": "rgba(255, 255, 255, 0.2)",
        "light-clr-30": "rgba(255, 255, 255, 0.3)",
        "light-clr-40": "rgba(255, 255, 255, 0.4)",
        "light-clr-50": "rgba(255, 255, 255, 0.5)",
        "light-clr-60": "rgba(255, 255, 255, 0.6)",
        "light-clr-70": "rgba(255, 255, 255, 0.7)",
        "light-clr-80": "rgba(255, 255, 255, 0.8)",
        "light-clr-90": "rgba(255, 255, 255, 0.8)",

        "dark-clr-10": "rgba(0, 0, 0, 0.1)",
        "dark-clr-20": "rgba(0, 0, 0, 0.2)",
        "dark-clr-30": "rgba(0, 0, 0, 0.3)",
        "dark-clr-40": "rgba(0, 0, 0, 0.4)",
        "dark-clr-50": "rgba(0, 0, 0, 0.5)",
        "dark-clr-60": "rgba(0, 0, 0, 0.6)",
        "dark-clr-70": "rgba(0, 0, 0, 0.7)",
        "dark-clr-80": "rgba(0, 0, 0, 0.8)",
        "dark-clr-90": "rgba(0, 0, 0, 0.8)",

        "label-clr":
          "linear-gradient(108deg, #F9FDFF_0.9%,_rgba(160,_160,_160,_0.90)_100.9%)",

        

        selected: "#6AC6FF",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "base-100": "#767676",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
