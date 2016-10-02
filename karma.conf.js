module.exports = function (config) {

    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai'],

        files: [
            'script/jquery-1.7.1.min.js',
            'script/canteen.min.js',
            'test.js'
        ],

        preprocessors: {
            'test.js': ['webpack']
        },

        webpack: {
            module: {

                loaders: [{
                    test:   /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]

            }
        },

        plugins: [
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-mocha-reporter')
        ],

        reporters: ['mocha'],

        mochaReporter: {
            colors: {
                error: 'bgRed'
            }
        },

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        logLevel: config.LOG_INFO,

        browsers: ['Chrome']

    });
};