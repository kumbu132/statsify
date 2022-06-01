/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"],
  },
  async redirects() {
    return [
      {
        source: "/callback",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
