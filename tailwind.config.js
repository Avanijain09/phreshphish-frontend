/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#060C11', 900: '#0A131A', 800: '#0F1B24', 700: '#16262F', 600: '#22343F', 500: '#3A4F5C' },
        mist: { 100: '#E6EEF2', 300: '#B3C3CC', 400: '#8FA3AE' },
        mint: { 300: '#6EE7C0', 400: '#34D3A4', 500: '#14B88A', 600: '#0E9672' },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        sweep: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(350%)' } },
        rise: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { sweep: 'sweep 1.6s ease-in-out infinite', rise: 'rise .35s ease-out both' },
    },
  },
  plugins: [],
}
