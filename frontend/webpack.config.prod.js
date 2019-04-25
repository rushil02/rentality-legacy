const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
    return {
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            new webpack.DefinePlugin({ // <-- key to reducing React's size
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new CompressionPlugin({
                filename: "[path].gz[query]",
                // algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(css|less)$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.svg/,
                    use: {
                        loader: 'svg-url-loader',
                        options: {}
                    }
                },
            ],

        },
        watch: false,
        entry: {
            index: './src/entry_points/index.js',
            home_owner: './src/entry_points/HomeOwner.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/static/frontend/',
            chunkFilename: '[name].chunk.js',

        },
        resolve: {
            modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, '..', 'node_modules')],
        },
        optimization: {
            minimize: true,
        },
    };
};
