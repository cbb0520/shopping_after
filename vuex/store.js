import Vue  from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{

    emp:[],
	},
	getters:{
		getmsg(state){
			return state.emp;
		},
	},
	mutations:{
		setmsg(state,val){
			state.emp=val;
		},
	},
	actions:{}
})
