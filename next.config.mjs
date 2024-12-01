/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    NEXT_PUBLIC_AVAGUARD_API_URL: 'https://avaguard-api-dgk8.vercel.app'
  }
};

// const nextConfig = {
//   reactStrictMode: false,
//   publicRuntimeConfig: {
//     NEXT_PUBLIC_AVAGUARD_API_URL: 'http://localhost:3500'
//   }
// };

export default nextConfig;
