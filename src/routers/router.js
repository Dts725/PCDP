import VueRouter from "vue-router"

import Vue from "vue"

//使用Vue.use方法加载VueRouter模块
Vue.use(VueRouter)

import HomeContainer from "../components/tabbarcontainers/HomeContainer.vue"
import CartContainer from "../components/tabbarcontainers/CartContainer.vue"
import MemberContainer from "../components/tabbarcontainers/MemberContainer.vue"
import SearchContainer from "../components/tabbarcontainers/SearchContainer.vue"


import NewsList from "../components/news/NewsList.vue"
import NewsInfo from "../components/news/NewsInfo.vue"


import PicList from "../components/pictures/PicList.vue"
import login from "../components/login.vue";

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
            component: login
        },
       
       
        {
            path: "/home",
            component: HomeContainer
        },
        {
            path: "/cart",
            component: CartContainer,
        },
        {
            path: "/member",
            component: MemberContainer
        },
        {
            path: "/search",
            component: SearchContainer
        },
        {
            path: "/home/newslist",
            component: NewsList
        },
        {
            path: "/home/newsinfo/:id",
            component: NewsInfo
        },
        {
            path: "/home/piclist/:id?",
            component: PicList
        },
  
    ]
});

