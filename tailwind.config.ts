import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightbg': '#2F2F2F',
        'textcolor': '#8D8D8D',
        'gray-1': '#242424', // Main background
        'gray-2': '#181818', // Side bar background
        'gray-3': '#2F2F2F', // Button backgrounds
        'gray-4': '#212121', // Hover backgrounds
        'gray-5': '#8D8D8D', // Light hint/label color
        'gray-6': '#767676', // Icon gray color
        'gray-7': '#454545', // Divider color
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
