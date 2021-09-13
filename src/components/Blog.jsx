import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useLocation } from 'react-router-dom'

const Blog = () => {
  let location = useLocation()
  const { title, author, content } = location.state
  return (
    <div>
      <h2>{title}</h2>
      <div>作者：{author}</div>
      <MDEditor.Markdown source={content} />
    </div>
  )
}

export default Blog
