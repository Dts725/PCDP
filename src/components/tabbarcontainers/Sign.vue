<template>
<div   ref="wrapper" :style="{ height: wrapperHeight + 'px' }">


   <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill = "false" ref="loadmore"  v-infinite-scroll="loadMoreMore"
  infinite-scroll-disabled="loading">
    <ul class="wrap">
      <li  class = "info"  v-for="item in proCopyright" :key="item.index">
           <ul>
                  <li><span>运单号  </span>     <span v-cloak>  : {{item.wayBillNo}}    </span></li>
                  <li><span class="iconfont"> &#xe610;</span><span v-cloak> : &nbsp; {{item.recipients}}   </span></li>
                  <li><span class="iconfont"> &#xe632;</span><span v-cloak> : &nbsp;<a :href="'tel:' +item.recipientsPhone">{{item.recipientsPhone}}</a> </span></li>
                   <!-- <li><span class="iconfont"> &#xe632;</span><span v-cloak> : &nbsp;{{item.recipientsPhone}}</span></li> -->
                  <li><span class="iconfont"> &#xe61c; :</span>   <span v-cloak > &nbsp;到件操作  &nbsp; {{item.arriveTime | formatDate}}   </span></li>
                  <li><span class="iconfont" > &#xe606; :</span>   <span v-cloak > &nbsp;签收操作  &nbsp; {{item.signforTime | formatDate}}  </span></li>
                  <li><span  class="iconfont">&#xe620;</span> <span v-cloak> : &nbsp;{{item.receiveAddress}}  </span></li>
                  <li v-show="item.status == 3" class = "sign-detention">  
                           <router-link to="">
                                <span>签收</span>
                           </router-link>
                            <router-link to="">
                                <span>滞留件</span>
                            </router-link>
                  </li>
                  

              </ul>
          </li>
    </ul>
  </mt-loadmore>
  </div>
</template>

