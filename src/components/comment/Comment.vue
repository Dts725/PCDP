<template>
  <div>
      <div class="post">
          <div class="mui-input-row">
            <textarea id="textarea" v-model="content" rows="5" placeholder="请输入评论内容"></textarea>
          </div>
          <mt-button type="primary" size="large" @click="post">发表评论</mt-button>
      </div>
      <div class="list">
          <ul>
              <li v-for="(item, index) in comments" :key="index">
                    <p class="comment-title">
                        <span>第{{index + 1}}楼</span> 
                        <span>用户:{{item.user_name}}</span>
                        <span>发表时间:{{item.add_time | dateformatter("YYYY-MM-DD HH:mm:ss")}}</span>

                    </p>
                    <p class="comment-content">
                        {{item.content}}
                    </p>
              </li>
          </ul>

          <mt-button plain type="danger" size="large" @click="more" v-if="showMoreBtn">加载更多</mt-button>
      </div>
  </div>
</template>


<script>
import axios from "axios";
import dateformatter from "../../filters/dateformatter";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      comments: [],
      pageindex: 1,
      showMoreBtn: true,
      content: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    post() {
      if(this.content.trim()){
        axios({
          method: "post",
          url: "http://vue.studyit.io/api/postcomment/" + this.id,
          data: "content=" + this.content
        }).then(res=>{
          if(res.data.status == 0){
            this.comments.unshift({
              user_name: "匿名用户",
              add_time: new Date().toUTCString(),
              content: this.content
            })

            this.content = ""
          }
        })
      }
    },
    more() {
      this.pageindex++;
      this.getData();
    },
    getData() {
      axios({
        method: "get",
        url:
          "http://vue.studyit.io/api/getcomments/" +
          this.id +
          "?pageindex=" +
          this.pageindex
      }).then(res => {
        if (res.data.status == 0) {
          if (res.data.message.length > 0) {
            this.comments = this.comments.concat(res.data.message);
          } else {
            Toast("没有更多的评论了！");
            this.showMoreBtn = false;
          }
        }
      });
    }
  },
  props: ["id"],
  filters: {
    dateformatter
  }
};
</script>

<style>
#textarea {
  margin-bottom: 0;
}
.list {
  padding-bottom: 10px;
}
.list ul {
  padding-left: 0;
}
.list ul li {
  list-style: none;
}
.comment-title {
  background-color: #ccc;
  line-height: 2.5;
  color: #000;
}

.comment-content {
  text-indent: 2em;
  color: #000;
}
</style>

