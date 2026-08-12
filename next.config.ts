import './src/env'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
       
      },
      {
        protocol: 'https',
        hostname: 'example.com',
       
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
         pathname: '/**'
       
      },

    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },



};

export default nextConfig;
