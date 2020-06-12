const path = require("path");
const publicKeys = require("dotenv").config({path: "/run/secrets/PUBLIC_KEYS"});
const webpack = require("webpack");
const fs = require("fs");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssThemeModules = [
    path.resolve(__dirname, "src", "theme.css"),
    path.resolve(__dirname, "src", "core", "alert", "components", "Alert.css"),
    path.resolve(__dirname, "src", "core", "footer", "views", "components", "Footer.css"),
    /node_modules/,
    path.resolve(__dirname, "src", "apply", "views", "houseDetail", "DateRangeCalendar.css"),
    path.resolve(__dirname, "src", "apply", "views", "houseDetail", "ImageCarousel.css"),
    path.resolve(__dirname, "src", "welcome", "views", "ImageCarousel.module.css"),
];

// Parse Environment Variables
function getEnvVariablesMap() {
    const envMap = publicKeys.parsed;
    if (!fs.existsSync("/run/secrets/PUBLIC_KEYS"))
        throw Error("Environment variables NOT found (PUBLIC_KEYS missing)");
    let envPluginMap = {};
    for (let key in envMap) {
        if (envMap.hasOwnProperty(key)) {
            envPluginMap[`process.env.${key}`] = `"${envMap[key]}"`;
        }
    }
    return envPluginMap;
}

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new webpack.DefinePlugin(getEnvVariablesMap()),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(css|less)$/,
                exclude: cssThemeModules,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(css|less)$/,
                include: cssThemeModules,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(eot|png|jpg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
                loader: "url-loader?limit=30000&name=[name]-[hash].[ext]",
            },
            {
                test: /\.svg/,
                use: {
                    loader: "svg-url-loader",
                    options: {},
                },
            },
        ],
    },
    watch: false,
    entry: {
        index: "./src/App.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/static/frontend/",
        chunkFilename: "[name].chunk.js",
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
    },
};
