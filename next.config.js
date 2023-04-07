module.exports = {
  // https://nextjs.org/docs/api-reference/next/legacy/image#remote-patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'ad-img.gmarket.com'
      },
      {
        protocol: 'https',
        hostname: 'hi.esmplus.com'
      }
    ]
  }
};
