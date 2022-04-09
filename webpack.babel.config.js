const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Change variable to change names of output files.
let appName = "webapp";

module.exports = {
  entry: { main: path.resolve("./src/index.tsx") },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${appName}.js`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: `${appName}.html`,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    compress: true,
    server: "http",
    open: [`${appName}.html`],
    port: 8080,
  },
};
