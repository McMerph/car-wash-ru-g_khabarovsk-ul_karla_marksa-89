const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main/app/index.ts'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({template: './src/main/app/index.html'}),
        new TransferWebpackPlugin([{from: 'public'}])
    ],
    module: {
        rules: [
            {
                test: /\.(css|pcss)$/,
                use: [
                    {loader: 'style-loader'},// adds CSS to the DOM by injecting a <style> tag
                    {loader: 'css-loader'}, // interprets @import and url() like import/require() and will resolve them
                    {loader: 'svg-fill-loader/encodeSharp'},
                    {loader: 'postcss-loader', options: {config: {path: 'postcss.config.js'}}}
                ],
            },
            {
                test: /\.ts$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|jpg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 0,
                        name: 'asset/[name]-[sha512:hash:base64:7].[ext]'
                    }
                }]
            },
            {
                test: /\.svg$/,
                use: ['url-loader', 'svg-fill-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
