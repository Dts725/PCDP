<template>
  <div>
       <p> 首页 </p>
      <div class="swipe">
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in lunboPics" :key="index"><img class="swipe-item" :src="item.img" /></mt-swipe-item>
        </mt-swipe> -->
      </div>
       
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    
            <router-link to="/home/newslist">
                <!-- <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/piclist">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
                <img src="../../images/menu3.png" alt="">                
                <div class="mui-media-body">商品购买</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
                <img src="../../images/menu4.png" alt="">
                
                <div class="mui-media-body">留言反馈</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
                <img src="../../images/menu5.png" alt="">
                
                <div class="mui-media-body">视频专区</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
                <img src="../../images/menu6.png" alt="">
                
                <div class="mui-media-body">联系我们</div> -->
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lunboPics: []
    };
  },
  created() {
    axios({
      method: "get",
      url: "http://vue.studyit.io/api/getlunbo"
    }).then(res => {
      if (res.data.status == 0) {
        this.lunboPics = res.data.message;
      }
    });
  }
};
</script>

<style>
.swipe {
  height: 220px;
}
.swipe-item {
  width: 100%;
}
.swipe-item:nth-child(2n + 1) {
  background-color: pink;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
.mui-table-view-cell img{
    width: 70%
}
.mui-table-view{
    background-color: #fff !important;
}

.mui-grid-view.mui-grid-9{
    border: none;
}
</style>
