/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow : {
        'card': "0px 2px 8px rgba(40, 41, 61, 0.04), 0px 16px 24px rgba(96, 97, 112, 0.16)",
        'action-btn-shadow': "0px 8px 16px -6px rgba(254, 110, 6, 0.46)",
        'back-arrow' : "0px 8px 16px -6px rgba(254, 110, 6, 0.46)"
      },
      backgroundImage : {
        'arrow-back': "url('/images/check-tik.svg')",
        'action-btn-back': "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)"
      }
    },
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
          {
              'bg-gradient': (angle) => ({
                  'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
              }),
          },
          {
              // values from config and defaults you wish to use most
              values: Object.assign(
                  theme('bgGradientDeg', {}), // name of config key. Must be unique
                  {
                      10: '10deg', // bg-gradient-10
                      15: '15deg',
                      20: '20deg',
                      25: '25deg',
                      30: '30deg',
                      45: '45deg',
                      60: '60deg',
                      90: '90deg',
                      120: '120deg',
                      135: '135deg',
                      147: '147.14deg'
                  }
              )
          }
      )
    })
  ],
}
