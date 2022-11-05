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
            },

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