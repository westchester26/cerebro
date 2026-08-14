import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { background: "#191A1A", sidebar: "#131414", card: "#202222", border: "#2E3030", accent: "#20B8CD" } } },
  plugins: [],
};
export default config;
