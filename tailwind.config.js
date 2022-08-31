/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Templates/*",
    "./public",
    "./views",
    "./views/*.pug",
    "./views/**/*.pug",
    "./public/**/*.{html,js}",
    "./public/**/*.{html,js}",
    "./Templates/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}