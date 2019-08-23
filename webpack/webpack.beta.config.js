



const config = require('./webpack.base.config.js');

config.mode = "development"
config.module.rules.push(
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
        ]
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name: "img/[name].[ext]",
                    limit: 1000
                }
            }
        ]
    }
)

module.exports = config;
