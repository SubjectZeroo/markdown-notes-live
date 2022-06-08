module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      0: "0",
      "1/4": "25vh",
      "1/2": "50vh",
      "3/4": "75vh",
      full: "100vh",
    },
  },
  variants: {},
  plugins: [],
};
