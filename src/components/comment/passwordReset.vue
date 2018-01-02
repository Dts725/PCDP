<template>
    
 <div>
      <mt-header title="找回密码">
        <router-link to="/" slot="left">
        <mt-button icon="back" style="color:#fff">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    <div class="body">


        <div class="forget-password">
          <span>找回密码</span>
        </div>
        <div class="page-part reset">
           <mt-field placeholder="输入账号"   type="email"></mt-field>
           <mt-field placeholder="输入验证码" type="password"></mt-field>
            <img  @click="refreshImg" src="http://10.230.34.166:8080/pcp-web/pcpmobile/securityCode.action?sessionId=RrXrLzVnCpxEYDk3RUQYXCdS1514509483146&amp;date=1514510732325" class="loginSecurityCode">
         </div>
         <div class="forget-password-next"> 
          <router-link to="/reset/next">
          <span>下一步</span>
          </router-link>
        </div>
    </div>
        
        
 </div>
</template>
<script>
export default {};
</script>
<style solt-scope>
.body {
  margin: 0 auto;
  width: 90%;
  position: relative;
  top: 0;
  right: 0;
}
input[type="email"],
input[type="password"],
input[type="text"] {
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0;
  font-weight: 700;
}
.forget-password {
  width: 50%;
  margin: 20% 0 0 6%;
  font-weight: 700;
}
.page-part.reset {
  margin: 10% 0 10% 0;
}
.loginSecurityCode {
  position: absolute;
  right: 2%;
  top: 54%;
}
.loginSecurityCode img{
    width: 20%;
    height: 13%;
}
.forget-password-next{
  width: 20%;
  position: relative;
  top:5%;
  left:7%;
  font-weight: 700;
}
</style>
