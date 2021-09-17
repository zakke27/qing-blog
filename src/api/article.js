import request from '../utils/request'
// import qs from 'qs'

export const getArticleList = () => {
  return request({
    url: '/articleList',
    method: 'GET'
  })
}

export const getArticleInfoById = id => {
  return request({
    url: `/article/${id}`,
    method: 'GET'
  })
}
