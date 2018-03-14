<template>
  <div class="mine">
      	<div class="img-ifon iconfont">
		  <span class="">&#xe607;</span>
		  <span v-cloak>{{userName}}
			  <br>

		  </span>
      	</div>
      <ul>
               <li>
                   <router-link to="/count">
                    <mt-button v-cloak size="large" class="mine-button" type="default" style="line-height : 1.6em;margin-top : 0.5em">  
                        <span  class="iconfont" style="font-size : 1.4em;margin-right : 15px;"> &#xe65a;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                        <span > &nbsp;&nbsp;&nbsp;统计</span>
                    </mt-button>
                    </router-link>
                </li>
                 <li>
                   <router-link to="/ExpressEntry/detailsEntry">
                    <mt-button v-cloak size="large" class="mine-button" type="default" style="line-height : 1.6em;margin-top : 0.5em">  
                        <span  class="iconfont" style="font-size : 1.4em;margin-right : 15px;"> &#xe602;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                        <span > &nbsp;&nbsp;&nbsp;零担线索</span>
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
import { MessageBox } from 'mint-ui'

export default {
    data () {
      return {
            userName    :   null,
            userPhone   :   null
      }
    },
    mounted ()  {
        this.userName = coo.getCache("cooperateName");
        this.userPhone = (coo.getCache("mobileUserName").substr(0,3)+ '****' +coo.getCache("mobileUserName").substr(-4));
    },
    methods : {
        quick : function () {
			MessageBox.confirm('确定执行此操作?').then(action => {
				window.localStorage.removeItem("accessToken")
		 this.$store.dispatch("dataListToPiecesActions", ""); //页面展示数据
		this.$store.dispatch("dataListSignActions", "");
		this.$store.dispatch("flagSignCommitActions", 1);
		this.$store.dispatch("dataDetentionListActions", "");
        this.$store.dispatch("flagSignCommitActions", 0);
        this.$store.dispatch(
          "dataPiecesValueListActions",
          ""
        ); //运单
            	this.$router.push('/login')
			});
        },
        what : function () {       
            coo.whtasPhone();
        }
    }
}
</script>

<style slot-scope>
.mine{
	margin-top: 40px;
	overflow: auto;
}
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
	width: 95%;
	margin: 0 auto;
	margin-top: 5PX;
    height: 80px;
    text-align: center;
    line-height: 80px;
	background-color: rgb(246,248,250); 
	display: flex;
	justify-content: space-around;
	box-sizing: border-box;
}
.img-ifon span:nth-of-type(1) {
	text-align: left;
	font-size: 64px;
	color: #26a2ff;
	/* line-height: 100%; */
	width: 30%;
	text-indent: 10px;
	
	
}
.img-ifon span:nth-of-type(2) {
	text-align: left;
	width: 65%;

	color:rgb(101, 107, 126);
	font-size: 20px;
	font-weight: 700;
}
</style>
