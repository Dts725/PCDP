<template>
  <div class="top-app">
     <mt-header  v-show="flag()"  v-bind:title="mesage[forTittle()]">
    
      </mt-header>

          <div class="router-view">
             <router-view/>
        </div>   
       

     <nav v-show="flag()" class="mui-bar mui-bar-tab" >
			  <router-link class="mui-tab-item1" to="/pieces?0" >
				  <span class="iconfont mui-icon"> &#xe605;</span>
				  <span class="mui-tab-label" >到件</span>
		  	</router-link>
			  <router-link class="mui-tab-item1" to="/sign?1">
                   <span v-show="signIco" class="detetion" v-cloak>{{signIco}}</span>
              
			  	<span class="mui-icon iconfont">&#xe773;</span>
			  	<span class="mui-tab-label">签收</span>
		  	</router-link>
		  	<router-link class="mui-tab-item1" to="/detention?2">
                   <span class="detetion" v-show="detentionIco"  v-cloak>{{detentionIco}}</span>
				  <span class="mui-icon iconfont">&#xe66c;</span>
				  <span class="mui-tab-label">滞留</span>
		  	</router-link>
	  		<router-link class="mui-tab-item1" to="/mine?3">
			  	<span class="mui-icon iconfont">&#xe611;</span>
				  <span class="mui-tab-label">我的</span>
		  	</router-link> 
		</nav>
   
  </div>
</template>

<script>
import coo from "./config";
export default {
  data() {
    return {
      mesage: ["到件", "签收", "滞留", "我的"]
    };
  },
  mounted  () {
  },
  computed: {
    signIco() {
      return this.$store.state.tips.signNumber;
    },
    detentionIco() {
      return this.$store.state.tips.detentionNumber;
    }
  },
  methods: {
    //再出拿到哈希值 决定tittle 的名字
    forTittle() {
      return location.hash.substr(-1);
    },
    //判断模块显示隐藏
    flag() {
      return coo.getDataUrl();
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
.router-view {
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 50px;
  padding-top: 40px;
  /* z-index: -2; */
}
.mint-header {
  position: fixed;
  z-index: 20;
  width: 100%;
}
.mui-tab-item1 {
  position: relative;
  top: 0;
  left: 0;
}

/* .detetion {
    position: absolute;
    top: 0;
    right: 25px;

    display: block;
    width: 18px;
    height: 18px;
    text-align: center;
    color: #fff;
    font-size: 8px;
    background-color: red;
    border-radius: 50%;
    z-index: 22;
} */
.detetion {
  display: block;
  width: 30px;
  height: 19px;
  border-radius: 9px;
  font-size: 12px;
  background-color: #f44336;
  color: #fff;
  position: absolute;
  top: 1px;
  right: 6px;
}

.mui-tab-item1:nth-of-type(2) > .detetion {
  background-color: #4caf50;
}
.mint-header-title {
	padding-top: 2px;

}
</style>
