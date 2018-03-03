<template>

		<div  :class="isAndroid ? 'router-view-android': 'router-view-ios'"> 
	<keep-alive>
  		<router-view ></router-view>
	</keep-alive>
		</div>
	
</template>
<script>
import coo from "../../../../config"
export default {	
	data () {
		return {
			isAndroid : 1 //默认安卓设备
		}
	},
  created () {
	 this.isAndroid = coo.whtasPhone();
	  
  },
	}
</script>
<style scoped>
.router-view-android {
  overflow: hidden;
  font-size: 20px;
}
.router-view-ios {
  overflow: hidden;
  font-size: 22px;
}
</style>