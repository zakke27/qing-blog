import Mock from 'mockjs'

// 登录
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

// 注册
Mock.mock('/user/register', {
  code: 200,
  message: '注册成功'
})

// 请求用户个人文章列表
Mock.mock('/user/article', 'get', {
  'userArticle|20': [
    { 'id|+1': 1, 'title|1': '@title', 'content|1': '@cparagraph(80,100)', 'status|0-2': 0 }
  ]
})

// 请求用户已赞文章id列表
Mock.mock('/user/likeArticle', { 'likeArticleList|100': ['@natural(1, 100)'] })

// 请求文章列表，首页可见
Mock.mock('/articleList', {
  'articleList|20': [
    // 文章列表中每一篇文章的信息
    {
      'id|+1': 1,
      'author|1': '@name',
      'avatar|1': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      'title|1': '@title',
      'content|1': '@cparagraph(100,150)',
      'likeCount|40-104': 40,
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

// 请求某篇文章详细信息，通过* id
Mock.mock(/\/article\/*/, 'get', {
  // 某一篇文章的信息
  articleInfo: {
    'author|1': '@name',
    'title|1': '@title',
    'content|1': '@cparagraph(100,150)',
    'likeCount|40-104': 40,
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

// 更新某篇文章的信息，例如点赞，评论等
Mock.mock(/\/article\/*/, 'put', {
  code: 200,
  message: '更新成功'
})
