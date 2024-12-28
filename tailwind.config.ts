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
        }
    },
    plugins: [flowbite.content(), require("tailwindcss-motion")]
} satisfies Config
