import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		title: '',
	},
    mutations: {
		SAVE_TITLE(state, data) {
			state.title = data
		},
	},
    actions: {},
})
export default store