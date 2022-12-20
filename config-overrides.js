const {
  override,
  addWebpackAlias,
  addBabelPlugins,
  addWebpackResolve,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackResolve({
    fallback: {
      fs: false,
      net: false,
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      url: require.resolve("url"),
    },
  }),

  addWebpackAlias({
    "@components": path.resolve(__dirname, "src", "components"),
    "@assets": path.resolve(__dirname, "src", "assets"),
    "@styles": path.resolve(__dirname, "src", "styles"),
    "@hooks": path.resolve(__dirname, "src", "hooks"),
    "@contexts": path.resolve(__dirname, "src", "contexts"),
  }),

  ...addBabelPlugins(["babel-plugin-styled-components"])
);
