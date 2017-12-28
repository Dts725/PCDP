<template>
  <div>
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a class="mui-control-item" v-for="(item, index) in categories" :key="index" @click="gotoCategory(item.id)" data-wid="tab-top-subpage-1.html">
                    {{item.title}}
                </a>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import axios from "axios"
import mui from "../../../libs/mui/js/mui.js"

export default {
  data(){
      return {
          categories: []
      }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
        // scrollX: true,
        // deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created(){
      axios({
          method: "get",
          url: "http://vue.studyit.io/api/getimgcategory"
      }).then(res => {
          if(res.data.status == 0){
            //   console.log(res.data.message)
            this.categories = res.data.message;
          }
      })
  },
  methods:{
      gotoCategory(id){
          this.$router.push('/home/piclist/' + id);
      }
  }
};
</script>

<style>

</style>

