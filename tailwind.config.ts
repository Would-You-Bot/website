import { type Config } from "tailwindcss";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: "rgb(5, 152, 244)",
        customSecondary: "rgb(5, 152, 244)",
        customDarkBg1: "rgb(3, 122, 199)",
        customDarkBg2: "rgb(23, 23, 23)",
        customDarkBg3: "rgb(20, 20, 20)",
        customDarkBg3Hover: "rgb(55, 56, 62)",
        customContentSubtitle: "rgb(178, 184, 205)",
        customGrayBorder: "rgb(255,255,255,0.1)",
        customGrayText: "rgb(174, 178, 183)",
        customDarkBgTransparent: "rgb(31, 32, 35, 0.7)",
        customDarkBgTransparentDarker: "rgb(0,0,0,0.5)",
        customDarkBgTransparentLighter: "rgb(48, 49, 54, 0.7)",
        brand: {
          blue: { 100: "#0598F4", 200: "#037ac7", 300: "#016cb0" },
          red: { 100: "#F00605", 200: "#b60505", 300: "#9a0404" },
        },
      },
      dropShadow: {
        ["red-glow"]: ["2px 2px 10px #f00505"],
        ["blue-glow"]: ["2px 2px 10px #0598f6"],
        ["gold-glow"]: ["2px 2px 10px #eab308"],
      },
    },
    backgroundImage: {
      ["gradient-brand"]:
        "linear-gradient(to bottom right, #0598F4 0%,#F00605 100%)",
    },
  },
  plugins: [],
} satisfies Config;
