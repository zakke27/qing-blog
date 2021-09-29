import { AxiosPromise } from 'axios'
import axiosInstance from '../utils/request'

// 获取全部用户列表
export const getUserList = (): AxiosPromise => {
  return axiosInstance({
    url: '/user/manager/selectAllUsers',
    method: 'get'
  })
}

// 根据用户id封禁用户
export const updateAccountStatusToBan = (userid: number): AxiosPromise => {
  return axiosInstance({
    url: 'user/manager/updateAccountstatusToBan',
    method: 'post',
    data: { userid }
  })
}

// 根据用户id解禁用户
export const updateAccountStatusToPass = (userid: number): AxiosPromise => {
  return axiosInstance({
    url: 'user/manager/updateAccountstatusToPass',
    method: 'post',
    data: { userid }
  })
}

// 展示所有待审核文章
export const getArticleAudit = () => {
  return axiosInstance({
    url: '/user/manager/selectArticleByZero',
    method: 'get'
  })
}

// 展示所有已通过文章
export const getArticlePass = () => {
  return axiosInstance({
    url: '/user/manager/selectArticleByOne',
    method: 'get'
  })
}

// 展示所有已驳回文章
export const getArticleReject = () => {
  return axiosInstance({
    url: '/user/manager/selectArticleByTwo',
    method: 'get'
  })
}
