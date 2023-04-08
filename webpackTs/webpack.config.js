const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    mode:'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    devServer: {
        port: 8080,
        proxy: {

        }
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}