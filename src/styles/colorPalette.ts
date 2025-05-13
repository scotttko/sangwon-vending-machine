import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --color-white: #ffffff;
    --color-black: #000000;
    --color-gray-50: #f6f6fa;
    --color-gray-100: #eeeff3;
    --color-gray-300: #bcbdc3;
    --color-gray-400: #9c9da4;
    --color-orange-300: #ffa98e;
    --color-orange-500: #ff6231;
    --color-red-50: #ffedee;
    --color-red-500: #f8323e;
  }
`

export const colors = {
  white: 'var(--color-white)',
  black: 'var(--color-black)',
  gray50: 'var(--color-gray-50)',
  gray100: 'var(--color-gray-100)',
  gray300: 'var(--color-gray-300)',
  gray400: 'var(--color-gray-400)',
  orange300: 'var(--color-orange-300)',
  orange500: 'var(--color-orange-500)',
  red50: 'var(--color-red-50)',
  red500: 'var(--color-red-500)',
}

export type Colors = keyof typeof colors
