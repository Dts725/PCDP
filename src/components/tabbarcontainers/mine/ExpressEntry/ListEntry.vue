<template slot-scope>
<div class="details-entry">
	 <mt-header id="title-count" title="零担线索">
            <router-link to="/ExpressEntry/detailsEntry" class="iconfont" slot="left"> 
                &#xe6ba; 返回
          	</router-link>
        </mt-header>
		<div class="warp-entry-list">
			<ul>
				<li v-cloak><span>姓名</span><input type="text" v-model="partnerName" placeholder="请输入姓名" autofocus></li>
				<li v-cloak><span>联系电话</span><input type="number" pattern=[/^[0-9]{10}$/] v-model="phoneNumber" placeholder="请输入联系电话" ></li>
				<li v-cloak><span>货物信息</span> <input type="text" v-model="goodsInformation" placeholder="请输入货物信息" ></li>
				<li v-cloak><span>发货地址</span> <input  readonly = "value" type="text" @click="isShow" v-model="selectStr" placeholder="省/市/区" ></li>
				<li v-cloak><textarea cols="20"	rows="6" placeholder="请将输入字数限制在150字之内" v-model="detailsInfo" maxlength="150"> 
			</textarea></li>
			</ul>
		</div>
	<vue-pickers :show="show3"
    :selectData="pickData3"
    v-on:cancel="close"
    v-on:confirm="confirmFn" style="color : green"></vue-pickers>
	<div class="details-bottom" @click="commit">
		<span>提交</span>
	</div>


</div>
</template>
<script scoped>
import { Loadmore } from "mint-ui";
import { wrapper } from "mint-ui";
import { formatDate } from "../../../../date.js";
import axios from "axios";
import coo from "../../../../config.js";
import { MessageBox } from "mint-ui"; //confirm
import { Toast } from "mint-ui";
import VuePickers from 'vue-pickers';
import {provs_data, citys_data, dists_data} from 'vue-pickers/lib/areaData';

export default {
		components: {
  				VuePickers
		},
		data () {
			return {
				pickData3: {
  						columns	: 3,
  						link	: true,
  						pData1	: provs_data,
  						pData2	: citys_data,
  						pData3	: dists_data,
						},				//引用插件的数据格式
				selectStr   		: "",
				show3 				: false,
				partnerName 		: "",
				phoneNumber 		: "",
				goodsInformation 	: "",
				detailsInfo 		: "",
				accessToken			: coo.getCache("accessToken"),
      			cooperateCode		: coo.getCache("cooperateCode"),
				mobileUserName		: coo.getCache("mobileUserName"),
				roleAuth			: coo.getCache("roleAuth"),
				phoneFlag  			: false //标识电话状态的
			}
		},
		watch : {
			phoneNumber (phoneNumber) {
				//手机号校验
				this.phoneFlag = false;
				let  pattern = /^[1][0-9]{10}$/;
				// let oldPhoneNumber = phoneNumber;
				if(phoneNumber.length >= 11){
					if (pattern.test(phoneNumber)) {
						this.phoneFlag = true;
					} else {
					 	Toast({
        					message: '请输入正确的手机号',
        					duration: 1200,
					  	});
						this.phoneNumber = phoneNumber.substring(0,11);
				}
				}
			},
			partnerName (partnerName) {
				if(partnerName.length>80) {
					this.partnerName = partnerName.substring(0,80);
					console.log(partnerName);
			
					Toast({
						message:  '你输入的用户名过长请重新输入',
        					duration: 1200,
						  });
						
				} 
			},
			goodsInformation (goodsInformation) {
					if(goodsInformation.length>80) {
					this.goodsInformation = goodsInformation.substring(0,80);
					console.log(goodsInformation);
			
					Toast({
						message:  '你输入的信息过长请重新输入',
        					duration: 1200,
						  });
						
				}
			}
		},
		methods : {

		isShow () {
			//picker显示
			if(this.show3) {
				this.show3 = false;
			} else {
				this.show3 = true;
			}
		},
		show () {
				this.show3 = true;
		},
		close() {
			//picker关闭
				this.show3 = false;
		},
		confirmFn(data) {
			//来自picker 插件
			
				this.selectStr = data.select1.text
				if (data.select2) {
					this.selectStr +=  '-' + data.select2.text
				}
        		if (data.select3) {
					this.selectStr += '-' + data.select3.text
        		}
        		this.close()
      		},
		commit () {
			//提交数据
			if (!this.partnerName || !this.phoneNumber || !this.goodsInformation || !this.detailsInfo) {
				Toast({
        					message: '有选项为空请检查输入',
        					duration: 1200,
        					className: "open-tosat"
						  });
					return ;		  
			} else {
				if (!this.phoneFlag) {
					Toast({
        					message: '手机号输入错误请重新输入',
        					duration: 1000,
        					className: "open-tosat"
						  });
						  return;
				}
			}
			let data = {
				   	accessToken		: this.accessToken,
         			mobileUserName	: this.mobileUserName,
          			cooperateCode	: this.cooperateCode,
					inputClueRequest  :{
						partnerName 		: this.partnerName,
						phoneNumber 		: this.phoneNumber,
						goodsInformation 	: this.goodsInformation,
						deliveryAddress		: this.selectStr + this.detailsInfo
				}
			};
				data =JSON.stringify(data);
				console.log(data);
				
				coo.sign(data,coo.LoginUrl + 'pcpmobile/insetInputClue.action').then(res => {
					//数据提交成功就更改缓存
					if (res.status === 200 && res.data.success === true) {
						this.$router.push('/ExpressEntry/detailsEntry')
						this.$store.commit('flagEntryMutations',0)
					} else {
							Toast({
        					message:  res.message,
        					duration: 1200,
        					className: "open-tosat"
						  });
					}
				}).catch (err => {
					Toast({
        					message:  '提交失败 请重试',
        					duration: 1000,
        					className: "open-tosat"
						  });
					console.error(err);
					
				})
			}
		}
	}
</script>
<style scoped>
.details-entry {
	margin-top: 80px;
}
 
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
#title-count {
position: fixed;
top: 0;
left: 0;
}
.warp-entry-list {
	width: 95%;
	margin: 0 auto;
	font-size: 80%;
}
.warp-entry-list ul>li{
	box-sizing: border-box;
	display: flex;
	flex: 1;
}
.warp-entry-list ul li {
	margin: 10px 5px;
	box-sizing: border-box;
}
.warp-entry-list ul li span{
	padding: 10px 15px;
	width: 33%;
	text-align: right;	

}
.warp-entry-list ul li span::after {
	content: ":";
	margin-left: 10px;	
	font-weight: 700;
	font-size: 16px;
}
.warp-entry-list ul li input{
	font-size: 80%;
	outline: none;
	/* padding: 0 8px; */
	margin: 0;
	/* padding: 0; */
	width: 72%;
}
.warp-entry-list ul {
	list-style: none;
}
.warp-entry-list li:nth-of-type(4) input {
	background: url("../../../../img/downRow.png") no-repeat  90% center;
	background-size : 15px ; 
}
.warp-entry-list li:nth-of-type(5) textarea 	{
	font-size: 80%;
}
/* .area_ctrl .area_btn_box  .area_btn larea_cancel{
	font-size: 50% !important;
} */

.gear area_province{
	color: red !important;
	background-color: red !important; 
	
	
}
.area_ctrl>.area_roll_mask>.area_roll{
	font-size: 8px !important;
	color: red !important;
}
</style>