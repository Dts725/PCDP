<template>
   <div class="query">
     <mt-button @click="openToast" size="large">查询运单</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
   openToast() {
        Toast('请输入运单号');
      }  
}
</script>
<style>

</style>

