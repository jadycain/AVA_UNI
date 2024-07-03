const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _VARIABLES = {
  IMG_PREFIX_URL: "123",
};

global.importi18nJSON = (lang) => {
  const jsonPath = path.resolve(__dirname, `./src/locales/${lang}.json`);
  return JSON.parse(fs.readFileSync(jsonPath));
};

const createPugHtmlLoaderOptions = (customData = {}) => {
  const options = {
    data: {
      ...customData,
    },
    pretty: true,
    globals: [],
  };
  return JSON.stringify(options);
};

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3001,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    assetModuleFilename: "[path][name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false },
          },
          {
            loader: "pug-html-loader",
            options: {
              data: _VARIABLES,
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "style.css",
    }),
    new HtmlWebpackPlugin({
      // template: './html/index.pug',
      template: `!!html-loader!pug-html-loader?${createPugHtmlLoaderOptions({
        LANG: "zh-tw",
      })}!src/pug/index.pug`,
      filename: "zh-tw/index.html",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/pug/index.pug",
    //   filename: "en/index.html",
    // }),
    new HtmlWebpackPlugin({
      // template: './html/index.pug',
      template: `!!html-loader!pug-html-loader?${createPugHtmlLoaderOptions({
        LANG: "en",
      })}!src/pug/index.pug`,
      filename: "index.html",
    }),
  ],
};
