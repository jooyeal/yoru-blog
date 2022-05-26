/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URL:
      "mongodb+srv://sereyoru:Tjfflalsdk12!@cluster0.kdlus.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
