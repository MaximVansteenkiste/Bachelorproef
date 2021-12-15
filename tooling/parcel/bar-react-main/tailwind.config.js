module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#340404",
        card: {
          DEFAULT: "#580707",
          lighter: "#930c0c",
          light: "#ce1111",
          dark: "#1d0202",
        },
        title: "#fff",
        accent: "#d0ab00",
        green: "#5c8852",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
