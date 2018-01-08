import Vue from "vue";

//引入根组件
import App from "./App.vue"
// import login from "./components/login.vue"
//引入路由配置
import router from "./routers/router.js"

import './img/icon/iconfont.css'
//引入mint-ui
import MintUI from 'mint-ui'
import "./commn.css";
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
import coo from './config.js'
import axios from "axios";
//引入mui的css
import "../libs/mui/css/mui.css"
import "../libs/mui/css/icons-extra.css"
//添加一个响应拦截器


    router.beforeResolve ((to, from, next) => {
        // console.log(to.meta.requireAuth)
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if (coo.getCache("accessToken")) { // 通过vuex state获取当前的token是否存在
                // axios.interceptors.response.use(function (res) {
                //     //在这里对返回的数据进行处理
                //     if (res.status == "200" && res.data.errorCode == "5005") {
                //         router.replace({ path: 'login' })
                //     }
                // }, function (err) {
                //     //Do something with response error
                //     return Promise.reject(error);
                // })
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
    template: "<App/>",
    components: {App}
})
