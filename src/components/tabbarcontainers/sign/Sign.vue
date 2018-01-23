<template>
<div  class="fall-scoll" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">


   <mt-loadmore :top-method="loadTop"  :auto-fill = "false" ref="loadmore"  v-infinite-scroll="loadMoreMore"
  infinite-scroll-disabled="loading">
    <ul class="wrap">
      <li  class = "info-sign"  v-for="(item,index) in proCopyright" :key="item.id" >
          <!-- 这样添加水印图片 不然webpack 打包会报错找不到图片路径 -->
          <img  v-if="item.status === '7'"    src='../../../img/imgQian@2x.png' alt="">
          <img  v-else   src='../../../img/imgWatie@2x.png' alt="">
           <ul>
                  <li><span>运单号  </span><span >  :{{item.wayBillNo}}    </span></li>
                  <li><span class="iconfont" v-cloak>&#xe610; :&nbsp; {{item.recipients}}   </span></li>
                  <li><span class="iconfont" v-cloak>&#xe632; : <a :href="'tel:' +item.recipientsPhone">{{item.recipientsPhone}}</a> </span></li>
                   <!-- <li><span class="iconfont"> &#xe632;</span><span v-cloak> : &nbsp;{{item.recipientsPhone}}</span></li> -->
                  <li><span class="iconfont" v-cloak>&#xe61c; : &nbsp;到件操作  &nbsp; {{item.arriveTime | formatDate}}   </span></li>
                  <li><span class="iconfont" v-cloak >&#xe606; : &nbsp;签收操作  &nbsp; {{item.signforTime | formatDate}}  </span></li>
                  <li><span  class="iconfont" v-cloak>&#xe620; : &nbsp;{{item.receiveAddress}}  </span></li>
                  <li v-if="item.status == 3"  class = "sign-detention">  
                       <mt-button   @click.native="openConfirm('是否进行签收操作?','700',item.id,item.wayBillNo,index)" size="large">
                        
                                <span>签收</span>
                         
                       </mt-button>
                        <mt-button @click.native="openConfirm('是否进行滞留操作?','900',item.id,item.wayBillNo,index)" size="large">
                                <span>滞留件</span>
                          </mt-button>

 
                            
                  </li>
                  

              </ul>
          </li>
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

import { Toast } from "mint-ui";



export default {
  data() {
    return {
      countOperation: 0, //下标数字初始值,
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
      totalpage: 1 //计算出来应有的 刷新次数
    };
  },

  mounted() {
    this.mountedSign();
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top; //组件更新动态计算页面scroll 数据
  },
  beforeDestroy() {
    this.beforeDestroySign();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
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
				this.$store.commit("detentionNumberCommit", this.$store.state.tips.detentionNumber+1);

                this.openToast("已滞留");
                this.proCopyright.splice($index, 1);
              }
              this.flagSign = 0;
              //-------------------------------状态管理天至此处-------------------------------------
              this.countOperation = this.countOperation - 1;
              this.$store.commit("signNumberCommit", this.countOperation);
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
    loadMoreMore: function() {
      // console.log("出发了scroll");
      // this.loading =true;
      if (this.totalpage == 1) {
        this.pageNo = 1;
      } else {
        //   console.log("more方法查询的")
        this.pageNo = parseInt(this.pageNo) + 1;
        this.start = this.start + 20;
        this.upLoadMore();
        this.signStore();
      }
    },
    loadTop: function() {
      this.pageNo = 1;
      this.start = 0;
      this.loadPageList();
      this.signStore();
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 300);
    },
    loadPageList: function() {
      // console.log("初始化查询");
      let data = {
        limit: this.limit,
        start: this.start,
        accessToken: this.accessToken,
        cooperateCode: this.cooperateCode,
        mobileUserName: this.mobileUserName,
        roleAuth: this.roleAuth
      };
      data = JSON.stringify(data);
      // 查询数据
      coo
        .sign(data, coo.LoginUrl + "pcpmobile/querySignWayBillInfo.action")
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            this.proCopyright = res.data.wayBillInfoList;
            this.totalpage = Math.ceil(res.data.totalCount / this.limit); //计算出需要刷新的次数
            this.signStore();
          }
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.header);
          } else {
            console.log("Error", error.message);
          }
          console.log("Error", error.message);
        });
    },
    upLoadMore: function() {
      //封装刷新加载函数
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
            this.proCopyright = this.proCopyright.concat(
              res.data.wayBillInfoList
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //状态管理
    signStore() {
      this.countOperation = 0;
      this.proCopyright.forEach((item, index, arr) => {
        if (item.status == 3) {
          this.countOperation++;
        }
        this.$store.commit("signNumberCommit", this.countOperation);
      });
    },
    mountedSign() {
      try {
        if (
          this.$store.state.sign.dataListSign.length > 2 &&
          this.$store.state.toPieces.flagTopieces
        ) {
          this.proCopyright = this.$store.state.sign.dataListSign; //使用缓存
          this.signStore(); //提示数字
        } else {
          this.loadPageList(); //初始换查询
          this.signStore();
        }
      } catch (error) {
        console.error(error);
      }
      this.$store.dispatch("flagSignCommitActions", 1);
    },
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
  width: 4.5em;
  position: absolute;
  right: 1em;
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
</style>

