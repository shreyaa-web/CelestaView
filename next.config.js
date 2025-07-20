/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org", // Wikipedia
      "www.nasa.gov", // NASA official site
      "solarsystem.nasa.gov", // NASA Solar System Exploration
    ],
  },
};

module.exports = nextConfig;
