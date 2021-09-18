import Mock from 'mockjs'

Mock.mock('/user/login', {
  code: 200,
  userInfo: {
    id: 1, // 用户id
    username: 'zakke', // 用户名
    name: 'a', // 昵称
    age: 21,
    gender: '男', // 性别
    role: 0, // 权限
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', // 用户头像地址
    introduce: '' // 个人介绍
  }
})

Mock.mock('/user/register', {
  code: 200,
  message: '注册成功'
})

Mock.mock('/user/article', {
  'userArticle|20': [
    { 'id|+1': 1, 'title|1': '@title', 'content|1': '@cparagraph(80,100)', 'status|0-2': 0 }
  ]
})

Mock.mock('/articleList', {
  'articleList|20': [
    // 文章列表中每一篇文章的信息
    {
      'id|+1': 1,
      'author|1': '@name',
      'avatar|1': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      'title|1': '@title',
      'content|1': '@cparagraph(100,150)',
      'like|40-104': 40,
      'comments|1-18': [
        {
          'userid|+1': 100,
          'author|1': '@name',
          'content|1': '@cparagraph(1, 3)',
          'replyDate|1': '@date("2021-09-dd")'
        }
      ]
    }
  ]
})

Mock.mock(/\/article\/*/, {
  // 某一篇文章的信息
  articleInfo: {
    'author|1': '@name',
    'title|1': '@title',
    'content|1': '@cparagraph(100,150)',
    'like|40-104': 40,
    'comments|5-8': [
      {
        'userId|+1': 100,
        'author|1': '@name',
        'content|1': '@cparagraph(1, 3)',
        'replyDate|1': '@date("2021-09-dd")'
      }
    ]
  }
})
