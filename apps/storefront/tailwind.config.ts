import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#f2f8f4',
          100: '#e1efe6',
          200: '#c5dfd0',
          300: '#9cc7b0',
          400: '#6da98c',
          500: '#4a8d6e',
          600: '#387157',
          700: '#2d5a46',
          800: '#264839',
          900: '#1b3429',
          950: '#0d1d17',
        },
        warm: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8ded2',
          300: '#d7c5b3',
          400: '#c2a792',
          500: '#ad8b73',
          600: '#99745d',
          700: '#7f5e4b',
          800: '#674d3f',
          900: '#543f35',
        },
      },
    },
  },
  plugins: [],
}

export default config
