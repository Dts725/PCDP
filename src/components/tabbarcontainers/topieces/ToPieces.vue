<template>
 
  <div class="top-pieces">

	<div class="warp-topieces">
   	 	<div>
        <mt-search v-model.trim="value" cancel-text="取消" placeholder="请输入运单号">
        </mt-search>
          <div id="scan-topieces" @click="scanTopeieces"></div>
    	</div >
    	<div class="query">
        <mt-button  class="query-button"  @click="openToast()" :disabled="isDisabled" size="large">查询运单</mt-button>
    	</div>
</div>
    <div class="data-list-warp">
        <ul class="data-list">
             <li v-for ="(item,index) in dataList" :key="item.topiexesId">
                    <span>运单号 : {{item.wayBillNo}} &nbsp;&nbsp;&nbsp;签收人 : {{item.recipients}}</span>
                    <span @click="toPieces(item.id,item.wayBillNo,index)">到件</span> 	
            </li> 
        </ul>
    </div>
    
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import coo from "../../../config.js";
import { MessageBox } from "mint-ui";
import axios from "axios";
import { Search } from "mint-ui";
// import  '../../../store.js';
export default {
  data() {
    return {
		isDisabled : false,// 默认是可以点击的
      flagTopieces: 1,
      value: "",
      dataList: [],
      dataPiecesValueList: [],
      accessToken: coo.getCache("accessToken"),
      cooperateCode: coo.getCache("cooperateCode"),
      mobileUserName: coo.getCache("mobileUserName"),
      roleAuth: coo.getCache("roleAuth")
    };
  },
  mounted  () {
    this.createdToPieces();
  },
  beforeDestroy () {
    this.beforeDestroyTopieces();
  },

  methods: {
	  //调用原生扫描valueTmp
    scanTopeieces: function() {
      let that = this;
      window.NativeConn.NativeScanBar(function(datas) {
		 
        scanWaybillNumberFn(datas);
      });
      let scanWaybillNumberFn = function(datas) {
		  console.log(datas)
        //  console.log(datas);
        let valueTmp = that.dataPiecesValueList.indexOf(datas);
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
          searchWayBillNo: parseInt(datas),
          accessToken: that.accessToken,
          cooperateCode: that.cooperateCode,
          mobileUserName: that.mobileUserName,
          roleAuth: that.roleAuth
        };
        data = JSON.stringify(data);
        coo
          .sign(data, coo.LoginUrl + "pcpmobile/searchWayBill.action")
          .then(res => {
            if (res.status == 200) {
              if (res.data.success == true) {
				let tmp = res.data.wayBillInfo;
				console.log(tmp);
				
                that.dataList.push(tmp);
				//缓存去重的数组
				console.log(that.dataList);
				
				that.dataPiecesValueList.unshift(res.data.searchWayBillNo);
				console.log(that.dataPiecesValueList);
				
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
	  //跳转空白页
	//   this.$router.push('/Opacity')
    },

    toPieces(itemId, wayBillNo, $index) {
      MessageBox.confirm("确定执行到件操作?").then(action => {
        //到件请求函数
        let data = {
          accessToken: this.accessToken,
          cooperateCode: this.cooperateCode,
          mobileUserName: this.mobileUserName,
          roleAuth: this.roleAuth,
          operationRequest: {
            operationId: itemId,
            operationStatus: "300",
            operationWayBillNo: wayBillNo
          }
        };
        data = JSON.stringify(data);
        coo
          .sign(data, coo.LoginUrl + "pcpmobile/arriveWayBill.action")
          .then(res => {
            if (res.status == 200 && res.data.success == true) {
              this.dataList.splice($index, 1);
              //删除对应的缓存数组元素
              this.dataPiecesValueList.splice($index, 1);
              this.flagTopieces = 0;
			  this.$store.commit("signNumberCommit", this.$store.state.tips.signNumber+1);
              Toast({
                message: "操作成功",
                iconClass: "icon icon-success",
                position: "middle",
                duration: 500
              });
            }
          })
          .catch(err => {
            Toast({
              message: "到件操作失败,请重试 !",
              position: "middle",
              duration: 1200
            });
            this.value = null;
            console.log(err);
          });
	  });
	//   this.$router.push('/Opacity')
	  
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
      let valueTmp = this.dataPiecesValueList.indexOf(this.value);
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
       this.isDisabled = true;
      let data = {
        searchWayBillNo: parseInt(this.value),
        accessToken: this.accessToken,
        cooperateCode: this.cooperateCode,
        mobileUserName: this.mobileUserName,
        roleAuth: this.roleAuth
      };
      data = JSON.stringify(data);
      coo
        .sign(data, coo.LoginUrl + "pcpmobile/searchWayBill.action")
        .then(res => {
          if (res.status == 200) {
            if (res.data.success == true) {
				// console.log(res.data);
              this.dataList.unshift(res.data.wayBillInfo);
              //缓存去重的数组
              this.dataPiecesValueList.unshift(res.data.searchWayBillNo);
              this.value = null;
				this.isDisabled = false;
            } else {
				this.value = null;
              Toast({
				  message: res.data.message,
                position: "middle",
                duration: 1000
              });
		     this.isDisabled = false;
            }
          }
        })
        .catch(err => {
		this.isDisabled = false;
			
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
    createdToPieces() {
		let that = this;
		//待处理件数
		let data = {
			accessToken 	: this.accessToken,
			mobileUserName 	: this.mobileUserName,
			cooperateCode  	: this.cooperateCode
		}
		JSON.stringify(data);
		coo.tipNumber(data,coo.LoginUrl+'pcpmobile/queryTotalCount.action',that)
	
		
		//页面是否走缓存
      if (this.$store.state.toPieces.dataListToPieces) {
        this.dataList = this.$store.state.toPieces.dataListToPieces;
      }
      if (this.$store.state.toPieces.dataPiecesValueList) {
        this.dataPiecesValueList = this.$store.state.toPieces.dataPiecesValueList;
      }
      this.$store.dispatch("flagTopiecesActions", 1);
    },
    beforeDestroyTopieces() {
      try {
        this.$store.dispatch("dataListToPiecesActions", this.dataList); //页面展示数据
        this.$store.dispatch(
          "dataPiecesValueListActions",
          this.dataPiecesValueList
        ); //运单信息
        this.$store.dispatch("flagTopiecesActions", this.flagTopieces); //页面刷新
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
input[type="search"] {
  margin-bottom: 0;
  font-size: 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 34px;
  text-align: center;
  border: 0;
  border-radius: 6px;
  background-color: rgba(130, 201, 0, 0);
}
.mint-search {
  height: 100%;
  height: 100%;
  overflow: hidden;
}
.query {
  margin: 0 auto;
  margin-top: 15px;
  width: 80%;
}
.mint-searchbar-inner {
  height: 36px;
  /* background-color: red; */
}

.query-button.mint-button--default {
  font-weight: 700;
  margin: 0 auto;
  margin-top: 1em;
  background-color: #d9d9d912;
  width: 80%;
  font-size: 95%;
  height: 2.2em;
  border-radius: 3px;
  text-align: center;
  color: #8c7d76;
  box-shadow: 0px 0px 2px 1px #898d9242;
}
.mint-button::after {
  background-color: #f6f0f0;
  content: " ";
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
button:enabled:active {
  color: #4a4747;
  background-color: #bfbfbf21;
}
ul {
  list-style: none;
}
.warp-topieces {
	 position: fixed;
	top: 40px;
	left: 0;
	width: 100%; 
	z-index: 555;
	/* margin-top: 140px; */
	height: 140px;
	background-color: #fff;

}
.data-list {
	/* overflow: auto; */
-webkit-overflow-scrolling: touch;
  margin-top: 10px;
}
.data-list li {
	letter-spacing: 0;
	/* border-radius: 5px; */
	font-size: 14px;
	height: 51px;
	box-sizing: border-box;
	padding: 10px 5px;
	border: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
}
.data-list li >span:nth-of-type(2) {
	padding: 1px 10px;
	font-size: 12px;
	border: 1px solid #26a2ff;
	text-align: center;
	flex: none;
}
.data-list li > span:nth-of-type(1) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.mint-search-list {
  overflow: auto;
  padding-top: 0;
}
.mint-msgbox {
  width: 75%;
  font-size: 90%;
}
#scan-topieces {
  /* background: red; */
  width: 36px;
  height: 36px;
  position: absolute;
  margin: -44px 0px 0px 13px;
  /* transform: translate(13px,-44px); */
  z-index: 2;
}
.top-pieces {
	overflow: hidden;
	margin-top: 40px;
}
.mintui-search:before{
	line-height: 31px;
}
.data-list-warp {
	margin-top: 140px;
	margin-bottom: 50px;
	overflow: hidden;
}
</style>
