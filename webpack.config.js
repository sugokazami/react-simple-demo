const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/js/index.js'),
    output: {
		path: path.resolve(__dirname, 'class'), 
        filename: "bundle.js"
    },

    resolve:{
        extensions:['.js','.jsx','.less', '.css']
    },

    module: {
        rules: [
            { 
				test: /\.(js|jsx)$/, 
				exclude: /node_modules/, 
			    use: [{
                    loader: "babel-loader",
                    options: { 
						presets: ["react","es2015"] 
						}
                }]
			}
        ]
    },

    plugins: [
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.html' 
        }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),
    ],

    devServer: {
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}
