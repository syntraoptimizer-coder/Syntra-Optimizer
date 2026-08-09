/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060609',
          900: '#0a0a0f',
          850: '#0f0f18',
          800: '#141420',
          750: '#1a1a2b',
          700: '#222238',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          cyan: '#06b6d4',
          glow: '#4f8ef7',
        },
        accent: {
          green: '#10b981',
          emerald: '#34d399',
          purple: '#a855f7',
          pink: '#ec4899',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'blur(30px) drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))' },
          '100%': { opacity: '0.85', filter: 'blur(45px) drop-shadow(0 0 35px rgba(59, 130, 246, 0.7))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.5deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.25), transparent 70%)',
      }
    },
  },
  plugins: [],
}
