<template>
  <div class="body">
      <span>
          <img src="../img/Group 2@3x.png" alt="">
      </span>
     <div class="page-part login-ipt">
       
        <i class="iconfont">&#xe611;</i>
      <mt-field style="border:0px 0px 0px 0px;"  placeholder=" 登录邮箱"   type="email"> 
      </mt-field>
        <i class="iconfont">&#xe621;</i>
      <mt-field placeholder="密码" type="password"></mt-field>
      <mt-field placeholder="验证码" type="text">
      </mt-field>
    </div>

    <router-link style= "  font-size: 80%;
  float: right;" class="reset-password" to="/reset">
      <span>点击找回密码</span>
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
input[type='email'],input[type='password'],input[type='text']{
 border: 0;
 border-bottom: 1px solid rgba(0,0,0,.2);
 border-radius:0;
  
}
router-link{
  font-size: 80%;
  float: right;
}
span > img {
  width: 80%;
}
.iconfont {
  position: relative;
  left : 50%;
  color :#ccc;

}
</style>
