import VueRouter from "vue-router"

import Vue from "vue"

//使用Vue.use方法加载VueRouter模块
Vue.use(VueRouter)

import Pieces from "../components/tabbarcontainers/ToPieces.vue"
import Sign from "../components/tabbarcontainers//Sign.vue"
import Detention from "../components/tabbarcontainers//Detention.vue"
import Mine from "../components/tabbarcontainers/Mine.vue"
import Login from "../components/login.vue"
import Reset from "../components/comment/PasswordReset.vue"

//<pm added at 2017年11月16日16:38:30  关于什么什么的代码>
//</pm>

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: Login
        },
       
        {
            path: "/reset",
            component: Reset
        },
        {
            path: "/pieces",
            component: Pieces
        },
        {
            path: "/sign",
            component: Sign
        },
        {
            path: "/detention",
            component: Detention
        },
        {
            path: "/mine",
            component: Mine
        }
    ]
});

