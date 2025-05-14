import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            "cdn.jsdelivr.net",
            "avatars.githubusercontent.com",
            "sore-outrun.com",
        ],
    },
};

export default nextConfig;
