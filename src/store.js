import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        author              : 'Wise Wrong',
        signNumber          :   0,
        detentionNumber      :   0
    },
    mutations : {
        //修改状态方法
        signNumberCommit (state,msg) {
            state.signNumber = msg;
        },
        detentionNumberCommit(state,msg) {
            state.detentionNumber = msg;
        }
        
    }
})

export default store