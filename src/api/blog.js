import request from '../utils/request'
// import qs from 'qs'

export const getBlogList = () => {
  return request({
    url: '/post',
    method: 'GET'
  })
}
