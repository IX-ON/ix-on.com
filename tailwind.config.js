/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGrey: {
          950: '#0c0d10',
          900: '#121417',
          850: '#17191e',
          800: '#1e2127',
          700: '#2b2f38',
          600: '#3c424e',
        },
        beige: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E8DFD8',
          300: '#D8C7B8',
          400: '#C7B29F',
          500: '#B59E89',
          600: '#9C846F',
        },
        ixonDark: "#121417",
        ixonLight: "#E8DFD8",
        ixonAccent: "#D8C7B8",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-move': 'move 12s linear infinite',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translate(-15%, -15%)' },
          '50%': { transform: 'translate(15%, 15%)' },
          '100%': { transform: 'translate(-15%, -15%)' },
        },
      },
    },
  },
  plugins: [],
}
