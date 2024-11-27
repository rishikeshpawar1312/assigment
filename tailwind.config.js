// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vrv-blue': '#1E88E5',
        'vrv-dark': '#283593'
      }
    },
  },
  plugins: [],
}