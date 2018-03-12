var path = require("path");
const uglify = require('uglifyjs-webpack-plugin');
//引入插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// new ExtractTextPlugin ('style.css')
//如果使用的是webpack.config.json的方式来配置webpack-dev-server的运行参数的
//则需要引入webpack 在插件中新增一个 HotModuleReplacementPlugin
var webpack = require("webpack")

module.exports = {
	entry : path.join(__dirname,'src/main.js'),
    output: {
		path: path.join(__dirname, "/assets/js"),
		filename: "build.js",
		// publicPath: './',
    },
    module: {
        rules: [
            // {
            //     //test指的就是在webpack处理文件的时候，用来匹配文件的后缀
            //     test: /\.css$/,
            //     //当文件后缀匹配之后，会调用这个数组中的加载器对文件进行打包操作
            //     //调用加载器的顺序是从后向前的！
            //     use: ['style-loader', 'css-loader']
			// },
			{ test: /.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg|ttf|woff|woff2|eot)$/,
                use: ['url-loader?limit=10240']
            },
            {
                test: /\.js$/,
                //下面的exclude就是做排除处理，只要是node_modules中的js文件就用babel-loader进行转换
                exclude: /node_modules/,
				use: ['babel-loader'],
				
			},
			// {
			// 	test: /\.js$/,
			// 	loader: 'babel-loader',
			// 	options: {
			// 		presets: ["es2015","env"]
			// 	},
			// 	exclude: [/node_modules/]

			// },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
			template : "./index.html",
			// inject: 'body',
			// filename: "../index.html"
        }),
		new ExtractTextPlugin('../css/[name].css'),

		new webpack.HotModuleReplacementPlugin(),
		new uglify(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			// ( 公共chunk(commnons chunk) 的名称)

			filename: "commons.js",
			// ( 公共chunk 的文件名)

			// minChunks: 3,
			// (模块必须被3个 入口chunk 共享)

			// chunks: ["pageA", "pageB"],
			// (只使用这些 入口chunk)
		})

    ],
    //下面这个属性是专门用来配置 webpack-dev-server的运行参数的
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 9000,
        hot: true
    },
    resolve: {
        alias: {
            "vue": "vue/dist/vue.min.js"
        }
    },
}