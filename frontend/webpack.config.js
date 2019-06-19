const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssThemeModules = [
    path.resolve(__dirname, 'src', 'theme.css'),
    path.resolve(__dirname, 'src', 'core', 'alert', 'components', 'Alert.css'),
    path.resolve(__dirname, 'src', 'core', 'navbar', 'views', 'components', 'Navbar.css'),
];

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
                exclude: cssThemeModules,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        modules: true,
                    },
                }]
            },
            {
                test: /\.(css|less)$/,
                include: cssThemeModules,
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
        index: './src/App.js',
    },
    output: {
        filename: '[name].bundle.js',
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
