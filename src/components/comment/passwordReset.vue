<template>
 <div>

      <mt-header title="找回密码">
        <router-link to="/" slot="left">
          <mt-button icon="back" style="color:#fff">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>

        <div class="page-part">
      <mt-field placeholder=" 登录邮箱"   type="email"></mt-field>
      <mt-field placeholder="密码" type="password"></mt-field>
    </div>
     <!-- <div class="page-part">
      <mt-field label="验证码" placeholder="输入验证码">
        <img src="" height="48px" width="100px">
      </mt-field> -->
 </div>
</template>
<script>
    export default  {
        
    }
</script>
<style> 


</style>
