/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a2540',
          50: '#f0f4f8',
          100: '#d9e2ed',
          200: '#b3c5db',
          300: '#8da8c9',
          400: '#668bb7',
          500: '#406ea5',
          600: '#335784',
          700: '#264063',
          800: '#1a2942',
          900: '#0d1521',
        },
        accent: {
          DEFAULT: '#16a085',
          50: '#e8f6f3',
          100: '#d1ede7',
          200: '#a3dbd0',
          300: '#75c9b8',
          400: '#47b7a0',
          500: '#16a085',
          600: '#12806a',
          700: '#0d604f',
          800: '#094035',
          900: '#04201a',
        },
        tertiary: {
          DEFAULT: '#ff7f50',
          50: '#fff2ef',
          100: '#ffe5df',
          200: '#ffccbf',
          300: '#ffb29f',
          400: '#ff987f',
          500: '#ff7f50',
          600: '#cc6640',
          700: '#994c30',
          800: '#663320',
          900: '#331910',
        },
        semantic: {
          success: '#16a34a',
          warning: '#eab308',
          error: '#dc2626',
          info: '#0284c7',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #0a2540, #16a085)',
        'gradient-accent': 'linear-gradient(to right, #16a085, #47b7a0)',
        'gradient-tertiary': 'linear-gradient(to right, #ff7f50, #ffb29f)',
      }
    },
  },
  plugins: [],
};