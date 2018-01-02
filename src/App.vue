<template>
  <div class="top-app">
 

      
      <router-view/>

     <nav v-show="flag()" class="mui-bar mui-bar-tab" >
			  <router-link class="mui-tab-item1" to="/pieces" >
				  <span class="iconfont mui-icon"> &#xe605;</span>
				  <span class="mui-tab-label" >到件</span>
		  	</router-link>
			  <router-link class="mui-tab-item1" to="/sign">
			  	<span class="mui-icon iconfont">&#xe773;</span>
			  	<span class="mui-tab-label">签收</span>
		  	</router-link>
		  	<router-link class="mui-tab-item1" to="/detention">
				  <span class="mui-icon iconfont">&#xe654;<span class="mui-badge">9</span></span>
				  <span class="mui-tab-label">滞留</span>
		  	</router-link>
	  		<router-link class="mui-tab-item1" to="/mine">
			  	<span class="mui-icon iconfont">&#xe611;</span>
				  <span class="mui-tab-label">我的</span>
		  	</router-link> 
		</nav>
   
  </div>
</template>

<script>
import  coo from  './config'


export default {
data () {
  return {


  }
  
},
methods : {


  flag(){
    
      console.log( coo.getDataUrl())
      // location.href
    return   coo.getDataUrl();
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

.router-link-active {
  color: #007aff !important;
}

.main {
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
.mui-bar .mui-icon {
    font-size: 24px;
    position: relative;
    z-index: 20;
    padding-top: 10px;
    left: 0%;
    transform: translateY(0px);
    padding-bottom: 10px;
}
</style>
