/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
// 加载
import store from '@/store'

// 创建axios对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function(config) {
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers 本次请求的配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 这里要返回config配置对象
    return config
  },
  function(error) {
    // 如果请求失败后会进入这里
    return Promise.reject(error)
  }
)

// 响应拦截器

// 导出
export default request
