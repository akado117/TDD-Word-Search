const path = require('path');

module.exports = {
    entry: './src/js/main/Main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'cmd'),
        library: 'root-kata',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
};