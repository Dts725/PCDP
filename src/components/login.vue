<template>
  <div class="body">
      <span>
          <img src="../img/Group 2@3x.png" alt="">
      </span>
     <div class="page-part login-ipt"  >
       <div class="iconfont">&#xe611;</div>
       <mt-field style="border:0px 0px 0px 0px;"   v-model.trim="userName"  placeholder="输入账号"   type="number"> 
      </mt-field>
      <div class="iconfont">&#xe621;</div>
      <mt-field placeholder="输入密码"  v-model.trim="userPassword" type="password">
      </mt-field>     
      <div class="iconfont">&#xe67b;</div>
      <mt-field placeholder="输入验证码"  v-model.trim="Verification" type="text">
        <img  @click="refreshImg" v-bind:src="VerificationImg"     class="loginSecurityCode">
      </mt-field>
   
      <mt-button type="primary"  @click="loading" size="large" style="text-align : center">登录</mt-button>
    
    </div>
    <router-link style= "  font-size: 80%;
  float: right;" class="reset-password" to="/reset">
      <span>找回密码</span>
    </router-link>
 
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from 'mint-ui';
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
          console.log(this.info)
       //发送请求
        coo.sign(this.info,coo.testLoginUrl).then(res =>{
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
               openToastWithIcon();
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
            method: "post",
            url: coo.refreshImgUrlID
        }).then(res => {
            if ((res.data.success === true) && (res.status === 200)) {
                this.sessionId=res.data.sessionId;
                // 得到刷新图片的地址
                this.VerificationImg =coo. refreshImgUrl+ this.sessionId +"&date:" + new Date().getTime()
            // console.log(this.sessionId)
            }
        }).catch(err => {
            console.log(err)
        })
   
      }
  }

};
</script>

<style lang="css" sloat-scope>
.body {
  margin: 0 auto;
  width: 80%;
}
.body span img {
  margin-top: 10%;
  width: 100%;
}
.login-ipt {
  margin-top: 20%;
}
input[type="number"],
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
