var path = require('path');
var parentDir = path.join(__dirname, '../');

module.exports = {
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
    watch: true,
    output: {
        path: path.resolve(parentDir, 'src/static/v2/frontend'),
        filename: 'index.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), path.resolve(__dirname, 'node_modules')],
    },
};
