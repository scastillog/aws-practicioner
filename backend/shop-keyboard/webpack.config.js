const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  plugins: [new Dotenv()],
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
};
