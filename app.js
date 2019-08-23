const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const open = require('open');
const config = require('./webpack/webpack.beta.config');
const port =  config.devServer.port;
const host = config.devServer.host || '127.0.0.1';

for (let key in config.entry) {
	let ar = config.entry[key];
	if (key != 'common') {
		ar.unshift('webpack-dev-server/client?http://'+ host +':'+ port +'/', 'webpack/hot/dev-server');
	}
}

//开发环境热更新配置
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, config.devServer);

server.listen(port, host, (err)=>{
	if(err){
		console.log('启动出错：' + err);
	}
	open('http://' + host + ':' + port + '/index.html');
});
