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
                brand: {
                    primary: "#23698C", // Teal
                    secondary: "#2C3892", // Dark Blue
                    ink: "#0F172A", // Slate 900
                    base: "#EFEFED", // Off-white
                    accent: "#1B526F", // Darker Teal (Hover)
                },
                surface: {
                    base: "#EFEFED",
                    card: "#FFFFFF",
                    muted: "#F8FAFC",
                },
            },
            fontFamily: {
                heading: ["var(--font-poppins)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
            borderRadius: {
                "4xl": "2rem",
            },
            boxShadow: {
                glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                card: "0 4px 24px -4px rgba(15, 23, 42, 0.08)",
                "card-hover": "0 8px 32px -4px rgba(15, 23, 42, 0.12)",
                elevated: "0 12px 40px -8px rgba(35, 105, 140, 0.15)",
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                marquee: "scroll 40s linear infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                scroll: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
