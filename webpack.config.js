module.exports = {
    mode: 'production',
    entry: {
        main: "./src/app.js"
    },
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        contentBase: "./src",
        historyApiFallback: {
            index: './src/index.html'
        }
    },
}