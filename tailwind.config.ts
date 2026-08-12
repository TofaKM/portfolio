import type { Config } from 'tailwindcss'

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
        // "cream" kept as the token name for the light neutral scale so
        // existing `bg-cream-*` usages across the app don't need touching —
        // only the underlying values changed, from warm cream to the cool
        // SUZA neutral (#F4F5F3 family).
        cream: {
          50:  '#FDFDFC',
          100: '#F4F5F3',
          200: '#ECEDEB',
          300: '#DCDFDD',
          400: '#C7CDCE',
        },
        navy: {
          DEFAULT: '#0F2436',
          2: '#16334F',
        },
        border:        '#DCDFDD',
        accent:        '#A2793F',
        'accent-dark': '#7C5A2E',
        'accent-tint': '#F1E7D8',
        ok: '#3E6B52',
        ink: {
          900: '#1B232B',
          700: '#33414C',
          500: '#5C6772',
          300: '#8A939C',
          100: '#C7CDCE',
        },
      },
      borderRadius: {
        doc: '2px',
      },
      animation: {
        'fade-up': 'fadeUp .4s ease forwards',
        'fade-in': 'fadeIn .3s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
