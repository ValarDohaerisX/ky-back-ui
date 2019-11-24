import Vue from 'vue'

import App from './App'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import router from './router/router.js'

import VueRouter from 'vue-router'

import VueResource from 'vue-resource'

import Axios from 'axios'

Vue.prototype.$axios = Axios

Axios.defaults.baseURL = '/api'

Axios.defaults.headers.post['Content-Type'] = 'application/json'

// 安装 ElementUI（ui）
Vue.use(ElementUI)
// 安装 路由（url）
Vue.use(VueRouter)
// 绑定 vue-resource（ajax）
Vue.use(VueResource)
// 如果我们通过全局配置了，请求的数据接口 根域名，则 ，在每次单独发起 http 请求的时候，请求的 url 路径，应该以相对路径开头，前面不能带 /  ，否则 不会启用根路径做拼接；
// Vue.http.options.root = 'http://localhost:8080/'
// 全局启用 emulateJSON 选项:如果Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项。
// Vue.http.options.emulateJSON = true

Vue.config.productionTip = false

new Vue({
 el: '#app',
 render: h => h(App),
 //给vue对象绑定路由
 router,
  template: '<App/>',
  components: { App }
})
