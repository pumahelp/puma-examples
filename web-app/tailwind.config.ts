import type { Config } from "tailwindcss";
import tailwindColors from "tailwindcss/colors";

const mainColor: keyof typeof tailwindColors = "orange"; 

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...tailwindColors[mainColor],
          DEFAULT: tailwindColors[mainColor][500]
        }
      }
    },
  },
  plugins: [],
};
export default config;
