module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f7f7f7",
          text: "#1f2937",
          card: "#ffffff",
        },
        dark: {
          background: "#1e1e2f",
          text: "#e2e8f0",
          card: "#2a2a3d",
        },
      },
    },
  },
  plugins: [],
};
