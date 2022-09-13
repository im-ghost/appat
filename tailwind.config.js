/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    "./public",
    "./views",
    "./views/*.pug",
    "./views/**/*.pug",
    "./public/**/*.{html,js}",
    "./public/**/*.{html,js}",
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}