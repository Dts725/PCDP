<template>
<div class="details-entry" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" >
        <mt-header id="title-count" title="零担线索">
            <router-link to="/mine?3" class="iconfont" slot="left"> 
                &#xe6ba; 返回
          	</router-link>
        </mt-header>
		<div id="warp">
		<mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill = "false" ref="loadmore"  v-infinite-scroll="loadMoreMore"
  			infinite-scroll-disabled="loading">
    			<ul class="wrap">
      				<li  class = "info-sign"  v-for="item in 20" :key="item.id" >
          				<!-- 这样添加水印图片 不然webpack 打包会报错找不到图片路径 -->
          				<!-- <img  v-if="item.status === '7'"    src='../../../img/imgQian@2x.png' alt="">
          				<img  v-else   src='../../../img/imgWatie@2x.png' alt=""> -->
           			<ul>
                  		<li><span>姓名  </span><span > :    </span></li>
                  		<li><span class="iconfont" v-cloak>联系方式 : <a :href="'tel:' +item.recipientsPhone">{{item.recipientsPhone}}</a> </span></li>
                  		<li><span class="iconfont" v-cloak>货物信息 :&nbsp; {{item.recipients}}   </span></li>
                  		<li><span class="iconfont" v-cloak>发货地址 :  &nbsp; {{item.arriveTime | formatDate}}   </span></li>
                  		<li><span class="iconfont" v-cloak >提交时间 &nbsp;&nbsp; {{item.signforTime | formatDate}}  </span></li>
              		</ul>
          		</li>
    		</ul>
  		</mt-loadmore>
		</div>
	
	<router-link to="/ExpressEntry/listEntry">
		<div class="details-bottom">
				<span>新建线索</span>
		</div>
	</router-link>

	
</div>
</template>
<script>
import { Loadmore } from "mint-ui";
import { wrapper } from "mint-ui";
import { formatDate } from "../../../../date.js";
import axios from "axios";
import coo from "../../../../config.js";
import { MessageBox } from "mint-ui"; //confirm

import { Toast } from "mint-ui";
export default {
		data () {
				return {
					dataList : "",
					loading: false, //默认false 滑动加载
					allLoaded : false,
					wrapperHeight : 0	//页面滚动高度

				}
				},
		mounted () {
			this.mountedDataList();	
			this.mountstedScroo();
		},
		beforeDestroy(){
			//本地存储当前页面数据
			this.beforeDestroyDataList();
		},
		filters: {
			//注册一个时间过滤器
    		formatDate(time) {
      		let date = new Date(time);
      		return formatDate(date, "yyyy-MM-dd hh:mm");
    	}
  },
		methods : {
	  		loadTop: function() {
				  //下拉刷新
				  
				this.expressDetailsHTTP();
      			setTimeout(() => {
        			  this.$refs.loadmore.onTopLoaded(); 
      			}, 300);
			},
			loadMoreMore: function() {
				
					//滚动刷新
			
			this.expressDetailsHTTP();					
			  },
			expressDetailsHTTP() {
				//页面数据请求
				// let data = {

				// };

				// data = JSON.stringify(data);
				// coo.sign(data,coo.LoginUrl).then(res => {

				// }).atch ( err => {
				// 	console.error(err);
					
				// })
			},
			mountstedScroo ()  {
			
				this.wrapperHeight =document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top; //组件更新动态计算页面scroll 数据
			},
			mountedDataList () {
				if ((this.$store.state.entry.entryList).length>2 && this.$store.state.entry.flagEntry) {
					this.dataList = this.$store.state.entry.entryList;
				} else {
					//重新获取数据页面信息
					this.expressDetailsHTTP();
					
				}
			},
			beforeDestroyDataList () {
				//保存当前页面状态
				this.$store.commit('entryList',this.dataList)	
			}
		}
}
</script>
<style scoped>
/* .clearfix::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  clear: both;
} */
.iconfont {
	font-size: 100%;
}
.details-bottom {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 40px;
	line-height: 40px;
	background-color: #26a2ff;
	text-align: center;
	color: #fff;
	font-size: 80%;
}
.wrap li {
	box-sizing: border-box;
	background-color: rgb(236, 156, 6);
	padding: 5px 10px;
	font-size: 14px;
	margin-bottom: 5px;
}
#warp {
box-sizing: border-box;
height: 100%;
margin: 45px 0  35px 0;
overflow: auto;

}
#title-count{
	position: fixed;
	top: 0;
	left: 0;
}
</style>