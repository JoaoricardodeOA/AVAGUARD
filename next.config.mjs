/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    NEXT_PUBLIC_AVAGUARD_API_URL: 'https://avaguard-api.vercel.app'
  }
};

export default nextConfig;
