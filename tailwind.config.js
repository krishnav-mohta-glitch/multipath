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
        },
        obsidian: {
          950: '#0C100E',
          900: '#111714',
          800: '#19211C',
          750: '#202A24',
          700: '#26332C',
          600: '#32423A',
        },
        observatory: {
          950: '#080A0E', // Cosmic void canvas
          900: '#0D1117', // Deep observatory slate
          850: '#11161D', // Primary container dark
          800: '#161D26', // Graphite surface
          750: '#1C2430', // Elevated card surface
          700: '#243040', // Highlighted telemetry borders
          600: '#334155', // Muted dividers
        },
        ivory: {
          50: '#FAF9F5',  // Pure reading ivory
          100: '#F3F2EB', // Reading paper
          200: '#E8E7DF', // Sub-card paper
          300: '#DAD9CF', // Border paper
          400: '#B8B7AB',
          900: '#111613', // Deep ink on ivory
        },
        alabaster: {
          50: '#FBFBF7',
          100: '#F1F1E9',
          200: '#E8EAE1',
          300: '#DFE2D7',
          400: '#D0D4C7',
          500: '#B6BBAE',
        },
        lime: {
          DEFAULT: '#C8F36B',
          scientific: '#B8FF00',
          hover: '#A3E635',
          bright: '#D4FF5E',
          dim: '#9EC44D',
          glow: 'rgba(184, 255, 0, 0.20)',
          muted: '#283618',
        },
        quantum: {
          cyan: '#38BDF8',
          deep: '#0369A1',
          glow: 'rgba(56, 189, 248, 0.20)',
        },
        moss: {
          100: '#E7EDE8',
          200: '#CFDDD1',
          400: '#8DA391',
          500: '#5E7A65',
          700: '#384B3E',
          900: '#1D2A22',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
