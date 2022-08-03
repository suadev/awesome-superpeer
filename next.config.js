/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["picsum.photos", "superpeer.com", "batutest00.000webhostapp.com"],
  },
};

module.exports = nextConfig;
