// 登录/注册参数
interface LoginParams {
  username: string // 用户名
  password: string // 用户密码
}

// 用户个人信息
interface User {
  userid: number // 用户id
  username: string // 用户名
  password: string // 用户密码
  identity: 0 | 1 // 用户身份 【0代表管理员，1代表普通用户】
  accountstatus: 0 | 1 // 用户账户状态 【0代表封禁中，1代表正常】
}

// 文章信息
interface Article {
  articleid: number // 文章id
  userid: number // 文章作者id
  username: string // 文章作者用户名
  articletitle: string // 文章标题
  articlebody: string // 文章内容
  articletag: string // 文章标签
  articlestatus: 0 | 1 | 2 // 文章状态  【0代表审核中，1代表通过，2代表不通过】
  articlehot: number // 文章热度
}

interface ArticleDetail {
  articleid: number
  userid: number
  articletitle: string
  articlebody: string
  articletag: null | string
  articlestatus: 1 // 文章状态
  articlehot: number // 文章热度
  username: string
}

// 新增文章参数
interface NewArticleParams {
  userid: number
  username: string
  articletitle: string
  articlebody: string
  articlestatus: 0
}
interface UpdateArticleParams {
  articleid: number
  articletitle: string
  articlebody: string
  articletag?: string
}

// 评论
interface Comment {
  commentid: number
  userid: number
  username: string
  articleid: number
  commentbody: string
}

interface NewComment {
  userid: number
  username: string
  articleid: number
  commentbody: string
}

interface NewFollow {
  userid: number // 用户id
  friendid: number // 被关注用户的id
  username: string // 好友的用户名
}
interface NewUnFollow {
  userid: number // 用户id
  friendid: number // 被关注用户的id
}

interface UserProfileParams {
  userid:number // 用户id
  name: string // 用户昵称
  age: number // 年龄
  sex: string // 性别
  introduction: string // 个人介绍
}

export type {
  LoginParams,
  User,
  Article,
  ArticleDetail,
  NewArticleParams,
  UpdateArticleParams,
  Comment,
  NewComment,
  NewFollow,
  NewUnFollow,
  UserProfileParams
}
