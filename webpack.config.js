var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        "bundle": './App/index'
    },
    devtool: "eval",
    output: {
        filename: './dist/browser-[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "babel",
                query:
                {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        fallback: ["./Content/libs/jstree"]
    }
};