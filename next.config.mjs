/** @type {import('next').NextConfig} */

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
const nextAuthUrl = process.env.NEXTAUTH_URL;
const apiGatewayUrl = process.env.APIGATEWAY_URL;
// const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
    env: {
        NEXTAUTH_SECRET: nextAuthSecret,
        NEXTAUTH_URL: nextAuthUrl,
        APIGATEWAY_URL: apiGatewayUrl,
    }
};

export default nextConfig;
