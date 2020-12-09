import Vue from 'vue'
import App from './App.vue'

//导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//将路由的配置js引入进来
import Router from   '../router/routerconfig.js'

import Store from '../vuex/store.js'

//导入 axios.js
import Axios from 'axios'

//使用elementui
Vue.use(ElementUI)


//配置axios请求地址
Axios.defaults.baseURL = "http://localhost:8080/crmsystem_web"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(App),
  router:Router,
  store:Store
})
