/** @type {import('tailwindcss').Config} */
module.exports = {
  relative: true,
  content: [
    './src/app/components/**/*.{html,ts}',
    './src/app/pages/**/*.{html,ts}',
    './src/*.{html,ts}'
  ],
  theme: {
    extend: {},
    screens: {
      'md': '891px',
      'lg': '1114px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'purple': '#6366F1',
      'gray' : '#20262e',
      'light-gray' : '#2a323d',
    },
    plugins: [
      require('tailwindcss'),
      require('autoprefixer')
    ],
  }
}
