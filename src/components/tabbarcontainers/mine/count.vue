<template>
          <div>
          <mt-header id="title-count" title="统计">
                <router-link to="/mine?3" class="iconfont" slot="left"> 
                &#xe6ba; 返回
          </router-link>
        </mt-header>
                <div id="top-selected-count">
                     <div  class="select-down-row" >
                <select v-model="selectedDate">
                    <option  v-for="item in queryDate" :key="item.id" :value="item.value" v-cloak>{{item.text}}</option>
                </select>
                </div>
                <div class="select-down-row">
                <select  v-model="selectedType">
                    <option  v-for="item in queryType" :key="item.index" :value="item.value" v-cloak>{{item.text}}</option>
                </select>
                </div>
                </div>
        <ul id="data-father-count" v-cloak>
            <li>
                <ul class="query-datda-list" style="padding-top: 42px;">
                    <li v-for="item in dataList.wayBillArray" :key="item.list">
                        <ul id="query-data-item" v-cloak> 
                            <li > 运单号 : <span v-cloak>{{item.wayBillNo}}</span></li>
                            <li v-cloak>{{item.recipients}}</li>
                            <li v-cloak class="iconfont"> &#xe632;<a :href="'tel:' + item.recipientsPhone">{{item.recipientsPhone}}</a></li>
                            <li>
                                <img    v-if="item.status === '7' || item.status === '10'"  src= '../../../img/imgQian@2x.png' id= "img-count" alt="">
                                <img    v-else-if="item.status === '9'"  src = '../../../img/imgZhiliu@2x.png' id= "img-count" alt="">
                                <img    v-else-if="item.status === '3'"  src = '../../../img/imgWatie@2x.png' id= "img-count" alt="">
                                <img    v-else-if="item.status === '11'"  src = '../../../img/imgTui@2x.png' id= "img-count" alt="">
                                </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>

      </div>

    
</template>

<script>
import { Header } from "mint-ui";
import coo from "../../../config.js";

export default {
  data() {
    return {
      dataList: [], //请求回来的结果放入里面
      selectedDate: "QUERY_DATE_DAY", //查询的时间
      selectedType: "QT_000", // 查询显示的结果
      queryDate: [
        { value: "QUERY_DATE_DAY", text: "今天" },
        { value: "QUERY_DATE_WEEK", text: "最近一周" },
        { value: "QUERY_DATE_MONTH", text: "最近一月" }
      ],
      queryType: [
        { value: "QT_000", text: "全部" },
        { value: "QT_002", text: "已签收" },
        { value: "QT_004", text: "已取回" },
        { value: "QT_005", text: "代签收" }
      ],
      detailNumber: []
    };
  },
  created() {
    this.queryDatePost();
  },
  watch: {
    selectedDate: function() {
      this.queryDatePost();
    },
    selectedType: function() {
      this.queryDatePost();
    }
  },
  methods: {
    queryDatePost: function() {
      //选择查询的天数发送请求
      let data = {
        accessToken: coo.getCache("accessToken"),
        cooperateCode: coo.getCache("cooperateCode"),
        mobileUserName: coo.getCache("mobileUserName"),
        roleAuth: coo.getCache("roleAuth"),
        queryBillType: this.selectedType,
        queryDateType: this.selectedDate
      };
      // console.log(data);

      data = JSON.stringify(data);
      coo
        .sign(data, coo.LoginUrl + "pcpmobile/cooperationDataTotalQuery.action")
        .then(res => {
          if (res.status === 200 && res.data.success == true) {
            //存入渲染数据
            this.dataList = res.data.wayBillTotalResponse;

            this.queryType = [
              {
                value: "QT_000",
                text: "全部" + res.data.wayBillTotalResponse.allTotal
              },
              {
                value: "QT_002",
                text: "已签收" + res.data.wayBillTotalResponse.signforTotal
              },
              {
                value: "QT_004",
                text: "已取回" + res.data.wayBillTotalResponse.fetchbackTotal
              },
              {
                value: "QT_005",
                text: "代签收" + res.data.wayBillTotalResponse.waitSignTotal
              }
            ];
            // console.log(this.dataList);
            // console.log("你不该进来啦");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.clearfix::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  clear: both;
}
.mint-header {
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100%;
}

.mint-header-button.is-left {
  text-indent: 0.5em;
}
.iconfont {
  width: 55%;
  position: relative;
  /* left: 5%; */
  top: 0;
  /* transform: translateY(30px); */
  z-index: 2;
}
#top-selected-count {
  position: fixed;
  /* top: 40px;
   left: 0;; */
  display: flex;
  box-sizing: border-box;
  z-index: 555;
  width: 100%;
}
#top-selected-count > div {
  width: 50%;
  border: 1px solid #ccc;
}
#top-selected-count > div select {
  margin: 0 0;
  border-radius: 0;
}
#img-count {
  position: absolute;
  top: 0%;
  right: 0%;
  height: 100%;
  z-index: -2;
}
#query-data-item {
  position: relative;
  top: 0;
  left: 0;
  font-size: 80%;
  padding: 5px 15px;
  /* border: 1px solid #ddd; */
  margin-bottom: 2px;
  list-style: none;
  /* box-shadow: 0px 1px 5px 1px #ddd ; */
  border: 1px solid #ddd;
  border-radius: 2px;
  box-sizing: border-box;
}
#query-data-item li {
  letter-spacing: 1px;
}
#query-data-item > li:nth-of-type(1) > span {
  font-weight: 700;
}
#query-data-item > li:nth-of-type(2) {
  /* float: left; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 60%;
}
#query-data-item > li:nth-of-type(3) {
  position: absolute;
  bottom: 0px;
  right: 50%;
  /* z-index: 556; */
  height: 50%;
  /* float: right; */
  /* text-align: right; */
  width: 35%;
  transform: translate(150%, 25px);
}
#query-data-item > li:nth-of-type(3) a {
  font-size: 80%;
}
#title-count {
  z-index: 555;
}
/* #data-father-count{
    margin-top: 80px;
} */
#query-datda-list {
  padding-top: 40px 0;
}
.mint-button.iconfont {
  top: -30px;
}
.mint-header-button > a {
  color: inherit;
  font-size: 100%;
}
#top-selected-count .select-down-row {
  position: relative;
  top: 0;
  left: 0;
}
select {
  background: url("../../../img/downRow.png") no-repeat 90% center;
  background-size: 15px;
  background-color: #fff;
}
</style>


