import type { NextConfig } from "next";

// Where the résumé PDF actually lives (e.g. an S3/CloudFront or Vercel Blob URL).
// When set, /resume.pdf is proxied to it (same-origin, swappable, no redeploy to
// update the file). When unset, the local public/resume.pdf is served instead.
const resumeSource = process.env.RESUME_SOURCE_URL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    if (!resumeSource) return [];
    return {
      // beforeFiles so the proxied résumé overrides the local public/ fallback.
      beforeFiles: [
        {
          source: "/resume.pdf",
          destination: resumeSource,
        },
      ],
    };
  },
};

export default nextConfig;
