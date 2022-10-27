/** @type {import('next').NextConfig} */
import * as path from 'path'
import pkg from './package.json' assert { type: 'json' }

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    version: pkg.version,
    defaultDataspaceId: 'ef347285-e52a-430d-9679-dcb76b962ce7'
  },
  output: 'standalone',
  webpack(config) {
    config.module.rules[2].oneOf?.forEach(one => {
      if (!`${one.issuer?.and}`.includes('_app')) return
      one.issuer.and = [path.resolve()]
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
