/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  darkMode: false,

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },

    extend: {
      colors: {
        brand: {
          DEFAULT: '#E5232B',
          50: '#FFF1F1',
          100: '#FFE0E1',
          200: '#FFC2C4',
          300: '#FF969A',
          400: '#F65C63',
          500: '#E5232B',
          600: '#C91922',
          700: '#A9141C',
          800: '#89151B',
          900: '#71171C',
        },

        ink: {
          DEFAULT: '#111111',
          50: '#F5F5F5',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#AFAFAF',
          400: '#777777',
          500: '#555555',
          600: '#3D3D3D',
          700: '#292929',
          800: '#1B1B1B',
          900: '#111111',
        },

        paper: {
          DEFAULT: '#F7F6F2',
          50: '#FCFBF8',
          100: '#F7F6F2',
          200: '#F0EEE8',
          300: '#E8E5DC',
          400: '#DCD8CE',
        },

        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F3F2EE',
          muted: '#ECEBE6',
          dark: '#171717',
        },

        line: {
          DEFAULT: '#E4E2DC',
          strong: '#CFCBC2',
          dark: '#262626',
        },

        success: {
          DEFAULT: '#168A3B',
          light: '#EAF7EE',
        },

        warning: {
          DEFAULT: '#D97706',
          light: '#FFF5E5',
        },
      },

      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        japanese: ['Noto Sans JP', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.6rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.05' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '0.98' }],
        '8xl': ['6rem', { lineHeight: '0.95' }],
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      letterSpacing: {
        editorial: '-0.055em',
        tightest: '-0.065em',
        tight: '-0.035em',
        normal: '0',
        wide: '0.04em',
        label: '0.22em',
      },

      borderRadius: {
        none: '0',
        xs: '0.25rem',
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        md: '0.625rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        pill: '9999px',
      },

      boxShadow: {
        soft: '0 2px 12px rgba(17,17,17,0.05)',
        card: '0 4px 18px rgba(17,17,17,0.06)',
        hover: '0 10px 28px rgba(17,17,17,0.10)',
        floating: '0 14px 40px rgba(17,17,17,0.12)',
        red: '0 6px 18px rgba(229,35,43,0.18)',
      },

      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      maxWidth: {
        content: '1440px',
        reading: '68ch',
        product: '560px',
      },

      zIndex: {
        header: '40',
        overlay: '50',
        modal: '60',
        toast: '70',
      },

      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },

      backgroundImage: {
        'manga-red-wash':
          'linear-gradient(115deg, transparent 0%, rgba(229,35,43,0.10) 48%, transparent 100%)',
      },
    },
  },

  plugins: [],
}
