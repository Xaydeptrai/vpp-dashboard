/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    domains: ["sp-ao.shortpixel.ai", "res.cloudinary.com", "th.bing.com"],
  },
};

export default nextConfig;
