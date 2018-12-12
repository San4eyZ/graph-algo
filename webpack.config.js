module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: 3000
    },
    entry: "./app/index.ts",
    output: {
      filename: "bundle.js",
      path: __dirname + '/dist'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  };