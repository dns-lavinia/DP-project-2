module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": {
          "1": "#18191c",
          "2": "#202225",
          "3": "#2f3136",
          "4": "#36393f",
          "5": "#4f545c",
        }
      }
    },
  },
  plugins: [],
}