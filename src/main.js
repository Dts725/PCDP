import Vue from "vue";

//引入根组件
import App from "./App.vue"

// import login from "./components/login.vue"
//引入路由配置
import router from "./routers/router.js"


//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);


//引入mui的css
import "../libs/mui/css/mui.css"
import "../libs/mui/css/icons-extra.css"

var vm = new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: {App}
})