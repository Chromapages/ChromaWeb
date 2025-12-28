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
                    primary: "#3B82F6", // Blue
                    secondary: "#8B5CF6", // Violet
                    accent: "#10B981", // Emerald
                },
                surface: {
                    base: "#F8FAFC",
                    card: "#FFFFFF",
                    muted: "#F1F5F9",
                },
            },
            fontFamily: {
                heading: ["var(--font-montserrat)", "sans-serif"],
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
                elevated: "0 12px 40px -8px rgba(59, 130, 246, 0.15)",
                floating: "0 24px 64px -12px rgba(139, 92, 246, 0.2)",
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-12px)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
