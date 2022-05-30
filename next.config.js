/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUDINARY_PRESET: "h3tknacx",
    CLOUDINARY_NAME: "duzum4r81",
    HOST_URL: "https://yoru-blog.vercel.app",
    // HOST_URL: "http://localhost:3000",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
