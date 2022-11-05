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

    在命令行启动

    ```shell
    yarn dev
    ```




