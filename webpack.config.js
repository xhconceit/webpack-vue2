const path = require('path')
// 将打包后的文件链接到 html 文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// vue 模块插件
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    devServer: {
        open: false,
        port: 9000
    },
    module: {
        rules: [
            // vue 模版
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            // css 
            {
                test: /\.(css|less|sass|scss)$/,
                use: ['vue-style-loader', 'css-loader']
            },

            // postcss
            {
                test: /\.(css|less|sass|scss)$/,
                use: ['postcss-loader']
            },

            // less
            {
                test: /\.less$/,
                use: ['less-loader']
            },
            // sass
            {
                test: /\.(sass|scss)$/,
                use: ['sass-loader']
            },

            // 静态文件
            {
                test: /\.(jpeg|svg|png|jpg|gif)$/i,
                type: 'asset',
                // 设置文件超过 4kb 导出文件本返回 url ，不超过则返回 data url
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                },
                generator: {
                    filename: 'images/[name]-[hash:4].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new VueLoaderPlugin()
    ]
}