import { AxiosPromise } from 'axios'
import axiosInstance from '../utils/request'

/**
 * 获取全部用户列表
 * @returns
 */
export const getUserList = (): AxiosPromise => {
  return axiosInstance({
    url: '/user/manager/selectAllUsers',
    method: 'get'
  })
}

/**
 * 根据用户id封禁用户
 * @param userid 用户id
 * @returns
 */
export const updateAccountStatusToBan = (userid: number): AxiosPromise => {
  return axiosInstance({
    url: 'user/manager/updateAccountstatusToBan',
    method: 'post',
    data: { userid }
  })
}

/**
 * 根据用户id解禁用户
 * @param userid 用户id
 * @returns
 */
export const updateAccountStatusToPass = (userid: number): AxiosPromise => {
  return axiosInstance({
    url: 'user/manager/updateAccountstatusToPass',
    method: 'post',
    data: { userid }
  })
}

/**
 * 获取所有待审核文章
 * @returns
 */
export const getArticleAudit = () => {
  return axiosInstance({
    url: '/user/manager/selectArticleByZero',
    method: 'get'
  })
}

/**
 * 获取所有已通过文章
 * @returns
 */
export const getArticlePass = () => {
  return axiosInstance({
    url: '/user/manager/selectArticleByOne',
    method: 'get'
  })
}

/**
 * 获取所有已驳回文章
 * @returns
 */
export const getArticleReject = () => {
  return axiosInstance({
    url: '/user/manager/selectArticleByTwo',
    method: 'get'
  })
}

/**
 * 重新审核文章，使其状态变为待审核
 * @param articleid 文章id
 * @returns
 */
export const auditArticle = (articleid: number) => {
  return axiosInstance({
    url: '/user/manager/updateArticleStatusToZeroByArticleid',
    method: 'post',
    data: {
      articleid
    }
  })
}

/**
 * 通过文章，使其状态变为已通过
 * @param articleid 文章id
 * @returns
 */
export const passArticle = (articleid: number) => {
  return axiosInstance({
    url: '/user/manager/updateArticleStatusToOneByArticleid',
    method: 'post',
    data: {
      articleid
    }
  })
}

/**
 * 驳回文章，使其状态变为已驳回
 * @param articleid 文章id
 * @returns
 */
export const rejectArticle = (articleid: number) => {
  return axiosInstance({
    url: '/user/manager/updateArticleStatusToTwoByArticleid',
    method: 'post',
    data: {
      articleid
    }
  })
}
