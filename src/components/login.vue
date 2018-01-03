<template>
  <div class="body">
      <span>
          <img src="../img/Group 2@3x.png" alt="">
      </span>
     <div class="page-part login-ipt"  >
       <div class="iconfont">&#xe611;</div>
       <mt-field style="border:0px 0px 0px 0px;"   v-model="info.userName"  placeholder="输入账号"   type="email"> 
      </mt-field>
      <div class="iconfont">&#xe621;</div>
      <mt-field placeholder="输入密码"  v-model="info.userPassword" type="password">
      </mt-field>     
      <div class="iconfont">&#xe67b;</div>
      <mt-field placeholder="输入验证码" v-model="info.Verification" type="text">
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
import coo from '../config.js'
export default {
 data () {

    return {
      VerificationImg : "",
      info :{
      sessionId       : "",
      userName        : "",
      userPassword    : "",
      Verification    : "",

      },
      
      openToast : () => {
        Toast('请检查输入');
      },

      openToastWithIcon : () => {
        Toast({
          message: '登陆失败请重新输入',
          iconClass: 'mintui mintui-success'
        });
      },

      openBottomToast : () => {
        Toast({
          message: '请输入验证码',
          position: 'bottom'
        });
      },
   
   
    }
 },
 //页面元素显示前执行内容
 created () {

   this.refreshImg();
 },
  methods : {

      //发送登陆请求
     loading () {
       var dataArray=[]
        //检查输入是否为空
       if(this.Verification==="" || this.userName === "" || this.userPassword === ""){
          this.openToast();
          return;
       }
       for (let key in this.info) {
         dataArray.push(this.info[key]);
       }
       //发送请求
       axios({
         methods : "post",
         url :coo.testLoginUrl ,
         data : JSON.stringify(dataArray.join())
          // {
          //   "mobileLoginName" : this.userName,
          //   "mobileLoginPwd"  : this.userPassword,
          //   "securityCode"    : this.Verification,
          //   "sessionId"       : this.sessionId
          // }
       }).then(res =>{
         console.log(res);
          if(res.data.success==true){

          }
       }).catch(err => {
         this.openToastWithIcon();
         console.log(err);
       })

     },
   
      refreshImg () {
        //获取sessionId
         coo.getSessionId(coo.refreshImgUrlID);
        // coo.getSessionId(coo.refreshImgUrlID);
        this.info.sessionId=coo.getCache("sessionId");
        this.VerificationImg =coo. refreshImgUrl+ this.info.sessionId +";date=" + new Date().getTime()
   
          console.log(this.info.sessionId)
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
