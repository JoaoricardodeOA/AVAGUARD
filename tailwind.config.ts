const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        "neutral-black": '#263238',
        "neutral-dGrey": '#4D4D4D',
        "neutral-grey": '#717171',
        "neutral-lGrey": '#89939E',
        "neutral-grey-blue": '#ABBED1',
        "neutral-silver": '#ABBED1',
        primary: "#5360f5",
        secondary: "#263238",
        "dark-blue": '#092641',
        "shade-1": "#7380f7",
        "shade-2": "#6572f6",
        "shade-3": "#5360f5",
        "shade-4": "#4a57db",
        "shade-5": "#414DC1",
        "tint-1": "#6f7af7",
        "tint-2": "#8b94f9",
        "tint-3": "#a7adfb",
        "tint-4": "#c3c7fd",
        "tint-5": "#dfe1ff",
        "action-waring": "#FBC02D",
        "action-error": "#E53835",
        "action-success": "#2E7D31",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}