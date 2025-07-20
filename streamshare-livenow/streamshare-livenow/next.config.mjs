import { NextFederationPlugin } from "@module-federation/nextjs-mf";
// import packageJson from './package.json' assert { type: "json" };

const nextConfig = {
  reactStrictMode: true,
  webpack(config, _options) {
    config.output.publicPath = "auto";

    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: `static/chunks/remoteEntry.js`,
        remotes: {
          remoteApp:
            "_mf_content@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};

export default nextConfig;
