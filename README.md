### 一、目标
    实现项目构建时图片的最优性能方案：自动合并雪碧图并压缩所有图片
    雪碧图方案：postcss-sprites
    图片压缩方案：image-webpack-loader

### 二、如何体验
1、安装与启动
```bash
    npm install
    npm run start
```
2、页面展示

<img src="https://p0.meituan.net/scarlett/a274cce3e3fa284375fabfc8087017e3118069.png">


### 二、依赖能力
    postcss-sprites 自动转换css中依赖的各种本地图片，并自动替换当前图片的css样式
    image-webpack-loader 压缩各种格式图片

### 三、postcss-sprites 配置介绍

###### stylesheetPath

> 保存输出样式表的文件夹的相对路径。如果它为null，将使用CSS文件的路径

- 默认值: null
- 是否必传: `false`

###### spritePath

> 保存输出spritesheet的文件夹的相对路径

- 默认值: `./`
- 是否必传: `true`

###### basePath

> 您的基本路径将用于具有绝对CSS网址的图像

- 默认值: `./`
- 是否必传: `false`

###### relativeTo

> 指示url是否应该与当前CSS上下文或原始CSS样式表文件相对，Options: `file|rule`

- 默认值: `file`
- 是否必传: `false`

###### filterBy

>  定义过滤器函数，用于处理样式表中创建的图像列表，每个函数都必须返回一个Promise应该被解析或拒绝的函数。

- 默认值: `[]`
- 是否必传: `false`

###### groupBy

> 定义将操作样式表中创建的图像列表的组函数，每个函数都必须返回一个Promise应该用字符串解析或拒绝的函数

- 默认值: `[]`
- 是否必传: `false`

###### retina

> 定义是否在文件名中搜索视网膜标记

- 默认值: `false`
- 是否必传: `false`

###### hooks

> 钩子函数配置

- 默认值: `{}`
- 是否必传: `false`

###### hooks.onSaveSpritesheet

> 允许重写生成的spritesheet数据的钩子。如果返回值为string，则将其用作文件路径值，如果返回值为object，则将其用作将与当前spritesheet数据合并的值。返回值也可以是Promise，它应返回字符串或对象。

- 默认值: `null`
- 是否必传: `false`

###### hooks.onUpdateRule

> 允许重写图像的CSS输出

- 默认值: `null`
- 是否必传: `false`

###### spritesmith

> 雪碧图配置

- 默认值: `{}`
- 是否必传: `false`

###### spritesmith.engine

> 配置雪碧图转换引擎

- 默认值: `pixelsmith`
- 是否必传: `false`

###### spritesmith.algorithm

> 配置雪碧图算法

- 默认值: `binary-tree`
- 是否必传: `false`

###### spritesmith.padding

> 配置雪碧图间隔的空间

- 默认值: `0`
- 是否必传: `false`

###### spritesmith.engineOpts

> 引擎默认参数配置

- 默认值: `{}`
- 是否必传: `false`

###### spritesmith.exportOpts

> 引擎导出选项

- 默认值: `{}`
- 是否必传: `false`

###### svgsprite

> 生成SVG的基础配置，具体事例见链接 https://github.com/jkphl/svg-sprite#configuration-basics

###### verbose

> 将插件输出打印到控制台。

- 默认值: `false`
- 是否必传: `false`


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


