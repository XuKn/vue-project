// 一个能发送ajax请求的函数
// 1. 统一处理请求异常
// 2. 异步请求成功的数据不是response, 而是response.data
// 3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
// 4. 配置请求超时的时间
// 5. 通过请求头携带token数据

import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
import store from '../vuex/store.js'
import {Toast } from 'mint-ui'
const instance = axios.create({
  baseURL:'/api',
  timeout:20000
})

instance.interceptors.request.use((config) => {
  const {method,data} = config
  if (method.toLowerCase()==='post'&&data&&typeof data ==='object') {
    config.data = qs.stringify(data)
  }
  let token = store.state.user.user.token || localStorage.getItem('token_key')
  if (token) {
    config.headers['Authorization'] = token
  }else{
    if (!router.currentRoute.path === '/login') {
      throw new Error('没有token,不发请求')
    }
  }
  return config
})
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //没有错误响应对象时
    if (!error.response) {
      Toast('没有token,请重新登录')
      if (router.currentRoute.path!=='/login') {
        router.replace('/login')
      }
    }else{
      if (error.response.status===401) {
        Toast('token过期,请重新登录')
        if (router.currentRoute.path!=='/login') {
          router.replace('/login')
        }
      }
      else if (error.response.status===404) {
        Toast('资源未找到')
      }else{
        Toast('请求出错')
      }
    }
    return new Promise(() => {})
  }
)

export default instance

