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
      
           let data = {
                   "oldPassword": this.oldPassword,
                    "newPassword": this.newPassword,
                    "findSerialUID": this.findSerialUID,
                    "findMobileLoginName": this.findMobileLoginName
          };
            data = JSON.stringify(data);  
            
                if(!this.oldPassword|| !this.newPassword || !this.newPasswordNext) {
                    // console.log("进来第一层了");
                    
                    // if(!this.newPassword === this.newPasswordNext){
                    //     console.log("进来第二层了");
                        
                    //     this.openToast("两次密码输入不一样请重新输入");
                    //     return 
                    // }
                    this.openToast("请检查输入");
                    return
        
                 } 
                  console.log(data);
                  
            coo.sign(data,(coo.LoginUrl+"pcpmobile/resetUserPassword.action")).then(res => {
                if(res.status === 200 && res.data.success == true) {
                    this.openToast("密码重置成功 请重新登陆",1500)
                    window.localStorage.removeItem("userPassword")
                    this.$router.push("/login")
                    } else {
             
                    
                        this.openToast("修改失败请重试",1500);
          
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
 .count-header.back-count.iconfont {

    background-color: #26a2ff;
    transform: translateY(-1px);
    width: 50%;
    color: #fff;
} 
</style>
