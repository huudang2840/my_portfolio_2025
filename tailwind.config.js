/** @type {import('tailwindcss').Config} */
const config = {
  content: [ "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}" ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS variables
        'bg-primary': 'rgb(var(--bg-primary) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
        'bg-tertiary': 'rgb(var(--bg-tertiary) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--text-tertiary) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        'border-primary': 'rgb(var(--border-primary) / <alpha-value>)',

        // Keep existing color palettes for specific uses
        brand: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a"
        },
        accent: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a"
        },
        ocean: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a"
        },
        sky: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a"
        }
      },
      fontFamily: {
        sans: [ "var(--font-inter)" ],
        display: [ "var(--font-unbounded)" ]
      },
      boxShadow: {
        'soft': "0 10px 40px rgba(2,6,23,.08)",
        'glow': "0 0 20px rgba(59, 130, 246, 0.4)",
        'glow-lg': "0 0 40px rgba(59, 130, 246, 0.5)",
        'glow-ocean': "0 0 20px rgba(20, 184, 166, 0.3)",
        'glow-sky': "0 0 30px rgba(96, 165, 250, 0.3)"
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        slideUp: {
          '0%': {transform: 'translateY(20px)', opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'}
        },
        float: {
          '0%, 100%': {transform: 'translateY(0px)'},
          '50%': {transform: 'translateY(-10px)'}
        }
      }
    },
  },
  plugins: [],
};
export default config;
