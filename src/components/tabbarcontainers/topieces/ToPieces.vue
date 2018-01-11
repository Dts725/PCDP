<template>
 
  <div class="top">

    
    <div>
        <mt-search v-model.trim="value" cancel-text="取消" placeholder="请输入运单号">
        </mt-search>
    </div >
    <div class="query">
        <mt-button  class="query-button"  @click="openToast()" size="large">查询运单</mt-button>
    </div>

    <div>
        <ul class="data-list">
            <li v-for = "(item,index) in dataList" :key="item.index">
                <ul>
                    <li v-cloak>运单号 : {{item.wayBillNo}}</li>
                    <li v-cloak>签收人 : {{item.recipients}}</li>
                    <li @click="toPieces(item.id,item.wayBillNo,index)">到件</li>
                </ul>
            </li>
        </ul>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import coo   from '../../../config.js'
import { MessageBox } from 'mint-ui';
import axios from 'axios'
export default {
  data () {
    return {
 
        value                   :    "",
        dataList                :    [],
        accessToken             :    coo.getCache('accessToken'),
        cooperateCode           :    coo.getCache('cooperateCode'),
        mobileUserName          :    coo.getCache('mobileUserName'),
         roleAuth               :    coo.getCache('roleAuth'),
    }
  },
    // mounted(){
    //      window.location.reload();
    // },
  methods: {
     
      toPieces (itemId,wayBillNo,$index) {
          //判断页面确定执行then 后面的内容
           MessageBox.confirm('确定执行到件操作?').then (action => {
              
                
                 //到件请求函数
          let data = {
                        "accessToken"        :    this.accessToken,
                        "cooperateCode"      :    this.cooperateCode,
                        "mobileUserName"     :    this.mobileUserName,
                        "roleAuth"           :    this.roleAuth,
                        "operationRequest"   :    {
                            "operationId"           : itemId,
                            "operationStatus"       : "300",
                            "operationWayBillNo"    : wayBillNo
                        }
            };
            data = JSON.stringify(data);
            // axios({
            //     method  :   'POST',
            //     headers :   {'Content-Type':'application/json; charset=UTF-8'},
            //     url     :   coo.LoginUrl +"pcpmobile/arriveWayBill.action", //此处测试删除了n
            //     data    :   data

            // })
            coo.sign(data,coo.LoginUrl +"pcpmobile/arriveWayBill.action").then(res => {
                if( res.status == 200 && res.data.success == true ) {

                    this.dataList.splice($index,1);
                    Toast({
                        message: '操作成功',
                        iconClass: 'icon icon-success',
                        position: 'middle',
                        duration: 500
                    });
                }
            }).catch(err => {
                  Toast({
                        message: '到件操作失败,请重试 !',
                        position: 'middle',
                        duration: 1200
                    });
                    this.value = null;
                    console.log(err)
            })
            })
         

        },
      openToast() {
          if(this.value == ""){
              Toast ({
                            message     : "请输入运单号查询!",
                            position    : 'middle',
                            duration    : 1000,
                           
                       })
              return
          }
          //发送查询请求

          let data = {
                    "searchWayBillNo"    :    parseInt(this.value),
                    "accessToken"        :    this.accessToken,
                    "cooperateCode"      :    this.cooperateCode,
                    "mobileUserName"     :    this.mobileUserName,
                    "roleAuth"           :    this.roleAuth
            }
          data  = JSON.stringify(data);
        //     axios({
        //         method  : 'POST',
        //         headers : {'Content-Type':'application/json; charset=UTF-8'},
        //         url     : coo.LoginUrl +"pcpmobile/searchWayBill.action", 
        //         data    : data
        //     })
            coo.sign(data,(coo.LoginUrl +"pcpmobile/searchWayBill.action")).then(res => {
                
                
                if(res.status == 200) {
                    if(res.data.success == true){  
                        this.dataList.unshift(res.data.wayBillInfo);
                        this.value = null;

                    } else {
                        this.value = null;
                         Toast ({
                            message     : res.data.message,
                            position    : 'middle',
                            duration    : 1000,
                        
                       })
                    }  
                     
                }

            }).catch(err => {
                 Toast ({
                            message     : "查询运单信息失败请重试 !",
                            position    : 'middle',
                            duration    : 1200,
                        
                       })
                    this.value = null;
                    console.log(err);
            })
           
      }  
    }
};
</script>

<style lang="css" solt-scope>
element.style {
    height: 45px;
}
input[type="search"] {
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
        height: 34px;
    text-align: center;
    border: 0;
    border-radius: 6px;
    margin-bottom: 0px;
    background-color: rgba(60, 24, 24, 0);
}
.mint-search {
    /* height: 100%; */
    height: 100%;
    overflow: hidden;
}
.query{
    margin: 0 auto;
    margin-top: 15px;
    width: 80%;
}
.mint-searchbar-inner{
    height: 40px;
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
button:enabled:active{
    color: #4a4747;
    background-color: #bfbfbf21;
}
ul {
    list-style: none;
}
.data-list {
    margin-top: 1em;
}
.data-list li>ul {
    /* position: relative; */
    /* z-index: 999; */
    padding: 0 0.1em;
    /* background-color: green; */
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    letter-spacing: 0.1em;
    font-weight: 500;
    font-size: 70%;
    margin-top: 0.3em;
    /* height: 2.5em; */
    line-height: 3em;
    display: flex;
    justify-content: space-around;
    flex: 1;
}
.data-list li>ul>li:nth-of-type(3){
    border: 1px solid #387ef5;
    border-radius: 3px;
    padding: 0 0.5em;
    background-color: rgb(221, 101, 21);
    line-height: 2em;
    height: 2em;
    align-self: center;
    /* width: 18%; */
}
.data-list li>ul>li:nth-of-type(2) {
    /* background-color: red; */
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 28%
}
.data-list li>ul>li:nth-of-type(1) {
    /* background-color: red; */
    /* overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap; */
    width: 46%;

}
.mint-search-list {
    overflow: auto;
    padding-top: 0;
}
.mint-msgbox {
    width: 75%;
    font-size: 80%;
}
</style>
