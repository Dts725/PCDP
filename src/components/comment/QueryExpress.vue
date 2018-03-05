<template>
 
  <div class="top-query">
	  	<div class="fill"></div>
	  <div class="header">
		  <mt-header title="德邦快递代收-状态查询">
		<span slot="left" class="exit" @click="exit">
		<svg class="icon" style="width: 20px; height: 20px; margin-top : 0px; vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3588"><path d="M704.3 129.9v78.7c78 64.5 127.7 161.8 127.7 270.7 0 193.6-157.5 351.2-351.2 351.2S129.7 672.9 129.7 479.3c0-108.8 49.8-206.2 127.7-270.7v-78.7C142.3 203.7 65.9 332.4 65.9 479.3c0 229.2 185.8 415 415 415s415-185.8 415-415c0-146.9-76.5-275.6-191.6-349.4zM448.9 64.3h63.8v446.9h-63.8z" p-id="3589"></path></svg>
		退出
		</span>
    
    </mt-header>
	  </div>
    <div  class="input-search">
		  <span class="iconfont" @click="scanQuery">&#xe600;</span>
		  <span><input placeholder="请输入运单号" v-model.trim="value" autofocus type="number"></span>
    </div >
    <div class="query-express">
        <mt-button  class="query-button"  @click="openToast()" size="large">查询运单</mt-button>
    </div>

    <div class="details-list-query">
        <ul class="data-list-query" >
			<li v-for = "item in dataList" :key="item.index">
				 <ul >
                    <li v-cloak>运单号&nbsp;&nbsp;&nbsp;	  : {{item.wayBillNo}}</li>
                    <li v-cloak v-if="item.status === '3'">运单状态	 : 到件</li>
                    <li v-cloak v-else-if="item.status === '7'">运单状态	 : 签收</li>
                    <li v-cloak v-else-if="item.status === '9'">运单状态	 : 滞留</li>
                    <li v-cloak v-else-if="item.status === '0'">运单状态	 : 待到件</li>
                    <li v-cloak v-else-if="item.status === '11'">运单状态	 : 退件</li>
                    <li v-cloak v-else>运单状态	 : 滞留签收</li>
                    <li v-cloak>到件时间 	 : <span :class="{color : item.status === '3' }">{{item.arriveTime  | formatDate}} </span></li>
                    <li v-if ="item.status === '7'" v-cloak>签收时间 	 : <span :class="{color : item.status === '7'}">{{item.signforTime | formatDate}} </span></li>
                    <li v-if="item.status === '10'" v-cloak>滞留时间 	 : <span :class="{color : item.status === '9'}">{{item.retentionTime  | formatDate}} </span></li>
                    <li v-if="item.status === '10'" v-cloak>滞留签收 	 : <span :class="{color : item.status === '10'}">{{item.retentionSignTime  | formatDate}} </span></li>
                    <li v-if="item.status === '11'" v-cloak>滞留退件 	 : <span :class="{color : item.status === '11'}">{{item.fetchBackTime  | formatDate}} </span></li>
                    <li v-cloak>收件人&nbsp;&nbsp;&nbsp; 	  : {{item.recipients}}</li>
                    <li v-cloak>联系方式 	 : <a  :href="'tel:' + item.recipientsPhone"> {{item.recipientsPhone}} </a></li>
                    <li v-cloak>合作点&nbsp;&nbsp;&nbsp; 	  : {{item.cooperateAddress}}</li>
                </ul>

			</li>
        </ul>
    </div>
    
  </div>
</template>

