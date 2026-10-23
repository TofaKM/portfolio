import type { Config } from 'tailwindcss'

/** A themed colour: RGB channels from a CSS variable (light/dark values in globals.css). */
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use CSS variables injected by next/font — guaranteed zero flash
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)', 'monospace'],
      },
      colors: {
        // Light neutral scale (page and section backgrounds). Themed.
        cream: {
          50:  v('cream-50'),
          100: v('cream-100'),
          200: v('cream-200'),
          300: v('cream-300'),
          400: v('cream-400'),
        },
        // Cards, inputs, tiles — white in light mode. Use this, not bg-white,
        // for anything that should go dark in dark mode.
        surface:       v('surface'),
        border:        v('border'),
        accent:        v('accent'),
        'accent-dark': v('accent-dark'),
        'accent-tint': v('accent-tint'),
        ok:            v('ok'),
        // Primary action (buttons, contact button, active filter): navy in
        // light mode, gold in dark mode so it still stands out.
        primary:         v('primary'),
        'primary-hover': v('primary-hover'),
        'on-primary':    v('on-primary'),
        ink: {
          900: v('ink-900'),
          700: v('ink-700'),
          600: v('ink-600'),
          500: v('ink-500'),
          400: v('ink-400'),
          300: v('ink-300'),
          100: v('ink-100'),
        },
        // The navbar stays navy in both themes — fixed values.
        navy: {
          DEFAULT: '#0F2436',
          2: '#16334F',
        },
        // Muted link text on the navy bar
        mist: '#B7C4D2',
      },
      borderRadius: {
        doc: '2px',
      },
    },
  },
  plugins: [],
}
export default config
