import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import {
  black,
  gray,
  neutral,
  red,
  white,
} from 'tailwindcss/colors';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      current: 'currentColor',
      inherit: 'inherit',
      transparent: 'transparent',
      primary: '#464',
      black,
      white,
      gray,
      neutral,
      dark: neutral[800],
      light: neutral[100],
      danger: red[500],
    },
    extend: {
      spacing: {
        'titlebar-area-x': 'env(titlebar-area-x, 0)',
        'titlebar-area-y': 'env(titlebar-area-y, 0)',
        'titlebar-area-width': 'env(titlebar-area-width, 100%)',
        'titlebar-area-height': 'env(titlebar-area-height, 16rem)',
      },
    },
  },
  plugins: [
    forms,
  ],
} satisfies Config;
