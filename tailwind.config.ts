import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
const flowbite = require("flowbite-react/tailwind")
import exifooTheme from "./theme"

export default {
    content: ["./src/**/*.{ts,tsx}", "flowbite.content()"],
    theme: {
        extend: {
            colors: exifooTheme.colors
        },
        screens: {
            xs: "360px",
            ...defaultTheme.screens
        },
        fontFamily: {
            logo: ["Space Grotesk"],
            marker: ["Permanent Marker"]
        },
        boxShadow: {
            apple: "0px 9px 20px 0px rgba(0, 0, 0, 60%)"
        }
    },
    plugins: [flowbite.content()]
} satisfies Config
