const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Define your 'roots' variable
const ROOTS_URL = "";

// Define the pages for HtmlWebpackPlugin
const pages = [
  { name: "index", template: "./src/index.html" },
  { name: "license", template: "./src/license.html" },
  { name: "structure", template: "./src/structure.html" },
  { name: "vision", template: "./src/vision.html" },
  { name: "overview", template: "./src/overview.html" },
  { name: "contact-us", template: "./src/contact-us.html" },
  { name: "join-us", template: "./src/join-us.html" },
  { name: "clients", template: "./src/clients.html" },
  { name: "static-guard-service", template: "./src/static-guard-service.html" },
  { name: "armed-guard-service", template: "./src/armed-guard-service.html" },
  {
    name: "vip-bodyguard-service",
    template: "./src/vip-bodyguard-service.html",
  },
  {
    name: "event-control-service",
    template: "./src/event-control-service.html",
  },
  {
    name: "security-escort-service",
    template: "./src/security-escort-service.html",
  },
  {
    name: "vehicle-patrol-service",
    template: "./src/vehicle-patrol-service.html",
  },
  { name: "404", template: "./src/404.html" },
];

const htmlPlugins = pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      filename: `${page.name}.html`,
      template: page.template,
      minify: {
        removeOptionalTags: false,
        collapseWhitespace: true,
      },
      inject: "head",
      templateParameters: {
        commonHead: fs
          .readFileSync(
            path.resolve(__dirname, "src", "components", "common-head.html"),
            "utf-8"
          )
          .replace(/<%= roots %>/g, ROOTS_URL),
        roots: ROOTS_URL,
      },
      navbar: fs
        .readFileSync("./src/components/navbar.html", "utf8")
        .replace(/<%= roots %>/g, ROOTS_URL),
      footer: fs
        .readFileSync("./src/components/footer.html", "utf8")
        .replace(/<%= roots %>/g, ROOTS_URL),
    })
);

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    watchFiles: ["src/**/*.html", "src/**/*.js", "src/**/*.css"],
    hot: true,
    port: 8080,
    open: true,
  },
  plugins: [
    ...htmlPlugins,
    new CopyWebpackPlugin({
      patterns: [
        { from: "wp-includes", to: "wp-includes" },
        { from: "wp-content", to: "wp-content" },
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/service-worker.js", to: "service-worker.js" },
      ],
    }),
  ],
};
