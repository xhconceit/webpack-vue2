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
    yarn add -D vue-loader css-loader
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


4. less

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



