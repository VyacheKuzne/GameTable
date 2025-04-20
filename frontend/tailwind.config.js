// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        'custom-blue': 'rgba(0, 193, 255, 1)',
        'custom-darkGray': 'rgba(49, 49, 49, 1)',
        'custom-red': 'rgba(248, 61, 86, 1)',
        'custom-green': 'rgba(44, 197, 151, 1)',
        'custom-fon-darkGray': 'rgba(86, 86, 86, 0.67)',
        'custom-btn-hover-red': 'rgba(201, 37, 59, 1)',
        'custom-btn-hover-green': 'rgba(32, 138, 106, 1)',

      },
    },
  },
  plugins: [],
};