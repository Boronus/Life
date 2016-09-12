const webpack = require('webpack');

module.exports = {
    context: __dirname + '/script',
    entry: "./application.js",
    output: {
        filename: "bundle.js",
        library:"script"
    },

    /*plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:false,
                drop_console:true,
                unsafe:true
            }
        })
    ],*/
    module: {
        loaders: [           
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};