module.exports = {
  // https://nextjs.org/docs/api-reference/next/legacy/image#remote-patterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos"
      }
    ]
  }
}
