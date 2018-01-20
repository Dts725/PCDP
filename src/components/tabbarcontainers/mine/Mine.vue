<template>
  <div class="mine">
      <div class="img-ifon"><span>找个头像丢进来</span></div>
      <ul>

                <li>
                    <mt-button v-cloak size="large" class="mine-button" type="default" style="line-height : 1.6em;margin-top : 0.5em">  
                        <span  class="iconfont" style="font-size : 1.4em;margin-right : 15px;"> &#xe61b;&nbsp;&nbsp;&nbsp;:</span>
                        <span  v-cloak style="">&nbsp;&nbsp;&nbsp;{{userName}}  {{userPhone}}</span>
                    </mt-button>
                 </li>
               <li>
                   <router-link to="/count">
                    <mt-button v-cloak size="large" class="mine-button" type="default" style="line-height : 1.6em;margin-top : 0.5em">  
                        <span  class="iconfont" style="font-size : 1.4em;margin-right : 15px;"> &#xe65a;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                        <span > &nbsp;&nbsp;&nbsp;统计</span>
                    </mt-button>
                    </router-link>
                </li>
                 <li>
                   <router-link to="/count">
                    <mt-button v-cloak size="large" class="mine-button" type="default" style="line-height : 1.6em;margin-top : 0.5em">  
                        <span  class="iconfont" style="font-size : 1.4em;margin-right : 15px;"> &#xe602;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                        <span > &nbsp;&nbsp;&nbsp;信息录入</span>
                    </mt-button>
                    </router-link>
                </li>
               <li> 
                    <mt-button size="large" @click="quick" type="danger" style="margin-top :2.5em; text-align : center " >  
                        退出
                    </mt-button>
                </li>
      </ul>
  </div>
</template>

<script>
import coo from '../../../config.js'
import { Button } from 'mint-ui'

export default {
    data () {
      return {
            userName    :   null,
            userPhone   :   null
      }
    },
    created ()  {
        this.userName = coo.getCache("cooperateName");
        this.userPhone = (coo.getCache("mobileUserName").substr(0,3)+ '****' +coo.getCache("mobileUserName").substr(-4));
    },
    methods : {
        quick : function () {
            window.localStorage.removeItem("accessToken")
            window.localStorage.removeItem("dataListToPieces")
            this.$router.push('/login')
        },
        what : function () {       
            coo.whtasPhone();
        }
    }
}
</script>

<style slot-scope>
    .mine ul{
        margin-top: 20px;
        width: 95%;
        margin : 0 auto;
        list-style-type: none;
        letter-spacing: 2px;

    }
    .mint-button--large {
        font-size : 0.9em;
        text-indent: 10px;
        display: block;
        width: 100%;
        text-align: left;
    }
    .mint-button--default.mine-button{
    margin-top: 1em;
    width: 100%; 
    font-size: 95%;
    height: 2.2em;
    border-radius: 3px;
    text-align: left;
       color: #656b79;
    background-color: #f6f8fa;
    box-shadow: 0 0 1px #b8bbbf;
}

.img-ifon {
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: rgba(44, 232, 17, 0.57);
}

</style>
