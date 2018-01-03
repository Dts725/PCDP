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
import Hello  from '../components/Hello.vue'

// const routes = [
//     {
//         path: '/',
//         name: "欢迎",
//         meta: {
//             requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
//         },
//         component: resolve => require(["../components/Hello.vue"], resolve)
//     },
//     {
//         path: '/login',
//         name: "登录",
//         // meta: {
//         //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
//         //  },
//         component: resolve => require(["../components/login.vue"], resolve)
//     }
// ]

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
        }
    ]
});

