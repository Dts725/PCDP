 import axios from 'axios'
export default {
    //判断是否显示app 首页的组件
    //var LoginUrl = 'http://10.224.66.135:8081/pcp-web/'; //涛爷本地环境IP地址
    LoginUrl : 'http://10.230.34.166:8080/pcp-web/',//测试环境IP地址
    //var LoginUrl ='https://pcp.deppon.com/pcp-web/';//线上地址；
    depponVersion : '0.0.1.0' ,//版本号；
    sysCode  : "APP",
    refreshImgUrlID: 'http://10.230.34.166:8080/pcp-web/pcpmobile/getGenerateSessionId.action',//测试获取验证码ID地址
    refreshImgUrl: 'http://10.230.34.166:8080/pcp-web/pcpmobile/securityCode.action?sessionId=',//测试刷新验证码地址
    //封装缓存
    testLoginUrl: 'http://10.230.34.166:8080/pcp-web/pcpmobile/userLogin.action',
    getCache :(key) =>{
      return  window.localStorage.getItem(key)
    },
    setCache : (key,values) => {
        window.localStorage.setItem(key,values)
    },
    getDataUrl : ()=> {
 
        var url = window.location.href;
        // console.log(url);
     if (url.substr(-6) === "/login" || url.substr(-1) === "/" || url.substr(-6) === "/reset"   ){
         return false;
     } else {
            //   self.location.reload(); 
            return true;
     }

    },
    //封装全局签收事件
    sign : (data,signUrl) =>  {
        
      return   axios({
            method      : 'POST',
            headers     : { 'Content-Type': 'application/json; charset=UTF-8' },
            url         : signUrl,
            data        : data
            
        })
    } 
   
    //LoginUrl + "pcpmobile/signforWayBill.action",
}