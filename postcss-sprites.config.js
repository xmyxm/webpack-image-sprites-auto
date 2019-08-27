var postcss = require('postcss');

// 详细使用链接如：https://github.com/2createStudio/postcss-sprites

module.exports = {
    stylesheetPath: null, // 默认值：null, 保存输出样式表的文件夹的相对路径。如果它为null，将使用CSS文件的路径
    spritePath: "./dist/sptite", // 必填，保存输出spritesheet的文件夹的相对路径
    basePath: "./", // 默认值：file，您的基本路径将用于具有绝对CSS网址的图像
    relativeTo: "file", // 默认值：file，可选值file|rule。 指示url是否应该与当前CSS上下文或原始CSS样式表文件相对
    filterBy: function(image) { // 默认值：[], 定义过滤器函数，用于处理样式表中创建的图像列表，每个函数都必须返回一个Promise应该被解析或拒绝的函数。
		// 过滤器，只处理png图片
		if (!/\.png$/.test(image.url)) {
			return Promise.reject();
		}
		return Promise.resolve();
	},
    groupBy: function (image) { // 默认值：[], 定义将操作样式表中创建的图像列表的组函数，每个函数都必须返回一个Promise应该用字符串解析或拒绝的函数
        // 图片相对路径
        let url = image.url
        // 去掉图片名的相对路径
        var url_yx = url.substr(0, url.lastIndexOf("/"))
        // 获取图片所在的文件夹名称
        var folder_name = url_yx.substr(url_yx.lastIndexOf("/") + 1)
        return Promise.resolve(folder_name)
    },
    retina: false, // 默认值：false, 定义是否在文件名中搜索视网膜标记
    spritesmith: {
        engine: "pixelsmith", // 默认值：pixelsmith, 配置雪碧图转换引擎
        algorithm: "binary-tree", // 默认值：binary-tree, 配置雪碧图算法
        padding: 0, // 默认值：0, 配置雪碧图间隔的空间
        engineOpts: {}, // 默认值：{}, 引擎默认参数配置
        exportOpts: {} // 默认值：{}, 引擎导出选项
    },
    svgsprite: null, // 生成SVG的基础配置，具体事例见链接 https://github.com/jkphl/svg-sprite#configuration-basics
    verbose: false, // 默认值：false
    // 钩子函数，转换百分比定位
    hooks: {
        onSaveSpritesheet: null, // 允许重写生成的spritesheet数据的钩子。如果返回值为string，则将其用作文件路径值，如果返回值为object，则将其用作将与当前spritesheet数据合并的值。返回值也可以是Promise，它应返回字符串或对象。
        onUpdateRule: function (rule, token, image) { // 钩子函数，允许重写图像的CSS输出
            var backgroundSizeX = (image.spriteWidth / image.coords.width) * 100;
            var backgroundSizeY = (image.spriteHeight / image.coords.height) * 100;
            var backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100;
            var backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100;

            backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX;
            backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY;
            backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX;
            backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY;

            var backgroundImage = postcss.decl({
                prop: 'background-image',
                value: 'url(' + image.spriteUrl + ')'
            });

            var backgroundSize = postcss.decl({
                prop: 'background-size',
                value: backgroundSizeX + '% ' + backgroundSizeY + '%'
            });

            var backgroundPosition = postcss.decl({
                prop: 'background-position',
                value: backgroundPositionX + '% ' + backgroundPositionY + '%'
            });

            rule.insertAfter(token, backgroundImage);
            rule.insertAfter(backgroundImage, backgroundPosition);
            rule.insertAfter(backgroundPosition, backgroundSize);
        }
    }
}

