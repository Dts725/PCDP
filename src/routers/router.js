import VueRouter from "vue-router"

import Vue from "vue"

//使用Vue.use方法加载VueRouter模块
Vue.use(VueRouter)

import Pieces from "../components/tabbarcontainers/topieces/ToPieces.vue"
import Sign from "../components/tabbarcontainers/sign/Sign.vue"
import Detention from "../components/tabbarcontainers/detention/Detention.vue"
import Mine from "../components/tabbarcontainers/mine/Mine.vue"
import Login from "../components/login.vue"
import Reset from "../components/comment/PasswordReset.vue"
import Count from "../components/tabbarcontainers/mine/Count.vue";
import ResetNext from "../components/comment/FindPasswordNext.vue";


export default new VueRouter({

    routes: [
            {
            path: "/",
            component: Login
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
            path: "/next",
            component: ResetNext
        },
        {
            path: "/pieces",
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Pieces
        },
        {
            path: "/sign",
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Sign
        },
        {
            path: "/detention",
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Detention
        },
        {
            path: "/mine",
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Mine
        },
        {
            path: "/count",
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Count
        },
        
    ]
});

