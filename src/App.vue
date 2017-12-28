<template>
  <div>
    <!-- <mt-header fixed title="首页">
      <mt-button icon="back" slot="left" v-show="false">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button> -->
    <!-- </mt-header> -->

      <router-view/>

    <!-- <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link> -->
		<!-- </nav> -->
  </div>
</template>

<script>
export default {
	methods:{
		test(){
			console.log(1)
		}
	}
};
</script>

<style>
html body {
  margin: 0;
  padding: 0;
  background-color: #fff;
}

.router-link-active{
  color: #007aff !important;
}

.main{
    margin-top: 41px;
    margin-bottom: 50px;
}



.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
