import VueRouter from "vue-router"
import Vue from "vue"

//使用Vue.use方法加载VueRouter模块
Vue.use(VueRouter)
import childrenView from "../components/tabbarcontainers/mine/ExpressEntry/ChildrenView.vue";
import Pieces from "../components/tabbarcontainers/topieces/ToPieces.vue"
import Sign from "../components/tabbarcontainers/sign/Sign.vue"
import Detention from "../components/tabbarcontainers/detention/Detention.vue"
import Mine from "../components/tabbarcontainers/mine/Mine.vue"
import Login from "../components/Login.vue"
import Reset from "../components/comment/PasswordReset.vue"
import Count from "../components/tabbarcontainers/mine/Count.vue"
import ResetNext from "../components/comment/FindPasswordNext.vue"
import DetailsEntry from "../components/tabbarcontainers/mine/ExpressEntry/DetailsEntry.vue";
import ListEntry from "../components/tabbarcontainers/mine/ExpressEntry/ListEntry.vue";
import QuryExpress from '../components/comment/QueryExpress.vue'



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
			component: Mine,	
        },
        {
            path: "/count",
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Count
		},
		{
			path: "/quryExpress",
			meta: {
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component: QuryExpress
		},
		{
			path: "/ExpressEntry",
			meta: {
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component: childrenView,

			children: [

				{
					path: "detailsEntry",
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: DetailsEntry
				},
				{
					path: "listEntry",
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ListEntry
				}
			]
		}		
    ]
});

