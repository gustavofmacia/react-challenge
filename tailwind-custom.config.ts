import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        "DEFAULT": "1rem",
        "xs": "4.8rem",
        "sm": "4.8rem",
        "md": "0rem",
        "lg": "0rem",
        "xl": "0rem",
        "2xl": "0rem",
      },
    },
    extend: {
      fontSize: {
        "1.2xl": ["1.375rem", "1.625rem"],
        "2.6xl": ["1.625rem", "2.125rem"],
        "2.8xl": ["1.75rem", "2.125rem"],
        "4.2xl": ["2.5rem", "2.8rem"],
      },
    },
  },
} satisfies Config;
