<template>
<div  class="fall-scoll" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">


   <mt-loadmore :top-method="loadTop"  :auto-fill = "false" ref="loadmore"  infinite-scroll-distance = "100" v-infinite-scroll="loadMoreMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check = "true" >
    <ul class="wrap">
      <li   class = "info-sign"  v-for="(item,index) in 5" :key="item.id" >
          <!-- 这样添加水印图片 不然webpack 打包会报错找不到图片路径 -->
          <img  v-if="item.status === '7'"    src='../../../img/imgQian@2x.png' alt="">
          <img  v-else   src='../../../img/imgWatie@2x.png' alt="">
           <ul>
                          
		<input type="checkbox" :id="item.id" :value="index" v-model="checkedNames">
  <label :for="item.id">Jack</label>
  <span>Checked names: {{ checkedNames }}</span>
            </ul>
          </li>
			<li v-show="totalpage === pageNo" @click="topRefresh"  v-cloak class="refresh-bottom">到底啦 点击更新数据 !</li>


    </ul>

  </mt-loadmore>
  	<div class="checkbox-botton">
		<span class="iconfont" v-if="checkedNames.length !== 5" queryAll(checkedNames.length)> &#xe660;  全选</span>
		<span class="iconfont" v-if="checkedNames.length === 5"> &#xe626;  全选</span>
		<span>到件</span>
	</div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { wrapper } from "mint-ui";
import { formatDate } from "../../../date.js";
import axios from "axios";
import coo from "../../../config.js";
import { MessageBox } from "mint-ui"; //confirm
import { Indicator } from 'mint-ui';
import { Toast } from "mint-ui";



