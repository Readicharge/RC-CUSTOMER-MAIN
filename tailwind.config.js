/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx'], // Include other file types like js and jsx
  theme: {
    extend: {
      colors: {
        primaryGreen: '#94D034',
        primaryBlue: '#171f58',
        uiBlue: '#BCE0FD',
        lightGray: '#E8EEF5'
      }
    },
  },
  plugins: [],
}
