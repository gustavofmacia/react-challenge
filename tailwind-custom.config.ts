import type { Config } from "tailwindcss";

const tailwindCustomConfig: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "4.8rem",
        sm: "4.8rem",
        md: "0rem",
        lg: "0rem",
        xl: "0rem",
        "2xl": "0rem",
      },
    },
  },
};

export default tailwindCustomConfig;
