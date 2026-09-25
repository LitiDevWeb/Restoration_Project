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
        // The legacy site exposed /contact; home is the canonical conversion
        // destination and carries the same NAP details and call to action.
        source: '/contact',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
