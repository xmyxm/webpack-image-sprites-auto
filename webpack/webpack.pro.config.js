const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.base.config.js');

config.mode = "production"
config.module.rules.push(
    {
        test: /\.less$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {}
            },
            'css-loader',
            'postcss-loader',
            'less-loader'
        ]
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
                // 既然base.config中配置了雪碧图，这里就无需使用 url-loader 的base64能力，直接使用 file-loader 即可，
                // 如果非常小的图片想用 url-loader 处理也可以
                loader: 'file-loader', 
                options: {
                    name: "img/[name].[ext]"
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    disable: false
                }
            }
        ]
    },
)
config.plugins.push(
    // css文件抽离设置
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    })
)

module.exports = config;

