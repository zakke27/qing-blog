import React from 'react'
import './NotFound.scss'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  let history = useHistory()
  const goBackHome = () => {
    history.push('/')
  }
  return (
    <div className="notfound">
      <div>
        <h1>404</h1>
        <Button size="large" type="default" onClick={goBackHome}>
          回到首页
        </Button>
      </div>
    </div>
  )
}

export default NotFound
