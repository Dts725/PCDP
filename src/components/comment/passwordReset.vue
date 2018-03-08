<template>
    
 <div class= "top-reset-pwd">
      <mt-header title="重置密码">
        <router-link to="/" slot="left">
        <mt-button class="iconfont count-header back-count">&#xe6ba;返回</mt-button>
        </router-link>
     
      </mt-header>
    <div class="body">


        <div class="forget-password">
          <span>重置密码</span>
        </div>
        <div class="page-part reset">
       
            <div class="iconfont">
                <input  placeholder="请输入账号" v-model="userCode" type="text">
            </div>
            <div class="iconfont">
                <input placeholder="请输入验证码" v-model="securityCode" type="text">
                <img @click="refreshImg" :src="VerificationImg"  alt="验证码获取失败">
            </div>

           <!-- <mt-field placeholder="输入验证码" type="password"></mt-field>
            <img   @click="refreshImg" src="http://10.230.34.166:8080/pcp-web/pcpmobile/securityCode.action?sessionId=RrXrLzVnCpxEYDk3RUQYXCdS1514509483146&amp;date=1514510732325" class="loginSecurityCode"> -->
         </div>
         <div class="forget-password-next" @click="nextButton"> 下一步</div>
</div>
        
        
 </div>
</template>
<script>
import { Field } from 'mint-ui'
import coo from '../../config.js'
import axios from 'axios'
import { Toast } from 'mint-ui';
export default {
    data () {
        return {

            VerificationImg : null,
            userCode  : "",
            securityCode : "",
            sessionId   : "",
            openToast (msg,times) {
             times  = times || 2500;
            Toast({
            message: msg,
            position: 'middle',
            duration: parseInt(times)
        })
         }
        
            
        }
    },
    activated () {
        this.refreshImg()
    },
    methods : {
       //图片刷新
    refreshImg() {
      //获取后台图片ID

      axios({
        method: "POST",
        // headers     : { 'Content-Type': 'application/json; charset=UTF-8' },
        url: coo.LoginUrl + "pcpmobile/getGenerateSessionId.action"
      })
        .then(res => {
          if (res.data.success === true && res.status === 200) {
            this.sessionId = res.data.sessionId;
            // 得到刷新图片的地址
            this.VerificationImg =
              coo.LoginUrl +
              "pcpmobile/securityCode.action?sessionId=" +
              this.sessionId +
              "&date:" +
              new Date().getTime();
            // console.log(this.sessionId)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
      nextButton : function ()  {

          if(!this.securityCode || !this.userCode) {   
              this.openToast("请检查输入",2500);
              return  
          }
          let data = {
                "findMobileLoginName": this.userCode,
                "securityCode": this.securityCode,
                "sessionId": this.sessionId
          };
          data = JSON.stringify(data);  
          coo.sign(data,(coo.LoginUrl+"pcpmobile/findUserInfo.action")).then(res => {
              if(res.status === 200 && res.data.success === true) {
                  
                    coo.setCache('findSerialUID', res.data.findSerialUID);
                    coo.setCache('findMobileLoginName', this.userCode);
                    this.$router.push("/next")
              } else {
             
                     this.refreshImg();
                    this.openToast(res.data.message,2500);
          
              return  
          
              }

          }).catch(err => {
            console.log(err);
            
          })
      }

    }
};
</script>
<style scoped>

.body {
  margin: 0 auto;
  width: 80%;
  position: relative;
  top: 0px;
  right: 0;
  padding-top: 80px;

}
.forget-password-next{
    margin-top: 15%;
    width: 100%;
	height: 40px;
	background-color: #687783;
	text-align: center;
	line-height: 40px;
	border-radius: 5px;
}
.router-link-active {
    color: #fff !important;
}
.forget-password {
    text-align: center;
    margin-bottom: 30px; 
}
.iconfont {
    position: relative;
    top: 0;
    left: 0;
}
.iconfont > input {
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    text-indent: 15px;
    font-size: 80%;
} 
.iconfont  > img    {
    position: absolute;
    top: 3px;
    right: 0;

} 
</style>
