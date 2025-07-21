import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, _options) {
    config.output.publicPath = "auto";
    config.plugins.push(
      new NextFederationPlugin({
        name: "_mfe_live",
        // shareStrategy:'loaded-first',
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./page": "./src/pages/index.tsx",
          // "./app": "./src/pages/_app.tsx",
        },
        shared: {
          // react: { singleton: true, requiredVersion: false },
          // "react-dom": { singleton: true, requiredVersion: false },
        },
        // extraOptions: {
        //   exposePages: true,
        // },
      })
    );
    return config;
  },
};

export default nextConfig;
