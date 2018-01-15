<template>
    
 <div class= "top-reset-pwd">
      <mt-header title="重置密码">
        <router-link to="/" slot="left">
        <mt-button icon="back" style="color:#fff">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    <div class="body">


        <div class="forget-password">
          <span>重置密码</span>
        </div>
        <div class="page-part reset">
          <mt-field  placeholder="请输入旧密码" v-model.trim="oldPassword" type="passWord"></mt-field>
          <mt-field  placeholder="请输入新密码" v-model.trim="newPassword" type="passWord"></mt-field>
          <mt-field  placeholder="请输入新密码" v-model.trim="newPasswordNext" type="passWord"></mt-field>
        
           <!-- <mt-field placeholder="输入验证码" type="password"></mt-field>
            <img   @click="refreshImg" src="http://10.230.34.166:8080/pcp-web/pcpmobile/securityCode.action?sessionId=RrXrLzVnCpxEYDk3RUQYXCdS1514509483146&amp;date=1514510732325" class="loginSecurityCode"> -->
         </div>
         <div class="forget-password-next" @click="sureButton"> 
      
        <button>确定</button>
    
        </div>
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
            oldPassword :   "",
            newPassword :   "",
            newPasswordNext : "",
            findSerialUID   : coo.getCache("findSerialUID"),
            findMobileLoginName : coo.getCache("findMobileLoginName"),
           
            openToast (msg,times) {
            times  = times || 900;
            Toast({
            message: msg,
            position: 'middle',
            duration: parseInt(times)
        })
         }
        }
    },
    created () {
    
    },
    methods : {
      sureButton : function ()  {
      

          if(!this.oldPassword|| !this.newPassword || !this.newPasswordNext) {
           
              
            this.openToast("请检查输入");
            return
        
          }else if ( !this.newPassword === this.newPasswordNext) {
                this.openToast("两次密码输入不一样");
                console.log("有执行吗");
                return
          
             } else if(this.newPassword.length< 7) {
                 console.log(this.newPassword);
                 console.log(this.newPassword.length);
                 
                 this.openToast("新密码必须由大于8位的字母或数字组成",1500);
                return   
             } else {
                   let data = {
                   "oldPassword": this.oldPassword,
                    "newPassword": this.newPassword,
                    "findSerialUID": this.findSerialUID,
                    "findMobileLoginName": this.findMobileLoginName
          };
            data = JSON.stringify(data);  
            coo.sign(data,(coo.LoginUrl+"pcpmobile/resetUserPassword.action")).then(res => {
                if(res.status === "200" && res.data.success == true) {
                  
                    coo.setCache('findSerialUID', res.data.findSerialUID);
                    coo.setCache('findMobileLoginName', res.data.findPsdNum);
                    this.$router.push("/next")
                    } else {
             
                    
                        this.openToast(res.data.message,1500);

          
                        return  
          
              }

          }).catch(err => {
            console.log(err);
            
          })
             }
        
      }

    }
};
</script>
<style scoped>
.body {
  margin: 0 auto;
  width: 90%;
  position: relative;
  top: 0px;
  right: 0;
  padding-top: 80px;

}
.top-reset-pwd{
    margin-top: -40px;
}
.qrdcode {
    float: left;
}

  .forget-password-next {
      margin-top: 15%;
      width: 100%;
     transform: translateX(5%);     width: 100%;
  }
 .forget-password-next button {
    background-color: #68778382;
    /* float: left; */
 }
  .forget-password {
     text-align: center;
     margin-bottom: 50px;
     font-size: 20px;
     font-weight: 700;
 }
</style>
