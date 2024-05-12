import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'black',
        taskBackground: 'black',
        primary: {
          DEFAULT: '#0090FF',
          '80': '#33A7FF',
          '60': '#66BDFF',
          '40': '#99D3FF',
          '20': '#CCE9FF',
          '10': '#E5F4FF',
        },
        dark: {
          DEFAULT: 'black',
          '80': '#3D475C',
          '60': '#6E7585',
          '40': '#9EA3AD',
          '20': '#CFD1D6',
          '10': '#E7E8EB',
          '5': '#F3F4F5',
        },
        danger: {
          DEFAULT: '#FB5656',
          '80': '#FC7878',
          '60': '#FC9999',
          '40': '#FDBBBB',
          '20': '#FEDDDD',
          '10': '#FFEEEE',
        },
        warning: {
          DEFAULT: '#FF9141',
          '80': '#FFA767',
          '60': '#FFBD8D',
          '40': '#FFD3B3',
          '20': '#FFE9D9',
          '10': '#FFF4EC',
        },
        success: {
          DEFAULT: '#48BD77',
          '80': '#77DFA0',
          '60': '#99E7B8',
          '40': '#BBEFD0',
          '20': '#DDF7E7',
          '10': '#EEFBF3',
        },
      },
    },
    screens: {
      '3xl': '2000px',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
export default config;
