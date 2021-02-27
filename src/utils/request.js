/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

// 创建axios对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器

// 响应拦截器

// 导出
export default request
