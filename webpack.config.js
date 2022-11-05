const path = require('path')
// 将打包后的文件链接到 html 文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// vue 模块插件
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    devServer: {
        open: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new VueLoaderPlugin()
    ]
}