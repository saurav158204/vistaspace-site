/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm paper ground
        paper: {
          DEFAULT: '#F4F1EA',
          raised: '#FAF8F3',
          sunk: '#EBE7DD',
        },
        ink: {
          DEFAULT: '#111111',
          soft: '#2A2A28',
          muted: '#6B6B66',
          faint: '#9B9B94',
        },
        hairline: {
          DEFAULT: '#DEDAD1',
          strong: '#CCC7BA',
        },
        // Reserved: live status only, inside the dashboard.
        signal: '#FF6A00',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
      },
      maxWidth: {
        prose: '600px',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.8)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
