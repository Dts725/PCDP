<template>
 
  <div class="top">

    
    <div>
        <mt-search v-model="value" cancel-text="取消" placeholder="请输入运单号">
        </mt-search>
    </div >
    <div class="query">
        <mt-button @click="openToast" size="large">查询运单</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data () {
    return {

    }
  },
    // mounted(){
    //      window.location.reload();
    // },
  methods: {
      openToast() {
        Toast('请输入运单号');
      }  
    }
};
</script>

<style lang="css" solt-scope>
element.style {
    height: 45px;
}
input[type="search"] {
  font-size: 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 34px;
  text-align: center;
  border: 0;
  border-radius: 6px;
  margin-bottom: 0px;
  background-color: rgba(60, 24, 24, 0);
}
.mint-search {
    /* height: 100%; */
    height: 100%;
    overflow: hidden;
}
.query{
  margin: 0 auto;
  margin-top: 15px;
  width: 80%;
}
.mint-searchbar-inner{
      height: 40px;
}
.mint-button--default {
    color: #8c7d76;
    font-weight: 700;
    background-color: #d9d9d912;
    box-shadow: 0px 0px 2px 1px #898d9242;
}
</style>
