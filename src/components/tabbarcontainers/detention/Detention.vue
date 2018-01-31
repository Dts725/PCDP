<template>
<div class="fall-scoll"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }">


   <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill = "false" ref="loadmore"   infinite-scroll-distance = "100" v-infinite-scroll="loadMoreMore"
  infinite-scroll-disabled="loading" infinite-scroll-immediate-check = "true">
    <ul class="wrap">
      <li  class = "info-sign"  v-for="(item,index) in proCopyright" :key="item.id" >
          <img   v-if="item.status ===  '9'" src= '../../../img/imgZhiliu@2x.png' alt="">
          <img   v-else-if="item.status ===  '11'" src = '../../../img/imgTui@2x.png' alt="">
          <img   v-else   src = '../../../img/imgQian@2x.png' alt="">
          <!-- <img :src="isImg(item.status)" alt=""> -->
           <ul v-cloak>
                  <li><span>运单号  </span><span >  :{{item.wayBillNo}}    </span></li>
                  <li><span class="iconfont" v-cloak>&#xe610; :&nbsp; {{item.recipients}}   </span></li>
                  <li><span class="iconfont" v-cloak>&#xe632; : <a :href="'tel:' +item.recipientsPhone">{{item.recipientsPhone}}</a> </span></li>
                   <!-- <li><span class="iconfont"> &#xe632;</span><span v-cloak> : &nbsp;{{item.recipientsPhone}}</span></li> -->
                  <li><span class="iconfont" v-cloak>&#xe61c; : &nbsp;滞留操作  &nbsp; {{item.arriveTime | formatDate}}   </span></li>
                  <li><span class="iconfont" v-cloak >&#xe606; : &nbsp;取回操作  &nbsp; {{item.signforTime | formatDate}}  </span></li>
                  <li><span  class="iconfont" v-cloak>&#xe620; : &nbsp;{{item.receiveAddress}}  </span></li>
                  <li v-show="item.status == 9" class = "sign-detention"  @click="getSignInfo(index,item.id,item.wayBillNo)">  
                       <mt-button @click.native="openConfirm('是否进行签收操作?','1001')" size="large">
                            
                                <span>退件</span>
                         
                       </mt-button>
                        <mt-button @click.native="openConfirm('是否进行滞留操作?','910')" size="large">
                                <span>签收</span>
                          </mt-button>

 
                            
                  </li> 
              </ul>
          </li>
		  <li v-show="totalpage === pageNo" @click="topRefresh"  v-cloak class="refresh-bottom">到底啦 点击更新数据 !</li>
    </ul>
  </mt-loadmore>
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
  data() {
    return {
      countOperation	: 0, //状态码初始值
      $index			: 0, //获取当前项的index
      $id				: "",
      $wayBillNo		: 0, //获取当前项的id
      // signStatus : true,              //判断是否签收

      loading			: false, //默认false 滑动加载

      wrapperHeight		: 0, //页面scroll 数据
      start				: 0, //数据加载开始的位置
      limit				: 20, // 每页允许的加载数据条数
      accessToken		: coo.getCache("accessToken"),
      cooperateCode		: coo.getCache("cooperateCode"),
      mobileUserName	: coo.getCache("mobileUserName"),
      roleAuth			: coo.getCache("roleAuth"),
      pageNo			: 1, //加载的页数  判断刷新次数 pangeNo ++
      proCopyright		: [], //用来存储后台接受的数据
      allLoaded			: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode		: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
	  totalpage			: 0 ,//计算出来应有的 刷新次数
	  refreshFlag		: 0 ,//默认事发后首次刷新 默认为0 不是首次刷新
	//   isBottom 			: 0 //标记是否点击底部刷新 默认0 不是底部点击刷新
     };
  },

  mounted() {
	// coo.routerViewHeight('.fall-scoll');
    this.mountedDetention();
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top; //组件更新动态计算页面scroll 数据
  },
  beforeDestroy() {
    this.beforeDestroyDetntion(); 
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
	topRefresh : function () {
	  this.proCopyright =[];
	//   this.isBottom=1;
	//   this.refreshFlag =1; //此处防止用户错误操作
	//底部刷新返回到底部刷新事件
      this.pageNo =1;
	  this.totalpage =0;
      this.start = 0;
	  this.upLoadMore();	
	},
    //获取当前索引值
    getSignInfo: function($index, $id, $wayBillNo) {
      this.$index = $index;
      this.$id = $id;
      this.$wayBillNo = $wayBillNo;
    },
    openToast(msg) {
      Toast({
        message: msg,
        duration: 900,
        className: "open-tosat"
      });
    },
    openConfirm(msg, statusCode) {
      //提示信息
      MessageBox.confirm(msg).then(action => {
        let data = {
          accessToken: this.accessToken,
          cooperateCode: this.cooperateCode,
          mobileUserName: this.mobileUserName,
          operationRequest: {
            operationId: this.$id,
            operationStatus: statusCode,
            operationWayBillNo: this.$wayBillNo
          }
        };
        data = JSON.stringify(data);
        let signUrl = "";
        if (statusCode === "910") {
          signUrl = "pcpmobile/retentionSignWayBill.action"; //滞留签收操作接口
        } else {
          signUrl = "pcpmobile/fetchBackWayBill.action"; //快递员取回操作接口
        }
        //调用签收接口
        coo
          .sign(data, coo.LoginUrl + signUrl)
          .then(res => {
            if (res.status == 200 && res.data.success == true) {
              if (statusCode === "910") {
                this.proCopyright[this.$index].status = "7";
                this.openToast("已签收");
              } else {
                this.proCopyright[this.$index].status = "11";
                this.openToast("已退件");
              }
            }
            this.countOperation--;
            this.$store.commit("detentionNumberCommit", this.countOperation);
          })
          .catch(err => {
            if (statusCode === "910") {
              this.openToast("签收失败 请重试!");
            } else {
              this.openToast("退件失败 请重试!");
            }
            console.log(err);
          });
      });
    },

    loadMoreMore: function() {
      //滚动加载
    //   console.log("出发了scroll");
		this.refreshFlag = 0;
      // this.loading =true;
      if (this.totalpage == 1) {
        this.pageNo = 1;
        this.allLoaded = true;
      } else if (this.pageNo >=	 this.totalpage) {
		this.allLoaded = true;
      } else { 
        this.pageNo = this.pageNo + 1;
        this.start = this.start + 20;	
        this.upLoadMore();
	  }
		
	  
    },
    //下拉刷新执行
    loadTop: function() {
	  this.refreshFlag =  1;
      this.pageNo = 1;
      // console.log("下拉刷新执行了");
      this.start = 0;
      this.upLoadMore();
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
	  }, 300);

	  
    },
    upLoadMore: function() {
		
		Indicator.open({
  			text: '加载中...',
 		 	spinnerType: 'fading-circle'
		});
      //封装刷新滞留数据加载函数
      let data = {
        limit: this.limit,
        start: this.start,
        accessToken: this.accessToken,
        cooperateCode: this.cooperateCode,
        mobileUserName: this.mobileUserName,
        roleAuth: this.roleAuth
      };
      JSON.stringify(data);

      // console.log(this.pageNo);
      //  console.log( this.totalpage );
      coo
        .sign(data, coo.LoginUrl + "pcpmobile/queryRetentionWayBillInfo.action")
        .then(res => {
			
          if (res.status == "200" && res.data.success == true) {	  
			  if (this.refreshFlag) {
				  this.totalpage = Math.ceil(res.data.totalCount / this.limit); //计算出需要刷新的次数				  
				  	this.proCopyright = res.data.wayBillInfoList;
			  } else {
					this.totalpage = Math.ceil(res.data.totalCount / this.limit); //计算出需要刷新的次数
            		this.proCopyright = this.proCopyright.concat(res.data.wayBillInfoList);

			  }
				this.detentionStore();  	
			  
				Indicator.close();
            // console.log(this.totalpage);
            // console.log(this.pageNo);
            // console.log(this.proCopyright);
          }
        })
        .catch(err => {
          // console.log("进来error  了");

          console.log(err);
        });
    },

    // 状态管理
    detentionStore() {
      this.countOperation = 0;
      this.proCopyright.forEach((item, index, arr) => {
        if (item.status == 9) {
          this.countOperation++;
        }

        this.$store.commit("detentionNumberCommit", this.countOperation);
      });
    },
    mountedDetention() {
		//页面数据是否走缓存
      try {  
        if (
          this.$store.state.detention.dataDetentionList.length > 0 &&
          this.$store.state.sign.flagSign
        ) {	
		  this.proCopyright = this.$store.state.detention.dataDetentionList;
		  this.pageNo = this.totalpage;
          this.detentionStore();
        } else {
		  this.refreshFlag = 1; //此处标记为首次刷新
          this.upLoadMore();
        }
      } catch (error) {
        console.error(error);
      }
    },
    beforeDestroyDetntion() {
      try {
        this.$store.dispatch("dataDetentionListActions", this.proCopyright);
        this.$store.dispatch("flagSignCommitActions", 1);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style scoped>
.fall-scoll {
	margin-top: 40px;
	overflow: auto;
}
.info-sign {
  position: relative;
  letter-spacing: 0.1px;
  /* display: flex; */
  font-size: 80%;
  /* width: 90%; */
  padding: 30px 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-bottom: 5px;
  color: #444;
  box-sizing: border-box;
  padding: 5px 15px;
}
.info-sign > img {

  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.info-sign ul > li {
  line-height: 2em;
}
.info-sign ul > li span {
  font-size: 90%;
  /* display: block; */
}
.info-sign ul > li:nth-of-type(1) ~ li > span {
  position: relative;
  left: 0;
  top: 0;
}
.info-sign ul > li:nth-of-type(1) {
  height: 3em;
  line-height: 2.5em;
}
.info-sign ul > li:nth-of-type(2) {
  height: 2em;
  line-height: 2em;
}
.info ul > li:nth-of-type(3) {
  height: 2em;
  line-height: 2em;
}
.info-sign ul > li:nth-of-type(1) span:nth-of-type(2) {
  font-weight: 700;
}
.info-sign ul > li:nth-of-type(2) {
  word-break: break-all;
  height: auto;
  /* color: red; */
}
.info-sign ul > li:nth-of-type(6) {
  word-break: break-all;
  height: auto;
}
ul {
  list-style: none;
}
.sign-detention {
  /* position: absolute; */
  /* z-index: 100; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  flex: 1 1 0;
  /* float: left;
     width: 40%; */
  /* text-align: center; */
  background-color: #fff;
}

.mint-button--default {
  margin-top: 1em;
  background-color: #387ef5;
  width: 45%;
  font-size: 95%;
  height: 2.2em;
  border-radius: 3px;
  text-align: center;
  color: #fff;
}
.wrap {
  margin-bottom: 49px;
}
.mint-button::after {
  background-color: #dcdeef;
  content: " ";
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
.mint-msgbox {
  width: 75%;
  font-size: 80%;
}
.mint-msgbox-message {
  color: #646161;
  margin: 0;
  text-align: center;
  line-height: 36px;
}

.className {
  height: 100%;
  width: 100%;
}
.open-tosat {
  font-size: 100%;
}
.mint-button--large {
  text-indent: 0px;
}
.refresh-bottom{
	height: 50px;
	font-size: 14px;
	text-align: center;
	color:  rgb(182, 171, 171);
	line-height: 50px;
	border-top: 10px;
	
}
</style>

