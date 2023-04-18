const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: {
          // lighter palette
          // "50": "#eeeeff",
          // "100": "#ddddfe",
          // "200": "#bbbbfd",
          // "300": "#9898fd",
          // "400": "#7676fc",
          // "500": "#5454fb",
          // "600": "#4343c9",
          // "700": "#323297",
          // "800": "#222264",
          // "900": "#111132"

          "50": "#e8e8eb",
          "100": "#d1d1d6",
          "200": "#a3a3ad",
          "300": "#767684",
          "400": "#48485b",
          "500": "#1a1a32",
          "600": "#151528",
          "700": "#10101e",
          "800": "#0a0a14",
          "900": "#05050a"
        }
      }
    }
  },

  plugins: [
      require('@tailwindcss/forms')
  ],
};

module.exports = config;