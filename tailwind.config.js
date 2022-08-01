/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        'theme-back': '#ffffff',
        'theme-font': '#000',
        'theme-font-sub': 'rgb(120, 120, 120)',
        'theme-button': '#333',
        'theme-main': 'rgb(0, 18, 64)',
        'theme-secondary': 'rgb(255, 80, 0)',
        'light-border': '#e6e7ec',
        'blue-highlight': '#0081ff',
      },
      fontFamily : {
        // 'noto' : ['"Noto Sans"', 'sans-serif']
        // 'noto' : '"Noto Sans", sans-serif'
        'noto' : '"Noto Sans Display", "Helvetica Neue", Helvetica, Arial, sans-seri'
      },
      boxShadow : {
        'btn-shadow' : 'rgba(0, 0, 0, 0.15) 0px 2px 6px 0px'
      },
      animation: {
        'accordion-spin': 'spin 1s linear 1',
        'content-open': 'accordion-open 1s linear 1',
        'content-close': 'accordion-close 1s linear 1',
      },
      keyframes: {
        'accordion-open': {
          '0%': { height : '0px' },
          '100%': { height : 'max-content' }
        },
        'accordion-close': {
          '0%': { height : 'max-content' },
          '100%': { height : '0px' }
        }
      }
    },
  },
  plugins: [],
}
