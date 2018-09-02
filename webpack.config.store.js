const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: {
		app: ['babel-polyfill', './src/client/index.js']
	},

	performance: {
		hints: false
	},

	output: {
		publicPath: '/assets/',
		path: path.resolve(__dirname, 'assets'),
		filename: 'js/[name]-[chunkhash].js',
		chunkFilename: 'js/[name]-[chunkhash].js'
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'theme',
					test: 'theme',
					enforce: false
				}
			}
		}
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react'],
						plugins: ['transform-class-properties']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: false,
							importLoaders: true
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(
			[
				'assets/js/app-*.js',
				'assets/css/bundle-*.css',
				'assets/sw.js',
				'assets/precache-manifest.*.js'
			],
			{ verbose: false }
		),
		new MiniCssExtractPlugin({
			filename: 'css/bundle-[contenthash].css',
			chunkFilename: 'css/bundle-[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new WorkboxPlugin.GenerateSW({
			swDest: 'sw.js',
			precacheManifestFilename: 'precache-manifest.[manifestHash].js',
			clientsClaim: true,
			skipWaiting: true,
			exclude: [/\.html$/],
			runtimeCaching: [
				{
					urlPattern: new RegExp('/(images|assets)/'),
					handler: 'cacheFirst'
				},
				{
					urlPattern: new RegExp('/api/'),
					handler: 'networkOnly'
				},
				{
					urlPattern: new RegExp('/ajax/payment_form_settings'),
					handler: 'networkOnly'
				},
				{
					urlPattern: new RegExp('/'),
					handler: 'networkFirst',
					options: {
						networkTimeoutSeconds: 10
					}
				}
			]
		}),
		new webpack.BannerPlugin({
			banner: `Created: ${new Date().toUTCString()}`,
			raw: false,
			entryOnly: false
		})
	],

	stats: {
		children: false,
		entrypoints: false,
		modules: false
	}
};
