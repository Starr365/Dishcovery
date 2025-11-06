/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        accent: '#F1FA8C',
        secondary: '#2A9D8F',
        cream: '#FFF8E7',
        textbrown: '#3A2E2E',
      },
    },
  },
  plugins: [],
}


