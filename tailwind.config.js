module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      dd: "#712222",
      white: 'hsl(39 50% 96%)',
      foreground: 'var(--color-foreground)',
      background: 'var(--color-background)',
    },
    screens: {
      sm: "320px",
      // => @media (min-width: 320px) { ... }
      md: "530px",
      // => @media (min-width: 375px) { ... }
      lg: "920px",
      // => @media (min-width: 768px) { ... }
      xl: "1024px",
      // => @media (min-width: 1024px) { ... }
      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      backgroundImage: {
        'golden-gradient': 'linear-gradient(135deg, hsl(36 80% 50%), hsl(40 70% 60%))',
        'primary': 'hsl(30, 80%, 50%)',
        'primary-foreground': 'hsl(39 50% 96%)',
        'muted': 'hsl(39 25% 90%)',
        'secondary': 'hsl(30 50% 85%)',
      }
    },
  },
  plugins: [],
};
