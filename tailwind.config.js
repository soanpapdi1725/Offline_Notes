/** @type {import('tailwindcss').Config} */

import { platformSelect } from "nativewind/theme";
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        header: platformSelect({
          ios: "System",
          android: "sans-serif-condensed",
          default: "sans-serif",
        }),
        body: platformSelect({
          ios: "System",
          android: "sans-serif",
          default: "sans-serif",
        }),
      },
    },
  },
  plugins: [],
};