export default {
 name : "sign",
  data() {
    return {
	  checkedNames : [],
	  refreshFlag    : 0, //首次刷新 默认为0  不是刷新
      flagSign: 1,
      loading: false, //默认false 滑动加载
      wrapperHeight: 0, //页面scroll 数据
      start: 0, //数据加载开始的位置
      limit: 20, // 每页允许的加载数据条数
      accessToken: coo.getCache("accessToken"),
      cooperateCode: coo.getCache("cooperateCode"),
      mobileUserName: coo.getCache("mobileUserName"),
      roleAuth: coo.getCache("roleAuth"),
      pageNo: 1, //加载的页数  判断刷新次数 pangeNo ++
      proCopyright: [], //用来存储后台接受的数据

      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      totalpage: 0 //计算出来应有的 刷新次数
    };
  },
mounted () {
	console.log("9898989");
	
    this.mountedSign();
    this.wrapperHeight =
    document.documentElement.clientHeight -
	this.$refs.wrapper.getBoundingClientRect().top; //组件更新动态计算页面scroll 数据  	
},
//   activated () {
// 	this.isKeepAlive();
//     this.mountedSign();
//     this.wrapperHeight =
//     document.documentElement.clientHeight -
// 	this.$refs.wrapper.getBoundingClientRect().top; //组件更新动态计算页面scroll 数据  	
//   },
  beforeDestroy  () {
    this.beforeDestroySign();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {

	  //是否全选
	  queryAll :  () => {

	  },
	// 获取当前时间 用来填签收时间
	getDate: (times) => {
		times === null ? times = new Date().valueOf() : times;
		return times
	},
	topRefresh : function () {

	  this.proCopyright =[];
	//底部刷新返回到底部刷新事件
      this.pageNo =1;
	  this.totalpage =0;
      this.start = 0;
	  this.upLoadMore();	
	},
    openToast(msg) {
      Toast({
        message: msg,
        duration: 900,
        className: "open-tosat"
      });
    },
    openConfirm(msg, statusCode, $id, $wayBillNo, $index) {
      //提示信息
      MessageBox.confirm(msg).then(action => {
        let data = {
          accessToken: this.accessToken,
          cooperateCode: this.cooperateCode,
          mobileUserName: this.mobileUserName,
          operationRequest: {
            operationId: $id,
            operationStatus: statusCode,
            operationWayBillNo: $wayBillNo
          }
        };
        data = JSON.stringify(data);
        let signUrl = "";
        if (statusCode === "700") {
          signUrl = "pcpmobile/signforWayBill.action"; //签收接口
        } else {
          signUrl = "pcpmobile/retentionWayBill.action"; //滞留接口
        }
        //调用签收接口
        coo
          .sign(data, coo.LoginUrl + signUrl)
          .then(res => {
            // console.log(res);
            if (res.status == 200 && res.data.success == true) {
              if (statusCode === "700") {
                this.proCopyright[$index].status = "7";
                this.openToast("已签收");
              } else {
                this.proCopyright[$index].status = "7";
                this.openToast("已滞留");
                this.proCopyright.splice($index, 1);
              }
              this.flagSign = 0;
              //-------------------------------状态管理天至此处-------------------------------------
			this.signStore();
			
            }
          })
          .catch(err => {
            // console.log("你干嘛进来");
            if (statusCode === "700") {
              this.openToast("签收失败 请重试!");
            } else {
              this.openToast("滞留失败 请重试!");
            }
            console.log(err);
          });
      });
	},
	//滚动加载
    loadMoreMore: function() {
    //   console.log("出发了scroll");
      // this.loading =true;
		this.refreshFlag = 0;
        //   console.log("more方法查询的")
		if (this.totalpage > this.pageNo) {
			 this.pageNo = this.pageNo + 1;
        	 this.start = this.start + 20;
        	 this.upLoadMore();
		}
    },
    loadTop: function() {
	  this.refreshFlag = 1;
      this.pageNo = 1;
      this.start = 0;
      this.upLoadMore();
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 300);
    },
    upLoadMore: function() {

	  //封装刷新加载函数
	    Indicator.open({
  			text: '加载中...',
 		 	spinnerType: 'fading-circle'
		});
			
      let data = {
        limit: this.limit,
        start: this.start,
        accessToken: this.accessToken,
        cooperateCode: this.cooperateCode,
        mobileUserName: this.mobileUserName,
        roleAuth: this.roleAuth
      };
      data = JSON.stringify(data);
      coo
        .sign(data, coo.LoginUrl + "pcpmobile/querySignWayBillInfo.action")
        .then(res => {
          if (res.status == "200" && res.data.success == true) {
			  if (this.refreshFlag) {
				  	this.proCopyright =res.data.wayBillInfoList;
            		this.totalpage = Math.ceil(res.data.totalCount / this.limit); //计算出需要刷新的次数	  
			  } else {
            		this.totalpage = Math.ceil(res.data.totalCount / this.limit); //计算出需要刷新的次数				  	
            	 	this.proCopyright = this.proCopyright.concat(res.data.wayBillInfoList);
			  }
			this.signStore();
			Indicator.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //状态管理
    signStore() {
		let that = this;
		//待处理件数
		let data = {
			accessToken 	: this.accessToken,
			mobileUserName 	: this.mobileUserName,
			cooperateCode  	: this.cooperateCode
		}
		JSON.stringify(data);
		coo.tipNumber(data,coo.LoginUrl+'pcpmobile/queryTotalCount.action',that)
		
    
	},

	//状态管理
    mountedSign() {
      try {
        if (
          this.$store.state.sign.dataListSign.length > 0 &&
          this.$store.state.toPieces.flagTopieces
        ) {	
		  this.proCopyright = this.$store.state.sign.dataListSign; //使用缓存
		  this.pageNo = this.totalpage;
          this.signStore(); //提示数字
        } else {
		 this.refreshFlag = 1;
          this.upLoadMore(); //初始换查询
        }
      } catch (error) {
        console.error(error);
	  }	
      this.$store.dispatch("flagSignCommitActions", 1);
	},
	//状态管理
    beforeDestroySign() {
      // console.log(this.proCopyright);
      try {
        this.$store.dispatch("dataListSignActions", this.proCopyright);
        this.$store.dispatch("flagSignCommitActions", this.flagSign);
        this.$store.dispatch("flagTopiecesActions", 1);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style scoped >
.checkbox-botton {
	position: fixed;
	bottom: 50px;
	width: 100%;
	padding: 0 15px;
	height: 40px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items:  center;
	background-color: #efefef;
	font-size: 14px;
}
.checkbox-botton  span:nth-of-type(1){
	height: 100%;
	line-height: 40px;
}
.checkbox-botton  span:nth-of-type(2){
	padding: 2px 10px;
	border: 1px solid red;
	font-size: 14px;
	border-radius: 5px;
	background-color: #fff;

}
.checkbox-botton  span:nth-of-type(3){

}
.checkbox-botton-action {
	background-color: #387ef5; 
}
.fall-scoll {
	margin-top: 40px;
	margin-bottom: 90px;
	overflow: auto;
}
</style>

