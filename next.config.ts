import type { NextConfig } from "next"

module.exports = {
    webpack(config: NextConfig) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"]
        })

        return config
    }
}
