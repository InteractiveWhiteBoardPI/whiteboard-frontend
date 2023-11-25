/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color":"#6A6A6A",
        "primary-dark":"rgba(0, 0, 0, 0.5)",
        "selected": "#6AC6FF"
      }
    },
    
  },
  daisyui: {

  },
  plugins: [require("daisyui")],
}