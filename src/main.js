import 'babel-polyfill'
import Vue from 'vue'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
//引入根组件
import App from "./App.vue"
import Vuex from "vuex"
import  store from "./store.js"
// import login from "./components/login.vue"
//引入路由配置
import router from "./routers/router.js"

import './img/icon/iconfont.css'
//引入mint-ui
import MintUI from 'mint-ui'
import "./commn.css"
import 'mint-ui/lib/style.css'
import coo from './config.js'
import axios from "axios"
//引入mui的css
import "../libs/mui/css/mui.css"
import "../libs/mui/css/icons-extra.css"
//添加一个响应拦截器
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
// require('es6-promise').polyfill()
// Es6Promise.polyfill()
Vue.use(Vuex);
Vue.use(MintUI);
window.NativeConn = function () {
    var callScanFun = function (data) {
        console.log(data);
    };
    var NativeScanBar = function (callback) {
        if (typeof callback != "function") {
            return;
        }
        if (window.navigator.appVersion.indexOf("Android") !== -1) {
            window.Android.scanTheCode("");
        } else {
            //调用IOS
            iOSScanBarCode("");
        }
        window.NativeConn.__proto__.constructor.callScanFun = callback;
    };
    var conn = {};
    conn.NativeScanBar = NativeScanBar;
    conn.callScanFun = callScanFun;
    return conn;
}();
//统一回调
window.iOSBarCodeString = function (data) {
    var wayBillNum = data.split(",")[1];
    window.NativeConn.__proto__.constructor.callScanFun(wayBillNum);
};

//路由全局事件
router.beforeResolve ((to, from, next) => {
        /**
         * 1 注册全局路由事件
         * 2 全局路事件里面注册全局axios 响应拦截器
         * 3 拦截器里面修改 判断token 是否失效 配置next 路由
         */
		// console.log(to.meta.requireAuth)
		Indicator.close();//每个路由切换前关闭过度状态
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if (coo.getCache("accessToken")) { // 通过vuex state获取当前的token是否存在



                // 添加响应拦截器
                axios.interceptors.response.use(function (res) {
                    // 对响应数据做点什么
                    if (res.status === 200 && res.data.errorCode === "5005") {
                        next({
                            path: '/login',
                            query: { redirect: to.VueRouter } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        })
                        window.localStorage.removeItem("accessToken");
                        Toast({
                            message     :  '登录失效 请重新登录 !',
                            position    : 'middle',
                            duration    : 1500,
                      
                        });
                    } 
                    return res;
                }, function (error) {
                    // 对响应错误做点什么
                    return Promise.reject(error);
                });
                next();
            }
            else {
                next({
                    path: '/login',
                    query: { redirect: to.VueRouter } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        }
        else {
            next();
        }
    })

var vm = new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: {App}
})

  