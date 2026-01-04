/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#dddddd',
        primary: '#000000', // Testo nero
      },
      fontFamily: {
        sans: ['"Helvetica Now Display"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      }
    },
  },
  plugins: [],
}
