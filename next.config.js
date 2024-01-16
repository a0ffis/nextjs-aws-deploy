/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: process.env.API_ENDPOINT + ":" + process.env.API_PORT + "/api/:path*",
            },
            // {
            //     source: "/savelog",
            //     destination: process.env.LOGS_ENDPOINT + ":" + process.env.LOGS_PORT + "/savelog",
            // },
        ];
    },
};

module.exports = nextConfig;
