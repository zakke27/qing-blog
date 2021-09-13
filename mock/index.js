import Mock from 'mockjs'

Mock.mock('/user/login', {
  code: 200,
  userInfo: {
    id: 1,
    name: 'zakke',
    age: 21,
    sex: '男',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    token: '92adji23mlfl3242342'
  }
})

Mock.mock('/user/register', {
  code: 200,
  message: '注册成功'
})

Mock.mock('/post', {
  code: 200,
  blogs: [
    {
      id: 1,
      author: 'zakke',
      title: '第1篇blog',
      content: `# 第1篇blog
  > 测试啊大大阿三大苏打`
    },
    {
      id: 2,
      author: 'jack',
      title: '第2篇blog',
      content: `# 第2篇blog
  > 临近空间容量人类进入前五；`
    },
    {
      id: 3,
      author: 'Lucy',
      title: '第3篇blog',
      content: `# 第3篇blog
  > 建立看到了；就浪费啊看；分类`
    },
    {
      id: 4,
      author: 'Jim',
      title: '第4篇blog',
      content: `# 第4篇blog
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 6,
      author: 'Jdadm',
      title: '第5篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    },
    {
      id: 7,
      author: 'zzz',
      title: '第7篇blog',
      content: `# 22222og
  > 达到垃圾啊的理解阿三打卢克的`
    }
  ]
})

// Mock.setup({
//   timeout: 3000
// })
