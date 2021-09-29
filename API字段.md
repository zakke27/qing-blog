# API 字段

## 文章表

### 根据文章id查询文章信息

```tsx
interface Article {
  articleid: number // 文章id
  userid: number //  文章作者id
  avatar: string // 文章作者头像URL
  articletitle: string // 文章标题
  articlebody: string // 文章内容
  articletag: string // 文章标签
  articlestatus: 0 | 1 | 2 // 文章状态  【0代表审核中，1代表通过，2代表不通过】
  articlehot: number // 文章热度
  articlelikecount: number // 文章点赞数
}

```

### 根据用户id查询用户名和用户昵称

```tsx
interface Name {
    username: string // 用户名
    nickname: string // 用户昵称
}
```



### 根据文章id查询文章评论

```tsx
interface Comment {
  userid: number // 评论作者id
  author: string // 评论作者用户名
  avatra: string // 评论作者头像URL
  commentcontent: string //评论内容
}
```

