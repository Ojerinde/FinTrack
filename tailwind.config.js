/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fcfdfd",
        "card-bg": "#ECF1F2",
        "sidebar-active": "#DFE7E9",
        "sidebar-text-active": "#3a6c7b",
        "primary-dark": "#1b2528",
        "deep-dark": "#020303",
        "primary-grey": "#6D787C",
        "primary-medium": "#15272d",
        "primary-light": "#3e7383",
        "primary-accent": "#437d8e",
        "button-bg": "#4b8b9f",
        "sidebar-inactive": "#1b2528",
        "table-header": "#15272d",
        "success-color": "#10b981",
        "dot-color": "#087A2E",
        "error-color": "#C6381B",
        "share-text": "#020303",
        foreground: "#1b2528",
      },
      fontFamily: {
        sans: ["Public Sans", "sans-serif"],
        mono: ["Public Sans", "sans-serif"],
      },
    },
  },
};
