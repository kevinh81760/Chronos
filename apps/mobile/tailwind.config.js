/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
      },
      fontFamily: {
        'mysl-bold-italic': ['MySL-BoldItalic'],
        'montserrat': ['Montserrat'],
        'montserrat-medium': ['Montserrat-Medium'],
        'montserrat-semibold': ['Montserrat-SemiBold'],
        'montserrat-bold': ['Montserrat-Bold'],
      },
    },
  },
  plugins: [],
}

