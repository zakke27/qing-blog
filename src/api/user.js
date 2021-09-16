import request from '../utils/request'
import qs from 'qs'

export const userLogin = userInfo => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: qs.stringify(userInfo)
  })
}
export const userRegister = userInfo => {
  return request({
    url: '/user/register',
    method: 'POST',
    data: qs.stringify(userInfo)
  })
}

export const userPostByUid = uid => {
  return request({
    url: '/user/post',
    data: uid
  })
}
