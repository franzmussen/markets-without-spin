/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Episode articles now live under /essays. Preserve every old link.
      {
        source: "/podcast/:slug",
        destination: "/essays/:slug",
        permanent: true,
      },
      // Research pages consolidated into a single /research page.
      { source: "/research-notes", destination: "/research", permanent: true },
      {
        source: "/research-projects",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/ideas-in-progress",
        destination: "/research",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
