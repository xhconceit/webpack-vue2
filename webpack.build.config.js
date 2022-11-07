const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const  { VueLoaderPlugin } = require('vue-loader')
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:4].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxSize: 1024 * 20
        },
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    module:{
        rules: [
            // vue
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            // css
            {
                test: /\.(css|less|sass|scss)$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['less-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['sass-loader']
            },
            //js
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            // 图片文件
            {
                test: /\.(jpeg|svg|png|jpg|gif)$/i,
                type: 'asset',
                parser:{
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                },
                generator:{
                    filename: 'images/[name].[hash:4].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),// 清除之前打包的文件
        new MiniCssExtractPlugin(), //打包 css 
        new VueLoaderPlugin(), //vue 插件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new CompressionWebpackPlugin({//打包成 gzip
            filename: '[file].gzip'
        }),
    ]
}