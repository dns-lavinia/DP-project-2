module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": {
          "1": "#202225",
          "2": "#2f3136",
          "3": "#292b2f",
          "4": "#36393f",
        },
        "button": {
          "1": "#4f545c",
          "2": "#686d73",
          "3": "#b9bbbe",
        }
      },
      fontFamily: {
        'site': ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        'max-1': 'repeat(1, max-content)',
        'max-2': 'repeat(2, max-content)',
        'max-3': 'repeat(3, max-content)',
        'max-4': 'repeat(4, max-content)',
        'max-5': 'repeat(5, max-content)',
        'max-6': 'repeat(6, max-content)',
      }
    },
    variants: {
      backgroundColor: ({ after }) => after(['odd'])
    },
  },
  plugins: [],
}