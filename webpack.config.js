const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "example/index.ts"),
  output: {
    filename: "index.js",
    path: path.join(__dirname, "build")
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: [
          /node_module/
        ],
        options: {
          configFile: path.join(__dirname, "./tsconfig.json")
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}