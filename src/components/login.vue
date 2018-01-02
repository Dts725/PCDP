<template>
  <div class="body">
      <span>
          <img src="../img/Group 2@3x.png" alt="">
      </span>
     <div class="page-part login-ipt"  >
       <div class="iconfont">&#xe611;</div>
       <mt-field style="border:0px 0px 0px 0px;"   placeholder="登录邮箱"   type="email"> 
      </mt-field>
      <div class="iconfont">&#xe621;</div>
      <mt-field placeholder="密码" type="password">
      </mt-field>     
      <div class="iconfont">&#xe67b;</div>
      <mt-field placeholder="验证码" v-model="Verification" type="text">
        <img  @click="refreshImg" v-bind:src="VerificationImg"     class="loginSecurityCode">
      </mt-field>
    <router-link to="/pieces">
      <mt-button type="primary" size="large" @click="loading">登录</mt-button>
    </router-link>
    </div>
    <router-link style= "  font-size: 80%;
  float: right;" class="reset-password" to="/reset">
      <span>找回密码</span>
    </router-link>
         <!-- <mt-button @click.native="openToast" size="large">点击弹出 Toast</mt-button> -->
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from 'mint-ui';
export default {
 data () {


   var test = true; //true的时候就是本地联调，false的时候就是正式
   //var LoginUrl = 'http://10.224.66.135:8081/pcp-web/'; //涛爷本地环境IP地址
    var LoginUrl = 'http://10.230.34.166:8080/pcp-web/'; //测试环境IP地址
    //var LoginUrl ='https://pcp.deppon.com/pcp-web/';//线上地址；
    var depponVersion = '0.0.1.0'; //版本号；
    var sysCode = "APP";
    return {
         Verification : "",
         VerificationImg :  'http://10.230.34.166:8080/pcp-web/pcpmobile/securityCode.action?sessionId=RrXrLzVnCpxEYDk3RUQYXCdS1514509483146&amp;'
    }
 },
  methods : {
      openToast() {
          message: '请输入验证码',
        Toast('提示信息');
      },

      openToastWithIcon() {
        Toast({
          message: '请输入验证码',
          iconClass: 'mintui mintui-success'
        });
      },

      openBottomToast() {
        Toast({
          message: '请输入验证码',
          position: 'bottom'
        });
      },
      //发送登陆情趣
     loading () {
        //校验验证码
       if(Verification===""){
          openToast();
          return
       }
       //发送请求
       axios({
         methods : "post",
         url : LoginUrl,
         data : {

         }
       }).then(res =>{
          if(res.success==true){

          }
       }).catch(err => {
         console.log(err);
       })

     },
     //点击更换验证码
      refreshImg () {
        // console.log("date=" + new Date().getTime());
    
      this.VerificationImg ='http://10.230.34.166:8080/pcp-web/pcpmobile/securityCode.action?sessionId=RrXrLzVnCpxEYDk3RUQYXCdS1514509483146&amp;'+"date=" + new Date().getTime()
      }
  }

};
</script>

<style lang="css" sloat-scope>
.body {
  margin: 20% auto;
  width: 80%;
}
.body span img {
  margin-top: 10%;
  width: 100%;
}
.login-ipt {
  margin-top: 20%;
}
input[type="email"],
input[type="password"],
input[type="text"] {
  
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0;
  text-indent: 20px;
  position: relative;
}



span > img {
  width: 100%;
}

.iconfont {
  width: 5%;
  position: relative;
  left: 5%;
  top: 0;
  transform: translateY(30px);
  z-index: 2;
 


}
.loginSecurityCode {
position: absolute;
right:50%;
top: -18px;

}
.loginSecurityCode img{
width: 20%;
    height: 13%;
}
.mint-button--primary {
    color: #fff;
    background-color: #3a3f64;
    font-size: 80%;
    margin-top: 12%;
    margin-bottom: 6%;
}


</style>
