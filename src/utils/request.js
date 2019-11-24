import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { showLoading, hideLoading } from './loading'
let isLoad

// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  isLoad && showLoading()
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    hideLoading()
    return response
  },
  /* response => {
    const res = response.data
    console.log('res', res)
    if (res.code !== 20000) {
      console.log('1111')
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  }, */
  error => {
    hideLoading()
    const status = error.response.status
    if (status === 500) {
      Message({
        message: '服务端返回未知错误，请稍后重试',
        type: 'error',
        duration: 5 * 1000
      })
    }
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

const request = function(option, load) {
  const loadStr = String(load)
  // 只有当load传值为false时，才将isLoad置为false，否则默认为true
  if (loadStr === 'false') {
    isLoad = false
  } else {
    isLoad = true
  }
  return service(option)
}

export default request
