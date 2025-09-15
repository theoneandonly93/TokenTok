/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: { allowedOrigins: ['*'] } },
  images: { domains: ['images.unsplash.com'] }
};
export default nextConfig;
