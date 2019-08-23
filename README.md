### 一、目标
    实现项目构建时图片的最优性能方案：自动合并雪碧图并压缩所有图片
    雪碧图方案：webpack-spritesmith
    图片压缩方案：image-webpack-loader

### 二、如何体验
1、安装与启动
```bash
    npm install
    npm run start
```
2、页面展示

<img src="https://p0.meituan.net/scarlett/edd833b9bed1f94acb71adc626cd295537399.png">


### 二、依赖能力
    webpack-spritesmith 把指定目录下的图片合并成雪碧图且生成一套雪碧图的css，项目中需要使用雪碧图的地方直接引入这个css即可
    image-webpack-loader 压缩各种格式图片

### 三、webpack-spritesmith 配置介绍

1、src 这个属性用于配置你从哪里捕获这些小图片，建议使用时把所有要合并的icon放在同一个文件夹
```
cwd 
必填
就是小图片所在的目录，注意不会递归子目录，子目录图片不会被处理


glob 
必填
类型是字符串，也可以是正则，用来匹配符合要求的图片文件
```

2、target 雪碧图和样式输出文件的配置
```
image 
必填
雪碧图输出完整地址，必须携带文件名及后缀，（注意这里不是指打包后，而是指打包前，实际打包还是被url-loader处理的）

css 
必填
输出的css文件，可以是字符串、或者数组（如果是数组的话，输出多个同样的文件）
```

3、apiOptions 配置属性
```
generateSpriteName 
可选，
是一个函数，有一个参数（是文件的绝对路径，字符串），默认值是返回文件名（不含后缀和路径）。
这个用于命名类名，默认是文件名作为类名

cssImageRef 
必填，
生成的图片在 API 中被引用的路径。
简单来说，就是你上面输出了 image 和 css ，那么在 css 用什么样的路径书写方式来引用 image 图片（可以是别名，或相对路径）

handlebarsHelpers 
可选
是一个对象，并且是全局的（意味着后面的本插件的这个配置会覆盖前面的配置）。
给 handlebars 用的，没搞懂，但一般用不上。
```

4、spritesmithOptions 可选，配置 <a href="https://github.com/twolfson/spritesmith">spritesmith</a> 用的。里面可以定制比如雪碧图的排列方向。

5、retina 可选，retina 屏的配置。关于解决 retina 屏的雪碧图的问题，可以参考这个 <a href="https://www.toobug.net/article/css_image_sprites_on_retina_screen.html">Retina屏下的CSS雪碧图</a>，所以最好给 spritesmithOptions.padding 属性赋值 2。这个属性用于图片放大缩小。

6、customTemplates 可选，这个应该是指用户自定义 css 模板, 官方有自己的模板，不完全适用这里的Demo，有稍作调整。


### 四、image-webpack-loader 
1. 效果
```
1. 压缩效率都为 67% 左右和 tinypng 在线压缩数据一致
2. 压缩之后图片基本无损
3. 会导致webpack打包时间变长，建议线上压缩
4. 可配置压缩质量 quality，设为75质量还是不错的，体积可再减小 15%
5. 观其代码发现图片资源都是本地压缩，安装各类图片的压缩工具
```
2. 配置

官方配置说明相对清晰友好，<a href="https://github.com/tcoopman/image-webpack-loader">点击文档</a>

