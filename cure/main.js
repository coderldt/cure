import App from './App'
import uView from '@/uni_modules/uview-ui'
import ReplyList from './pages/home/children/reply.vue'

import Vue from 'vue'
Vue.component('ReplyList', ReplyList)
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
