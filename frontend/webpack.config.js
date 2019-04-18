const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
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
    // optimization: {  FIXME: Not working
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
};
