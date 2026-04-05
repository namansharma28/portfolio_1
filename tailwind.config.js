/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Inspiration3 exact colors
        primary: 'oklch(84.42% 0.19 202.24)', // Blue accent from inspiration3
        accent: 'oklch(84.42% 0.19 202.24)',
        background: 'var(--background)',
        backgroundLight: 'var(--backgroundLight)',
        text: 'var(--text)',
        textTitle: 'var(--textTitle)',
        textBody: 'var(--textBody)',
        textLight: 'var(--textLight)',
        error: 'var(--error)',
        black: 'var(--black)',
        white: 'var(--white)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'reveal': 'reveal 1.5s var(--bezierFastoutSlowin) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '50%': { transform: 'scale3d(1, 1, 1)' },
          '100%': { transform: 'scale3d(0, 1, 1)' },
        },
      },
      spacing: {
        'space-xs': 'var(--spaceXS)',
        'space-s': 'var(--spaceS)',
        'space-m': 'var(--spaceM)',
        'space-l': 'var(--spaceL)',
        'space-xl': 'var(--spaceXL)',
        'space-2xl': 'var(--space2XL)',
        'space-3xl': 'var(--space3XL)',
        'space-outer': 'var(--spaceOuter)',
      },
      transitionDuration: {
        'xs': 'var(--durationXS)',
        's': 'var(--durationS)',
        'm': 'var(--durationM)',
        'l': 'var(--durationL)',
        'xl': 'var(--durationXL)',
      },
      transitionTimingFunction: {
        'fast-out-slow-in': 'var(--bezierFastoutSlowin)',
      },
    },
  },
  plugins: [],
}