import Mock from 'mockjs'

Mock.mock('/user/login', {
  code: 200,
  userInfo: {
    id: 1,
    name: 'zakke',
    age: 21,
    sex: '男',
    token: '92adji23mlfl3242342'
  }
})

Mock.mock('/user/register', {
  code: 200,
  message: '注册成功'
})
