import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'class',
  theme: {
    theme: {
      extend: {
        colors: {
          primary: "#121212", // dark theme color
          secondary: "#f0f0f0", // light theme color
          accent: "#d92550", // accent color inspired by CleanDirty
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
