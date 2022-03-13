import App from './App'
import uView from '@/uni_modules/uview-ui'

import Vue from 'vue'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()