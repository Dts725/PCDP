import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//下标提示页
const moduleTipsNumber = {
    // 定义状态
    state: {
        signNumber          :   0,
        detentionNumber     :   0
    },
    getters: {
          //待用
    },
    mutations : {
        //修改状态方法
        signNumberCommit (state,msg) {
            state.signNumber = msg;
        },
        detentionNumberCommit(state,msg) {
            state.detentionNumber =   msg;
        }
        
    },
   
};
//到件页面数据状态
const moduleToPieces = {
    state : {
        dataListToPieces        : "",
        dataPiecesValueList     : "",
        flagTopieces            : 1
    },
    getters: {

      },
    mutations : {
        //同步执行 提交状态操作
        
        dataListToPiecesCommit      (state,msg) {
            state.dataListToPieces = msg;
        },
        dataPiecesValueListCommit   (state,msg) {
            state.dataPiecesValueList = msg;
        },
        flagTopiecesCommit(state, msg) {
            state.flagTopieces = msg;
        }
    },
    actions : {
        //消亡时调用 意不提交状态改变
        flagTopiecesActions ({commit},msg) { 
           commit('flagTopiecesCommit', msg);
        },
        dataListToPiecesActions ({commit},msg) {
            commit('dataListToPiecesCommit', msg);
        },
        dataPiecesValueListActions ({commit},msg) {   
            commit('dataPiecesValueListCommit', msg);
        }

    }
        
  
};
//签收页状态
const moduleSign = {
    state : {
        dataListSign : "",
        flagSign     : 1
    },
    getters : {
        //待用
    },
    mutations : {
        //同步执行 提交状态改变
        dataListSignCommit (state,msg) {
            state.dataListSign = msg;
        },
        flagSignCommit (state,msg) {
            state.flagSign = msg;
        }
    },
    actions : {
        //消亡时调用 意不提交状态改变
        dataListSignActions ({commit},msg) {
            // console.log("执行了list");
            
            commit('dataListSignCommit',msg);
        },
        flagSignCommitActions ({commit},msg) {
            // console.log("执行了flag");
            
            commit('flagSignCommit', msg);
        }

    }

};
//滞留页状态
const moduleDetention = {
    state : {
        dataDetentionList : ""
    },getters : {

    },
    mutations : {
        dataDetentionListCommit(state,msg) {
            state.dataDetentionList = msg;
        }
    },
    actions: {
        dataDetentionListActions ({commit},msg) {
            commit('dataDetentionListCommit', msg);
        }
    }
};
//零担线索状态
const modulesEntry = {
	state : {
		entryList : "",
		entryDetails : "",
		flagEntry 	 : 1
	},
	mutations : {
		entryListMutations (state,msg) {
			state.entryList = msg;
		},
		entryDetailsMutations (state,msg) {
			state.entryDetails = msg;
		},
		flagEntryMutations (state,msg) {
			state.flagEntry = msg;
		}
	},
	actions : {
		entryListActions ({commit},msg) {
			commit('entryListMutations',msg)
		},
		entryDetailsActions ({commit},msg) {
			commit('entryDetailsMutations',msg)
		},
		flagEntryMutations ({commit},msg) {
			commit('flagEntryMutations',msg)
		}
	}
}





const store = new Vuex.Store({
    modules : {
        tips        : moduleTipsNumber,
        toPieces    : moduleToPieces,
        sign        : moduleSign,
		detention   : moduleDetention,
		entry		: modulesEntry
        
    }
})

export default store