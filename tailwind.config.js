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
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#a3b8fc',
          400: '#718df8',
          500: '#4a64f2',
          600: '#3445e5',
          700: '#2833cc',
          800: '#242ba4',
          900: '#222881',
          950: '#14174d',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5eee7',
          200: '#cbddd0',
          500: '#487c5b',
          700: '#335841',
        },
        amberwarm: {
          50: '#fefbf3',
          100: '#fdf6e2',
          200: '#faeac3',
          500: '#d98b18',
          700: '#a8610a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
