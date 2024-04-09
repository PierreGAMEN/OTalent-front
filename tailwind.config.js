/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html","./src/**/*.{html,js,jsx,tsx}"],
  theme: {
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
      "secondary-color":"#F4E6BC",
      "accent-color":"#C5E7E0",
      "primary-background":"#FFF",
      "secondary-background":"#FDF6E2"
    },},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  }
}

