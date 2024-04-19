/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html","./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      'sm': '640px', // Mobile
      'md': '768px', // Tablet
      'lg': '1024px', // Ordinateur portable
      'xl': '1280px', // Ordinateur de bureau
    },
    screens: {
      'sm': '640px', // Mobile
      'md': '768px', // Tablet
      'lg': '1024px', // Ordinateur portable
      'xl': '1280px', // Ordinateur de bureau
    },
    extend: {
      backgroundImage: {
        texture:
          "url('/src/assets/Texture 7.png')"
      },
      fontFamily: {
        'title': ['Anton', 'Poppins'],
      },
      colors: {
      "primary-color":"#206354",
      "secondary-color":"#FDF6E2",
      "accent-color":"#3FB099",
      "primary-background":"#FFFFFF",
      "secondary-background":"#FDF6E2",
      "primary-text":"#174a3f",
      "secondary-text":"#206354",
    },},
  },
  plugins: [require("daisyui"),
  require('tailwindcss'),
  require('autoprefixer'),],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ".btn":{
            "color": "white",
          },
          ".btn.btn-error.btn-outline:hover": {
            "color": "white",
          },
          ".btn.btn-success.btn-outline:hover": {
            "color": "white",
          },
          ".btn.btn-info.btn-outline:hover": {
            "color": "white",
          },
          ".btn.material-symbols-rounded":{
            "color": "#174a3f",
          },
          ".btn.btn-active": {
            "color": "black"
          }
        },
      },
    ],
  }
}

