<template>
  <div class="news-info"> 
      <div class="news-head">
        <h4>{{newsInfo.title}}</h4>
        <p>
            <span class="add-time">发布时间: {{newsInfo.add_time| dateformatter("YYYY-MM-DD HH:mm:ss")}}</span>
            <span class="click-count">点击: {{newsInfo.click}}</span>
        </p>
      </div>
      <!-- v-html插入的html元素无法进行scoped的样式选中 -->
      <!-- 为实现scoped的在元素中插入的随机的属性，在v-html动态加入的元素中，并没有 -->
      <div class="news-content" v-html="newsInfo.content.slice(1).slice(0, newsInfo.content.length-2)">
          
      </div>

      <div class="news-comment">
          <comment :id="$route.params.id"></comment>
      </div>
  </div>
</template>

<script>
import axios from "axios"

import Comment from "../comment/Comment.vue"

import dateformatter from "../../filters/dateformatter"

export default {
  data(){
      return {
          newsInfo: {}
      }
  },
  created(){
      //1. 获取当前页面url中的id, 发送ajax请求获取对应的新闻数据
    //   this.$route.params.id
      axios({
          method: "get",
          url: "http://vue.studyit.io/api/getnew/" + this.$route.params.id
      }).then(res => {
          if(res.data.status == 0){
              this.newsInfo = res.data.message[0]
          }
      })
  },
  components:{
      comment: Comment
  },
  filters: {
      dateformatter
  }
}
</script>

<style>

.news-info{
    padding: 0 10px;
}

.news-head{
    padding-top: 5px;
}

.news-head h4{
    line-height: 1.5;
}

.news-head p::after{
    content: "";
    display: block;
    height: 0;
    clear: both;
}

.add-time{
    float: left;
}
.click-count{
    float: right;
}

.news-content{
    overflow: hidden;
}

.news-content img{
    width: 100%;
}
</style>


