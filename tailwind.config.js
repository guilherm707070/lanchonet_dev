/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily:{
      'sans':['Robot','sans-serif']
    },
    extend: {
      backgroundImage:{
        "home":"url('/src/img/bg02.png')"
      }
    }
  },
  plugins: [],
}

