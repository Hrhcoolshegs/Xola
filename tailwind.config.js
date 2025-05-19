/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0073b9',
          50: '#e6f3fa',
          100: '#cce7f5',
          200: '#99cff0',
          300: '#66b7ea',
          400: '#339fe5',
          500: '#0086df',
          600: '#0073b9',
          700: '#005a94',
          800: '#00426e',
          900: '#002947',
        },
        secondary: {
          DEFAULT: '#56c4c5',
          50: '#eef8f8',
          100: '#ddf1f1',
          200: '#bbe3e3',
          300: '#99d6d6',
          400: '#77c8c9',
          500: '#56c4c5',
          600: '#45a7a8',
          700: '#348687',
          800: '#246465',
          900: '#134243',
        },
        accent: {
          DEFAULT: '#ff9e1b',
          50: '#fff5e6',
          100: '#ffebcc',
          200: '#ffd799',
          300: '#ffc466',
          400: '#ffb033',
          500: '#ff9e1b',
          600: '#cc7a00',
          700: '#995b00',
          800: '#663d00',
          900: '#331e00',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #0a2540, #16a085)',
      },
    },
  },
  plugins: [],
};