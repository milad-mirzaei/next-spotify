/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spotify-clone.storage.c2.liara.space',
      },
    ],
  },
};

export default nextConfig;
