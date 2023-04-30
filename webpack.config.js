/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

checkEnvironmentVariables();

const config = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    publicPath: "/",
    clean: true,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /(test)/,
      },
      {
        test: /\.(ttf|eot|svg|png|jpe?g|gif)(\?[\s\S]+)?$/,
        exclude: /(test)/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        exclude: /(test)/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "New Project Template",
      template: path.resolve(__dirname, "public/index.html"),
      favicon: path.resolve(__dirname, "public/favicon.ico"),
    }),
    new Dotenv({
      defaults: true,
      systemvars: true,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
};

module.exports = (_, argv) => {
  const isEnvProduction = process.env.ENVIRONMENT === "production";

  if (isEnvProduction) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: "bundle-report.html",
      })
    );
  } else {
    config.mode = "development";
    config.devtool = "eval-source-map";
    config.devServer = {
      port: process.env.PORT || 8080,
      historyApiFallback: true,
      server: "http",
      hot: true,
    };
    config.stats = {
      errorDetails: true,
    };
  }

  return config;
};

function checkEnvironmentVariables() {
  dotenv.config();

  // eslint-disable-next-line prefer-destructuring
  const ENVIRONMENT = process.env.ENVIRONMENT;

  const missingOtherEnvVariables = Object.entries({
    ENVIRONMENT,
  }).filter(([, value]) => !value);
  if (missingOtherEnvVariables.length) {
    const names = missingOtherEnvVariables.map(([name]) => `    ${name}`).join("\n");
    console.warn(`Missing optional environment variables: \n${names}`);
  }
}
