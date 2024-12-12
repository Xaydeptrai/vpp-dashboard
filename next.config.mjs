/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.pexels.com",
        },
      ],
      domains: ['sp-ao.shortpixel.ai'],
    },
};

export default nextConfig;
