/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#E8F2FF',
          100: '#D1E4FF',
          200: '#A3C9FF',
          300: '#75ADFF',
          400: '#4792FF',
          500: '#1A77FF',
          600: '#0066CC',
          700: '#004C99',
          800: '#003366',
          900: '#001933',
        },
        indigo: {
          50: '#EBEAFF',
          100: '#D7D6FF',
          200: '#AFADFF',
          300: '#8785FF',
          400: '#5F5CFF',
          500: '#5856D6',
          600: '#4340A9',
          700: '#32307D',
          800: '#222052',
          900: '#111026',
        },
        pink: {
          50: '#FFE5EA',
          100: '#FFCCD5',
          200: '#FF99AB',
          300: '#FF6682',
          400: '#FF3358',
          500: '#FF2D55',
          600: '#CC2444',
          700: '#991B33',
          800: '#661222',
          900: '#330911',
        },
      },
      boxShadow: {
        'apple': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.05)',
        'apple-md': '0 4px 6px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 10px 25px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};