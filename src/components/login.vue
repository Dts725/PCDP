<template>
  <div class="body">
      <span>
          <img   class="img-login" src="../img/Group 2@3x.png" alt="">
      </span>
     <div class="page-part login-ipt"  >
       
           <div class="iconfont">
               <span>&#xe611;</span>
                <input    v-model.trim="userName"  placeholder="输入账号"   type="number"> 
            </div>
  
           <div class="iconfont">
               <span>&#xe621;</span>
               
                <input placeholder="输入密码"  v-model.trim="userPassword" type="password">
            </div>
        <div class="iconfont">
               <span>&#xe67b;</span>
            
            <input placeholder="输入验证码"  v-model.trim="Verification" type="text">

            <img  @click="refreshImg" v-bind:src="VerificationImg"     class="loginSecurityCode">
        </div>
   
      <mt-button type="primary"  @click="loading" size="large" style="text-align : center">登录</mt-button>
    
    </div>
    <router-link style= "  font-size: 80%;
  float: right;" class="reset-password" to="/reset">
      <span>重置密码</span>
    </router-link>

  </div>
</template>

<script>
import axios from "axios";
import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';

import coo from '../config.js'
import { Indicator } from 'mint-ui';
import router  from 'router'
export default {
 data () {

    return {
      VerificationImg : "",
      info            : "",
      sessionId       : "",
      userName        : "",
      userPassword    : "",
      Verification    : "",

      
      openToast : () => {
        Toast('请检查输入');
      },
     //封装错误提示信息
      openToastWithIcon : () => {
        Toast({
          message: coo.getCache("message"),
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
 mounted () {

   this.refreshImg();
   this.userName = coo.getCache("mobileUserName")
   this.userPassword = coo.getCache("userPassword")
 
  

 },

  
 
  methods : {

      //登陆
     loading () {
        //检查输入是否为空
       if(this.Verification==="" || this.userName === "" || this.userPassword === ""){
          this.openToast();
          return;
       }
        this.info={
           "userReq": {
            "mobileLoginName"  : this.userName,
            "mobileLoginPwd"    : this.userPassword,
           },
           "securityCode"       : this.Verification,
            "sessionId"         : this.sessionId
          }
        this.info= JSON.stringify(this.info)
        //   console.log(this.info)
       //发送请求
        coo.sign(this.info,coo.LoginUrl +'pcpmobile/userLogin.action').then(res =>{
           if(res.data.success==true && res.status){
            //    console.log("就来执行了");
               coo.setCache("accessToken",res.data.accessToken)
               
               coo.setCache("cooperateCode",res.data.cooperateCode);
               coo.setCache("mobileUserName",res.data.mobileUserName)
               coo.setCache("roleAuth",res.data.roleAuth) 
               coo.setCache("userPassword",this.userPassword) 
               coo.setCache("cooperateName",res.data.cooperateName) 
                   this.$router.push('pieces?0');
               
          }else {
              this.refreshImg();
              coo.setCache("message",res.data.message)
               this.openToastWithIcon();
          }
       }).catch(err => {
         this.openToastWithIcon();
         console.log(err);
       })

     },
        //图片刷新
      refreshImg () {

          //获取后台图片ID

         axios({
            method      : 'POST',
            // headers     : { 'Content-Type': 'application/json; charset=UTF-8' },
            url         : coo.LoginUrl + "pcpmobile/getGenerateSessionId.action"
        }).then(res => {

            if ((res.data.success === true) && (res.status === 200)) {
                this.sessionId=res.data.sessionId;
                // 得到刷新图片的地址
                this.VerificationImg =coo. LoginUrl +'pcpmobile/securityCode.action?sessionId='+ this.sessionId +"&date:" + new Date().getTime()
            // console.log(this.sessionId)
            }
        }).catch(err => {
            console.log("进来了");
            
            console.log(err)
        })
   
      }
  }

};
</script>

<style lang="css" scoped>
.body {
    width: 80%;
    margin: 0 auto;
    font-size: 80%; 
}
.img-login {
    width: 100%;
    margin-bottom: 30px;
    /* height: 100%; */
}
.mint-button--primary {
    margin-bottom: 30px;
    color: #fff;
    background-color: #3a3f64;
    font-size: 85%;
}
input[type='number'],
input[type='password'], 
input[type='text'] {
    text-indent: 25px;
    font-size: 85%;
    line-height: 21px;
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
    padding: 10px 15px;
    -webkit-user-select: text;
    border: 1px solid rgba(238, 11, 11, 0);
    border-bottom: 1px solid #ddd;
    border-radius: 3px;
    outline: none;
    background-color: #fff;
    -webkit-appearance: none;
    position: relative;
}
.iconfont {
 
    position: relative;
     top: 0px;
    left: 0px;
   
} 
.iconfont > span {
    position: absolute;
    top: 10px;
    left: 12px; 
    z-index: 2;
}
.loginSecurityCode{
    position:absolute;
    top: 6px;
    right: 5PX;
    z-index: 2;
}
</style>
