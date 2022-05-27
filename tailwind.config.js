module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        128: "36rem",
      },
    },
    screens: {
      mobile: { max: "500px" },
    },
    fontFamily: {
      sourcecode: ['"Source Code Pro"'],
    },
  },
  plugins: [],
};
