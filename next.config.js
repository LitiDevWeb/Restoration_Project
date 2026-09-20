/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        // The legacy site exposed /contact; the estimate page is the canonical
        // conversion destination and carries the same NAP details.
        source: '/contact',
        destination: '/estimate',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
