import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://localhost:8000/api/v1/'
let AUTH_TOKEN = sessionStorage.getItem('token')

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
