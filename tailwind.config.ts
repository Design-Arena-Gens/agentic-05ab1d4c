import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        oba: {
          primary: "#f97316",
          secondary: "#1f2937",
          accent: "#fb923c"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
