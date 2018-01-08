<template>
	<div class="loadingWord">
		<span class="iconfont icon-shangla">{{loadingWord}}</span>
	</div>
</template>

<script>
export default {
    props:{
    	loadingWord:{
    		type:String,
    		default:""
    	}
    } 

};
</script>

<style>

</style>
