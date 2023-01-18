/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        second: '#2563ed'
      }
    },

  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
