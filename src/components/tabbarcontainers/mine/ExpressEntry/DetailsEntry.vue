<template>
<div class="details-entry" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" >
        <mt-header id="title-count" title="零担线索">
            <router-link to="/mine?3" class="iconfont" slot="left"> 
                &#xe6ba; 返回
          	</router-link>
        </mt-header>
		
		<mt-loadmore :top-method="loadTop"  :auto-fill = "false" ref="loadmore"  finite-scroll-distance = "100" :bottom-all-loaded="allLoaded" v-infinite-scroll="loadMoreMore"
  			infinite-scroll-disabled="loading" infinite-scroll-immediate-check = "true" >
			<div class="wrap">
    			<ul>
      				<li  class = "info-entry"  v-for="item in dataList" :key="item.entryList" >
          				<img class="icon-entry" v-if="item.deliveryStatus === '2'" v-cloak src="../../../../img/yitijiao@2x.png">
          				<img  class="icon-entry" v-else v-cloak src="../../../../img/yikaidan@2x.png">
           			<ul class="ifon-item-entry">
                  		<li><span>姓名  </span><span > :   {{item.partnerName}} </span></li>
                  		<li><span class="iconfont" v-cloak>联系方式 : <a :href="'tel:' +item.phoneNumber">{{item.phoneNumber}}</a> </span></li>
                  		<li><span class="iconfont" v-cloak>货物信息 :&nbsp; {{item.goodsInformation}}   </span></li>
                  		<li><span class="iconfont" v-cloak>发货地址 :  &nbsp; {{item.deliveryAddress}}   </span></li>
                  		<li><span class="iconfont" v-cloak >提交时间 &nbsp;&nbsp; {{item.createTime | formatDate}}  </span></li>
              		</ul>
          		</li>
			<li v-show="totalpage === pageNo" @click="topRefresh"  v-cloak class="refresh-bottom">到底啦 点击更新数据!</li>
    	</ul>
	</div>
  		</mt-loadmore>
		
	
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
import { InfiniteScroll } from 'mint-ui';
import coo from "../../../../config.js";
import { MessageBox } from "mint-ui"; //confirm
import { Indicator } from 'mint-ui';

import { Toast } from "mint-ui";
export default {
		data () {
				return {
					allLoaded		: true ,// 禁止上啦
					dataList 		: "",
					loading			: false, //默认false 滑动加载
					wrapperHeight 	: 0,	//页面滚动高度
					limit 			: 20,
					start			: 0,
					accessToken		: coo.getCache("accessToken"),
      				cooperateCode	: coo.getCache("cooperateCode"),
					mobileUserName  : coo.getCache("mobileUserName"),
					roleAuth		: coo.getCache("roleAuth"),
					pageNo			: 1, //开始页数
					totalpage		: 0, //最大可分页码
					firstFlag		: 0, //是否首次刷新 或者上拉刷新
				}
				},
	
		mounted () {
			//页面加载数据
			this.mountedDataList();	
			//滚动高度
			this.mountstedScroll();
		
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
				topRefresh : function () {
	  				this.dataList = "";
					//底部刷新返回到底部刷新事件
      				this.pageNo =1;
	  				this.totalpage =0;
      				this.start = 0;
	  				this.expressDetailsHTTP();		
			},
	  		loadTop: function() {    
				//下拉刷新
				this.pageNo = 1;
				this.start = 0;
				this.firstFlag = 1;
				this.expressDetailsHTTP();
			
      			setTimeout(() => {
        			  this.$refs.loadmore.onTopLoaded(); 
      			}, 300);
			},
			loadMoreMore: function() {
			//滚动加载
				this.firstFlag = 0;
							// console.log("到底了");
				if (this.pageNo < this.totalpage) {
					this.pageNo = this.pageNo + 1;
					this.start = this.start + 20;
					this.expressDetailsHTTP();	
				}
			},
			expressDetailsHTTP() {
				Indicator.open({
  					text: '加载中...',
 		 			spinnerType: 'fading-circle'
				});
			//	页面数据请求
      			let data = {
        			limit: this.limit,
        			start: this.start,
        			accessToken: this.accessToken,
        			cooperateCode: this.cooperateCode,
        			mobileUserName: this.mobileUserName,
        			roleAuth: this.roleAuth
				  };
				  data = JSON.stringify(data);
				coo.sign(data,coo.LingDanUrl+'pcpmobile/queryInputClueList.action').then(res => {
				
					if(res.status === 200 && res.data.success === true) {
						//回复状态
						if (firstFlag) {
							this.totalpage = Math.ceil(res.data.totalCount/this.limit);
							this.dataList = res.data.entityList;
						} else {
							this.totalpage = Math.ceil(res.data.totalCount/this.limit);
							this.dataList = this.dataList.concat(res.data.entityList);
						}
						Indicator.close();
					} else {
							Toast({
        					message: '数据获取失败请重试',
        					duration: 1200,       				
						  });
					}
					
				}).catch ( err => {

					console.error(err);
					Toast({
        					message: res.message,
        					duration: 1200,
						  });

					
				})
			},
			mountstedScroll ()  {
				//滚动加载页面
				this.wrapperHeight =document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top; //组件更新动态计算页面scroll 数据
			},
			mountedDataList () {
				//页面数据是否走缓存
				if ((this.$store.state.entry.entryList).length>2 && this.$store.state.entry.flagEntry) {
					this.dataList = this.$store.state.entry.entryList;
					thi.pageNo = this.totalpage;
				} else {
					//重新获取数据页面信息
					this.firstFlag = 1;
					this.expressDetailsHTTP();	
					this.$store.dispatch('flagEntryMutations',1)
				}
			},
			beforeDestroyDataList () {
				//保存当前页面状态
				this.$store.dispatch('entryListActions',this.dataList)
			
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
	padding: 5px 10px;
	font-size: 80%;
	margin-bottom: 5px;

}
.wrap{
	margin: 40px 0; 
}
.details-entry {
	overflow: auto;
}
#title-count{
	position: fixed;
	top: 0;
	left: 0;
}
.info-entry{
	position: relative;
	top: 0;
	left: 0;
}
.icon-entry {
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate(-20px,-50%);
}
.info-entry {
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
}
.refresh-bottom{
	height: 50px;
	font-size: 20px;
	text-align: center;
	color: #26a2ff;
	line-height: 50px;
	font-weight: 700;
}
</style>