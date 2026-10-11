/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#bad2ff',
          300: '#7eafff',
          400: '#3c83ff',
          500: '#135bec',
          600: '#0644d4',
          700: '#0735ab',
          800: '#0c2e88',
          900: '#112b6f',
        },
        violet: {
          50: '#f7f4fe',
          100: '#eee9fe',
          200: '#ddd4fc',
          300: '#c1aff9',
          400: '#a17ff3',
          500: '#8450ec',
          600: '#6d2fe2',
          700: '#5c22c6',
          800: '#4e1da7',
          900: '#411b87',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
