const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname,'src/index.js'),
    devServer: {
        open: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'public/index.html'),
        })
    ]
}