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
      },
    },
  },
  plugins: [],
};