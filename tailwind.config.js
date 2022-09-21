module.exports = {
  content: ["./index.html", "./src/**/*.{ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      dark: {
        deep: "#050d15",
        main: "#15171f",
        secondary: "#181b22",
        outstand: "#21242b",
      },
      white: "#ffffff",
      gold: "#f8d87e",
      silver: "#cbcbcb",
      bronze: "#d69f81",
      primary: {
        main: "#2b7fd5",
        outstand: "#4a6494",
      },
      secondary: {
        main: "#14b8a6",
      },
      current: "currentColor",
    },
    maxWidth: {
      1920: "1920px",
      1280: "1280px",
      40: "10rem",
    },
    minWidth: {
      20: "5rem",
    },
    extend: {
      strokeWidth: {
        3: "3px",
      },
      keyframes: {
        "delay-in": {
          "0%": { opacity: 0 },
          "99%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "loading-circle": {
          "0%": { "stroke-dasharray": "1px, 200px", "stroke-dashoffset": 0 },
          "50%": {
            "stroke-dasharray": "100px, 200px",
            "stroke-dashoffset": "-15px",
          },
          "100%": {
            "stroke-dasharray": "100px, 200px",
            "stroke-dashoffset": "-125px",
          },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 0.1 },
          "50%": { transform: "scale(1)", opacity: 0.3 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
      },
    },
  },
};
