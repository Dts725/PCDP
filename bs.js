/*
* @Author: 田田
* @Date:   2018-01-05 21:56:23
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-11 14:22:34
*/
// require 加载 browser-sync 模块
var bs = require('browser-sync').create();
 
// .init 启动服务器
bs.init({
    proxy   : 'localhost:9000', //监控服务器地址
    port    : 3000,//页面调试端口
    ui      : {
        port: 3001 //配置页面端口
    },
    files   : [
        '**/*.css,**/*js',
        {
            match: ['**/*.html'],
            fn:    function (event, file){
             bs.reload();
            }
        }
    ]
});
 
// 现在请BS，而不是方法
// 主Browsersync模块出口
bs.reload('*.html');