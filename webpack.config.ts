import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from "path";
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';

const config: webpack.Configuration & webpackDevServer.Configuration = {
  entry: "src/index.tsx",
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "src/**/*",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist/webpack"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "dist/webpack"),
    compress: true,
    port: 4000,
  },
};

export default config;