<script>
import { Header } from 'mint-ui';
import { Toast } from "mint-ui";
import coo from "../../config.js";
import { MessageBox } from "mint-ui";
import axios from "axios";
import { Search } from "mint-ui";
import { formatDate } from "../../date.js";
// import  '../../../store.js';
export default {
  data() {
    return {
      value: "",
      dataList: [],
      dataValueListQuery: [],
      accessToken: coo.getCache("accessToken"),
      cooperateCode: coo.getCache("cooperateCode"),
      mobileUserName: coo.getCache("mobileUserName"),
      roleAuth: coo.getCache("roleAuth")
    };
  },

filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
	},
  },
  methods: {
	exit () {
	MessageBox.confirm('确定执行此操作?').then(action => {
		this.$router.push("./")
    });
	},
	//扫描查询
    scanQuery: function() {
      let that = this;
      window.NativeConn.NativeScanBar(function(datas) {
        scanWaybillNumberFn(datas);
      });
      let scanWaybillNumberFn = function(datas) {
        //  console.log(datas);
        let valueTmp = that.dataValueListQuery.indexOf(datas);
        //禁止重复查询订单-----------------------------------------------------------------------------------------------------
        if (valueTmp != -1) {
          Toast({
            message: "请勿重复输入该订单!",
            position: "middle",
            duration: 1000
          });
          that.value = null;
          return;
        }
        let data = {
		accessToken: that.accessToken,
        mobileUserName: that.mobileUserName,
        roleAuth: that.roleAuth,
        searchWayBillNo: parseInt(datas)
        };
        data = JSON.stringify(data);
        coo
          .sign(data, coo.LoginUrl + "pcpmobile/queryWayBillStatusInfo.action")
          .then(res => {
            if (res.status == 200) {
              if (res.data.success == true) {
                that.dataList.unshift(res.data.wayBillInfo);
                //缓存去重的数组
                that.dataValueListQuery.unshift(res.data.searchWayBillNo);
                that.value = null;
              } else {
                Toast({
                  message: res.data.message,
                  position: "middle",
                  duration: 1000
                });
                that.value = null;
              }
            }
          })
          .catch(err => {
            Toast({
              message: "查询运单信息失败请重试 !",
              position: "middle",
              duration: 1200
            });
            that.value = null;
            console.log(err);
          });
      };
    },
    openToast() {
      if (this.value == "") {
        Toast({
          message: "请输入运单号查询!",
          position: "middle",
          duration: 1000
        });
        return;
      }
      let valueTmp = this.dataValueListQuery.indexOf(this.value);
      //禁止重复查询订单
      if (valueTmp != -1) {
        Toast({
          message: "请勿重复输入该订单!",
          position: "middle",
          duration: 1000
        });
        this.value = null;
        return;
      }

      //发送查询请求

      let data = {
		accessToken: this.accessToken,
        mobileUserName: this.mobileUserName,
        roleAuth: this.roleAuth,
        searchWayBillNo: this.value
      };
      data = JSON.stringify(data);
      coo
        .sign(data, coo.LoginUrl + "pcpmobile/queryWayBillStatusInfo.action")
        .then(res => {
          if (res.status == 200) {
            if (res.data.success == true) {
              // console.log(res.data);
              this.dataList.unshift(res.data.wayBillInfo);
              //缓存去重的数组
              this.dataValueListQuery.unshift(res.data.searchWayBillNo);
              this.value = null;
            } else {
              this.value = null;
              Toast({
                message: res.data.message,
                position: "middle",
                duration: 1000
              });
            }
          }
        })
        .catch(err => {
          Toast({
            message: "查询运单信息失败请重试 !",
            position: "middle",
            duration: 1200
          });
          this.value = null;
          console.log(err);
        });
    },
    //creatd 中的函数
  }
};
</script>

<style scoped>
.top-query{
	color: #444;
	overflow: hidden;
}
.input-search{
	position: fixed;
	left: 0;
	top: 40px;
	width: 100%;
	z-index: 999;

}
.input-search span:nth-of-type(1){
	color: #a9a9a9;
	position: absolute;
	top	:15px;
	left: 15px;
	font-size: 30px;


}
.input-search input{
	outline: none;
	box-sizing: border-box;
	height: 50px;
	border-radius: 0;
	font-size: 14px;
	text-align: cente;
	text-indent: 60px;
	padding: 0;
	border: 8px;
	border-style: solid;
	border-color: #d9d9d9;
}
.header {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}

.query-express{

	position: fixed;
	top: 120px;
	left: 5%;
	width: 90%;
	

	z-index: 999;
	
}
ul {
  list-style: none;
}
.details-list-query li > ul {
padding: 5px 15px;
margin: 0 auto;
font-size: 14px;
letter-spacing: 1px;
border-top: 1px solid #ddd; 
border-bottom: 1px solid #ddd; 
margin-bottom: 5px;

}
.details-list-query{
	overflow: hidden;
	margin-top: 170px;
}
.color{
	color: #26a2ff;
}
.fill {
	position: fixed;
	top: 0;
	left: 0;
	background-color: #fff;
	z-index: 666;
	height: 170px;
	width: 100%;
	box-shadow: 0px 1px 5px 0.1px #ddd;
}
.exit{
	display: block;
	width: 100%;
	height: 40px;

	line-height: 40px;
}
.mint-msgbox {
 width: 75%;
 font-size: 14px;
}
</style>
