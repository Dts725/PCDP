<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mui-media" v-for="(item, index) in newsList" :key="index">
            <router-link :to="'/home/newsinfo/' + item.id" class="mui-navigate-right">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <p class="news-title mui-ellipsis">{{item.title}}</p>
                    <p class="mui-ellipsis">
                        <span>创建时间: {{item.add_time}}</span>
                        <span>点击: {{item.click}}</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            newsList: []
        }
    },
    created(){
        axios({
            method: "get",
            url: "http://vue.studyit.io/api/getnewslist"
        }).then(res => {
            if(res.data.status == 0){
                this.newsList = res.data.message;
            }
        })
    }
};
</script>

<style>
.mui-ellipsis.news-title{
    font-size: 16px;
    color: #000000;
    margin-bottom: 5px;
}

.mui-ellipsis{
    font-size: 12px;
    width: 100%;
}

.mui-ellipsis span:last-child{
    float: right;
}

</style>
