/** @type {import('next').NextConfig} */
import * as path from 'path';

const nextConfig = {
  reactStrictMode: true,
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
