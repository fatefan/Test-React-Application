const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: './bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {

        publicPath: '/',
        port: 9000,
        overlay: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader',],
                exclude: /node_modules/
            }
        ],
    },
    resolve:{
        extensions: [".js", ".json", ".jsx", ".css"]
    }
}