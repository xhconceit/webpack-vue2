# 使用 webpack 构建 vue2 工程

1. 安装 webpack

    ```shell
    yarn add -D webpack webpack-cli webpack-dev-server
    ```

2. 配置 webpack

    1. 安装 webapck-dev-server
        
        ```shell
        yarn add -D  webapck-dev-server
        ```
    2. 新建 webpack.config.js ，配置 webpack 。
       
       ```javascript
        const path = require('path')
        const HtmlWebpackPlugin = require('html-webpack-plugin')

        module.exports = {
            mode: 'development', // 开发模式
            entry: path.resolve(__dirname,'src/index.js'),// 人口文件
            devServer: { // 开启服务器文件变化自动刷新
                open: true,
                port: 9000
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname,'public/index.html'), // index.html 文件
                })
            ]
        }
        ```

    3. 配置 package.json ，设置 scripts 

        ```json
        {
            "scripts": {
                "dev": "webpack-dev-server"
            }
        }
        ```

        运行项目

        ```shell
        yarn dev
        ```

3. 安装 vue

    ```shell
    yarn add vue@2
    ```

    在 index.js 文件中启动 vue 。

    ```javascript
    import Vue from "vue"
    const app = new Vue({
        render: h => {
            return h('div', {}, 'hello Vue')
        }
    })
    app.$mount('#app')
    ```

    安装 html-webpack-plugin 自动将文件引入 index.html

    ```shell
    yarn add -D html-webpack-plugin
    ```

    使用 html-webpack-plugin 

    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const path = require('path')
    module.exports = {
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
            })
        ]
    }
    ```

    在命令行启动

    ```shell
    yarn dev
    ```


4. 启动 vue 模版

    安装 vue-loader 解析 vue 模版，安装 css-loader 解析样式。

    ```shell
    yarn add -D vue-loader@15 css-loader
    ```

    在 webpack 配置中设置 vue loader ，在

    ```javascript
    const { VueLoaderPlugin } = require('vue-loader')
    module.exports = {
        module:{
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
            new VueLoaderPlugin()
        ]
    }
    ```

5. 处理静态文件

    由于 webpack5 内置资源模块，不需要使用 file-loader url-loader 对静态文件操作。

    ```javascript
    module.exports = {
        module: {
            rules: [
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
        }
    }
    ```


6. less

    安装 less less-loader 解析 less 。

    ```shell
    yarn add -D less less-loader
    ```

    webpack 配置

    ```javascript
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: ['vue-style-loader', 'css-loader','less-loader']
                }
            ]
        }
    }
    ```



7. sass

    安装 sass sass-loader 解析 sass 。

    ```shell
    yarn add -D sass sass-loader
    ```

    webapck 配置

    ```javascript
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    use:['vue-style-loader', 'css-loader','sass-loader']
                },
            ]
        }
    }
    ```


8. postcss

    安装 postcss-loader postcss-preset-env 解析 css 。

    ```shell
    yarn add -D postcss-loader postcss-preset-env
    ```

    配置 webpack

    ```javascript
    module.exports = {
        module: {
            rules:[
                {
                    test: /\.css$/,
                    use: ['postcss-loader']
                }
            ]
        }
    }
    ```

    新建 postcss.config.js 配置 postcss 。

    ```javascript
    module.exports = {
        map: false,// 是否显示 source map
        plugins: {
            "postcss-preset-env": {// postcss-preset-env  postcss 预设了常用插件，如：autoprefixer 自动添加前缀 等
            }
        }
    }
    ```

    新建 .browserslistrc 配置兼容浏览器。

    ```browserslistrc
    > 1%
    last 2 version
    ```

9. 抽离 css 文件

    安装 mini-css-extract-plugin 插件抽离 css 。

    ```shell
    yarn add -D mini-css-extract-plugin
    ```

    配置 webpack

    ```javascript
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ]
    }
    ```


10. babel 代码降级

    安装 babel-loader @babel/core @babel/preset-env core-js regenerator-runtime 降级解析 js 。

    ```shell
    yarn add -D babel-loader @babel/core @babel/preset-env 
    # babel-loader : js 代码转换
    # @babel/core : babel 核心
    # @babel/preset-env : babel 预设
    yarn add core-js regenerator-runtime
    # core-js : 实现 js 新语法的降级
    # regenerator-runtime : 对编译/转译async函数的运行时支持。
    ```

    配置 webpack

    ```javascript
    module.exports = {
        moduel: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        }
    }
    ```

    新建 .babelrc 配置 babel

    ```babel
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "usage",// 按需构建 api 
                    "corejs": 3, // 使用 corejs 的版本
                }
            ]
        ]
    }
    ```

11. 开发性能优化

    安装 cache-loader 缓存 loader 结果。

    ```shell
    yarn add -D cache-loader
    ```

    配置 webpack

    ```javascript
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js/,
                    use: ['cache-loader', 'babel-loader']
                }
            ]
        }
    }
    ```

    安装 thread-loader 开启多线程。

    ```shell
    yarn add -D thread-loader
    ```

    配置 webpack
    
    ```javascript
    module.exports = {
        module: {
            rules:[
                {
                    test: /\.js$/,
                    use: ['thread-loader', 'babel-loader']
                }
            ]
        }
    }
    ```

    开启热更新

    ```javascript
    const webpack = require('webpack')
    module.exports = {
        devServer: {
            hot: true
        },
        plugins: [
            // 可选
            new webpack.HotModuleReplacementPlugin()
        ]
    }
    ```

    在人口文件中开启热更新

    ```javascript
    if(module.hot) {
        module.hot.accept()
    }
    ```

    