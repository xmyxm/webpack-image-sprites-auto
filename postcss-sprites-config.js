/** postcss-sprites-config.js
 * 这里的项目结构是
 * —src
 * ——icons
 * ———icons-@1x
 * ———— *.png
 * ———icons-@2x
 * ———— *.png
 *  */
var postcss = require('postcss');
// 合法的散列图path 查找 /src/icons/*/*.png
const REG_SPRITES_PATH = /\/icons\/(.*?)\/.*/i
// 合法的retina标识 @*x
const REG_SPRITES_RETINA = /@(\d+)x\./i
// split
const SPLIT = true
const SPLIT_REG = /\?/ig
const RETINA = true
const OUTPUT_PATH = "./dist/sptite"

module.exports = {
    spritePath: OUTPUT_PATH,
    //过滤 除了 icons 以外 的图片链接
    //需返回一个Promise对象
    filterBy: (image) => {
        return REG_SPRITES_PATH.test(image.url) ? Promise.resolve() : Promise.reject()
    },
    //分组 分出 1 / 2 / 3 / n倍 图
    groupBy: (image) => {
        let groups = null;
        let groupName = '';
        let module = image.originalUrl.split(/\?/)
        image.url = module[0]
        if (module.length > 1) {
            //分模块 ? 跟模块名
            groupName = module[1] + '-'
        }
        if (SPLIT) {
            groups = REG_SPRITES_PATH.exec(image.url);
            groupName += groups ? groups[1] : 'icons';
        } else {
            groupName += 'icons';
        }
        //处理多倍图的情况
        if (RETINA) {
            image.retina = RETINA;
            image.ratio = 1;
            let ratio = REG_SPRITES_RETINA.exec(image.url);
            if (ratio) {
                ratio = ratio[1];
                while (ratio > 10) {
                    ratio = ratio / 10;
                }
                image.ratio = ratio;
                image.groups = image.groups.filter((group) => {
                    return ('@' + ratio + 'x') !== group;
                });
                groupName += '@' + ratio + 'x';
            }
        }
        return Promise.resolve(groupName);
    },
    // 转换百分比定位
    hooks: {
        onUpdateRule: function (rule, token, image) {
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

