const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist/w")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: false,
      templateParameters: { isDev: false }
    })
  ]
};
