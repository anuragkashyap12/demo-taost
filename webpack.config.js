const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: { app: "./src/index.ts" },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.[name].js",
    libraryTarget: "umd",
    library: "cg-toast",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new MiniCssExtractPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.join(__dirname, "/src/index.html"),
        },

        // Only for production
        process.env.NODE_ENV === "production"
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    ),
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new CleanWebpackPlugin({
      // Use !negative patterns to exclude files
      // default: []
      cleanAfterEveryBuildPatterns: ["static*.*", "!static1.js"],

      // Write Logs to Console
      // (Always enabled when dry is true)
      // default: false
      verbose: true,
    }),
  ],
};
