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
      <mt-field placeholder="验证码" type="text">
        <img  @click="refreshImg" src="http://10.230.34.166:8080/pcp-web/pcpmobile/securityCode.action?sessionId=RrXrLzVnCpxEYDk3RUQYXCdS1514509483146&amp;date=1514510732325" class="loginSecurityCode">
      </mt-field>
    <router-link to="/pieces">
      <mt-button type="primary" size="large">登录</mt-button>
    </router-link>
    </div>
    <router-link style= "  font-size: 80%;
  float: right;" class="reset-password" to="/reset">
      <span>找回密码</span>
    </router-link>
  </div>
</template>

<script>
export default {};
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
