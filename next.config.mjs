/** @type {import('next').NextConfig} */
import * as path from 'path';
import pkg from './package.json' assert { type: "json" };

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    version: pkg.version
  },
  output: 'standalone',
  webpack(config) {
    config.module.rules[2].oneOf?.forEach((one) => {
      if (!`${one.issuer?.and}`.includes('_app')) return;
        one.issuer.and = [path.resolve()];
    });
    return config;
  },
}

export default nextConfig
