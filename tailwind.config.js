/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'brand':'#33546c',
      },
      backgroundImage: {
        banner: `url('../public/image/banner.jpg')`
      }
    },
  },
  plugins: [],
}

