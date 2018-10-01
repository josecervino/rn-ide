// const HtmlWebPackPlugin = require("html-webpack-plugin");
//
// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.js?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           query: {
//             presets: ['@babel/preset-react']
//           }
//         },
//       },
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader"
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./src/index.html",
//       filename: "./index.html"
//     })
//   ]
// };


const path = require('path');
const webpack = require("webpack");

module.exports = {
	mode: 'development',
	node: {
		fs: 'empty'
	},
	target: 'electron-main',
	entry: {
		"app": './src/index.js',
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		"json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		"css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		"html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		"ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		}]
	},
};
