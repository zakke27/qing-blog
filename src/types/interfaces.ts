interface ArticleDetail {
  id?: number
  author: string
  avatar: string
  title: string
  content: string
  likeCount: number | 0
  comments: {
    id: number
    author: string
    content: string
    replyDate: string
  }[]
}

export type { ArticleDetail }
