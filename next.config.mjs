/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    domains: ["uploadthing.com", "utfs.io"],
  },
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
};
export default nextConfig;
