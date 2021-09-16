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

Mock.mock('/user/post', [
  // 0审核，1通过，2不通过
  { id: 1, title: '第一篇文章', content: `# hello world1`, status: 0 },
  { id: 2, title: '第二篇文章', content: `# hello world2`, status: 1 },
  { id: 3, title: '第三篇文章', content: `# hello world3`, status: 2 },
  { id: 4, title: '第四篇文章', content: `# hello world4`, status: 2 },
  { id: 5, title: '第五篇文章', content: `# hello world5`, status: 1 },
  { id: 6, title: '第六篇文章', content: `# hello world6`, status: 1 },
  { id: 7, title: '第七篇文章', content: `# hello world7`, status: 0 }
])

Mock.mock('/post', {
  'articles|1000': [
    {
      'id|+1': 1,
      'author|1': '@name',
      'title|1': '@title',
      'content|1': '@cparagraph'
    }
  ]
})

// Mock.setup({
//   timeout: 3000
// })
