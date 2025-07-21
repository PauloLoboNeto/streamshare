import { NextFederationPlugin } from "@module-federation/nextjs-mf";


const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  distDir: "build",
  webpack(config, _options) {
    config.output.publicPath = "auto";

    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: `static/chunks/remoteEntry.js`,
        remotes: {
          remoteApp:
            "_mfe_live@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        },
        shared: {
          // 'rxjs': {singleton: true, requiredVersion: false },
          // react: { singleton: true, requiredVersion: false },
          // "react-dom": { singleton: true, requiredVersion: false },
            // 'next/router': { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};

export default nextConfig;
