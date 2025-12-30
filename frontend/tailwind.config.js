/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'normal': '400',
        'semibold': '600',
        'bold': '700',
      },
    },
  },
  plugins: [],
};
