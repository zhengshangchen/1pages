import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [
    typography(),
  ],
} satisfies Config;
