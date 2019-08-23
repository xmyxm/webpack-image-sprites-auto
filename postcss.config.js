module.exports = {
	plugins: [
        require('autoprefixer')(),
        require('postcss-sprites')(
            require('./postcss-sprites.config')
        )
    ]
}

