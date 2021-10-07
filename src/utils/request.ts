import axios from 'axios'
import { message } from 'antd'

// 设置拦截器
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 这里使用后端的接口
  // 'http://192.168.43.161:8080',
  // 'http://192.168.1.147:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

// axios示例拦截请求
axiosInstance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('app_token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// axios示例响应请求
axiosInstance.interceptors.response.use(
  response => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else {
    //   if (response.data && response.data.token) {
    //     localStorage.setItem('app_token', response.data.token)
    //   }
    // }
    if (response.status === 200) {
      return response
    } else {
      message.info(response.status)
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
