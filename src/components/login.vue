<template>
  <div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
<mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
<mt-field label="验证码" v-model="captcha">
  <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
</mt-field>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
