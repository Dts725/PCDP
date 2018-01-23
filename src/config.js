 import axios from 'axios'
export default {
    //判断是否显示app 首页的组件
    //var LoginUrl = 'http://10.224.66.135:8081/pcp-web/'; //涛爷本地环境IP地址
    LoginUrl : 'http://10.230.34.166:8080/pcp-web/',//测试环境IP地址
    //var LoginUrl ='https://pcp.deppon.com/pcp-web/';//线上地址；
    depponVersion : '0.0.1.0' ,//版本号；
    sysCode  : "APP",
 
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
        if (url.substr(-7) === "/sign?1" || url.substr(-9) === "/pieces?0" || url.substr(-12) === "/detention?2" || url.substr(-7) === "/mine?3" ){
         return true;
     } else {
            //   self.location.reload(); 
            return false;
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
    },
   //封装全局网络报错提示信息

    Toast :  (msg,times) => {
        times  = times || 900;
     return   Toast({
            message: msg,
            position: 'middle',
            duration: parseInt(times)
        });
    },
    // 封装判断用户终端是ios 还是Android

    whtasPhone: () => {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

           if (isAndroid){
               // 安卓存储为 "1"
               window.localStorage.setItem("Android","1")
           }else {
               //ios 存储为 "2"
               window.localStorage.setItem("ios","2")
               
           }


        // alert('是否是Android：' + isAndroid);
        // alert('是否是iOS：' + isiOS);
    },
    


    
 
}
 