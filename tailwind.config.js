/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ixonDark: "#001a34",
        ixonLight: "#b7d4ff",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-move': 'move 10s linear infinite',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translate(-20%, -20%)' },
          '100%': { transform: 'translate(20%, 20%)' },
        },
      },
    },
  },
  plugins: [],
}