<script>
    
    import { Loadmore } from 'mint-ui';
    import {wrapper} from 'mint-ui'
    import {formatDate}  from '../../date.js'
    import axios from 'axios'
    import coo   from '../../config.js'
 
    export default {
        data () {

            return {
                flagMounted : true,
                loading : false,            //默认false 滑动加载
                flag : false,               //flag  为true  上拉刷新加载数据 默认false
                wrapperHeight : 0,          //页面scroll 数据
                start  : 0,                 //数据加载开始的位置
                limit  : 8,                 // 每页允许的加载数据条数
                accessToken          :    coo.getCache('accessToken'),
                cooperateCode        :    coo.getCache('cooperateCode'),
                mobileUserName       :    coo.getCache('mobileUserName'),
                roleAuth             :    coo.getCache('roleAuth'),
                pageNo:1,                   //加载的页数  判断刷新次数 pangeNo ++
                proCopyright:[],            //用来存储后台接受的数据
                allLoaded: false,           //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode:"auto",          //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
                totalpage:1,                //计算出来应有的 刷新次数   
            }
        },

         filters : {
                 formatDate (time) {
                     let date = new Date(time);
                    return formatDate (date, 'yyyy-MM-dd hh:mm')
                       }  
            },
        mounted(){
                     this.loadPageList();  //初次访问查询列表
                      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;//组件更新动态计算页面scroll 数据
            },
        methods : {
            loadMoreMore : function () {
                console.log("出发了scroll");
                
                // this.loading =true;
                    if(this.totalpage == 1){
                         this.pageNo = 1;
                         this.allLoaded = true;
                     
                       } else if (this.pageNo == this.totalpage){
                              this.allLoaded = true
                        
                            }else{
                            //   console.log("more方法查询的")
                              this.pageNo = parseInt(this.pageNo) + 1;
                              this.start = this.start +8;
                            //   this.allLoaded = false;
                            //   setTimeout (() => {
                            //       //此处定时器客给可不给用来控制刷新加载的速度
                            //   },50)
                                  this.upLoadMore();
                      } 
                
            },
            loadBottom : function () {
                console.log("上来刷新执行了");
                  if(this.totalpage == 1){
                    this.pageNo = 1;
                    this.allLoaded = true;
                       
                       } else if (this.pageNo ==this.totalpage){
                              this.allLoaded = true
                              this.pageNo = parseInt(this.pageNo) + 1;                                         
                            }else{
                            //   console.log("more方法查询的")
                              this.pageNo = parseInt(this.pageNo) + 1;
                              this.start = this.start +8;
                              this.allLoaded = false;

                              
                                 //此处若用 请给给上拉事件加节流阀
                               
                                  this.upLoadMore();
                      } 
                         setTimeout (() => {
                                    this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位

                                  }, 2500)

            },
            //下拉刷新执行
            loadTop : function  () {
                console.log("下拉刷新执行了");
                this.loadPageList()
                if(this.totalpage == 1){
                         this.pageNo = 1;
                         this.allLoaded = true;
                       
                       } else{      
                           if (this.pageNo >=this.totalpage){
                                setTimeout (() => {
                                         
                           this.$refs.loadmore.onTopLoaded();
                                         },300)                                 
                            }else {
                                   //   console.log("more方法查询的")
                                    this.pageNo = parseInt(this.pageNo) + 1;
                                    this.start = this.start +8;
                                    this.flag = true;
                                    this.upLoadMore();
                                  setTimeout (() => {
                                         
                                    this.$refs.loadmore.onTopLoaded();
                                         },300)  
                            }
                                 
                                    //此处若用 请给给下拉事件加节流阀
                                     
                      }
                       

            },

             loadPageList:function (){

                // console.log("初始化查询");
        
                 let  data ={
            
                    "limit"              :    this.limit,
                    "start"              :    this.start,
                    "accessToken"        :    this.accessToken,
                    "cooperateCode"      :    this.cooperateCode,
                    "mobileUserName"     :    this.mobileUserName,
                    "roleAuth"           :    this.roleAuth
          
                         };
                        // 查询数据

                       axios({
                             method  :  'POST',
                             headers : {'Content-Type':'application/json; charset=UTF-8'},
                             url     :   coo.LoginUrl    +   "pcpmobile/querySignWayBillInfo.action",//获取签收数据接口,
                             data    :   JSON.stringify(data)
                        }).then(res => {
                              if(res.status == 200 && res.data.success == true) {

                                  if(!this.flag  && this.flagMounted) {
                                      this.flagMounted = false;
                                      this.proCopyright = res.data.wayBillInfoList;
                                  } 
                                      this.totalpage = Math.ceil(res.data.totalCount/this.limit);  //计算出需要刷新的次数              
                                
                                }
                            }).catch( function (error) {
            
                                if(error.response){
                                        console.log(error.response.data);
                                        console.log(error.response.status);
                                        console.log(error.response.header);
                                    }else {
                                        console.log('Error',error.message);
                                         }
                                         console.log('Error',error.message);
                                        })

    },



            upLoadMore : function () {
                //封装刷新加载函数
                let  data ={
            
                    "limit"              :    this.limit,
                    "start"              :    this.start,
                    "accessToken"        :    this.accessToken,
                    "cooperateCode"      :    this.cooperateCode,
                    "mobileUserName"     :    this.mobileUserName,
                    "roleAuth"           :    this.roleAuth
          
                     };
        
                     // console.log(this.pageNo);
                     //  console.log( this.totalpage );
                axios({
                        method  :  'POST',
                        headers : {'Content-Type':'application/json; charset=UTF-8'},
                        url     :   coo.LoginUrl    +   "pcpmobile/querySignWayBillInfo.action",//获取签收数据接口,
                        data    :   JSON.stringify(data)
                    }).then(res => {
                            if(res.status == '200' && res.data.success == true) {

                                // this.totalpage = Math.ceil(res.data.totalCount/this.limit);
                                if(this.flag){
                                    this.proCopyright =res.data.wayBillInfoList.concat(this.proCopyright);
                                    this.flag = false;
                                }else{

                                    this.proCopyright = this.proCopyright.concat(res.data.wayBillInfoList);
                                }
                            console.log(this.totalpage);
                            console.log(this.pageNo);
                            console.log(this.proCopyright);
                    
                            }
                        }).catch( err => {
                            // console.log("进来error  了");
                
                                console.log(err);
                        })
   
            },
        }
    }
</script>
<style slot-scope>
    .info{
        letter-spacing: 0.1px;
      /* display: flex; */
      font-size: 80%;
      /* width: 90%; */
      padding:30px 0;
      background-color: #fff;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-bottom:5px;
      color : #444;
      box-sizing: border-box;
      padding: 5px 15px;
    }
      .info  ul > li{
          line-height: 2em;
      }
    .info  ul > li:nth-of-type(1) {
        height: 3em;
        line-height: 2.5em;
    }
    .info  ul > li:nth-of-type(2) {
        height: 2em;
        line-height: 2em;
    }
    .info  ul > li:nth-of-type(3) {
        height: 2em;
        line-height: 2em;
    }
    .info  ul > li:nth-of-type(1) span:nth-of-type(2){
        font-weight: 700;
 
        
    }
    .info  ul >li:nth-of-type(2) {
       word-break:break-all;
       height: auto;
  
    }
       .info  ul >li:nth-of-type(6) {
       word-break:break-all;
       height: auto;
       
    }
    ul {
        list-style: none;
    }
    .sign-detention{
     display: flex;
     justify-content: space-around ;
     align-items: center;
     width: 100%;
     flex: 1 1 0;
     /* float: left;
     width: 40%; */
     /* text-align: center; */
     background-color:#fff;
    }
    .sign-detention  span {
         color : #fff;
     }
    .sign-detention a {
        margin-top: 1em;
        background-color: #387ef5;
        width: 45%;
        line-height: 2.2em;
        border-radius: 4px;
        text-align: center;
        color: #fff;
    }
    .wrap {
        margin-bottom: 49px;
    }
</style>

