/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import imgUrl from '../../assets/beian.png'

const FillingContainer = styled.a`
  display: inline-block;
  text-decoration: none;
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  background-color: #f0f2f5;
`
const TextBox = styled.a`
  float: left;
  height: 20px;
  line-height: 20px;
  margin: 0px 0px 0px 5px;
  color: #939393;
  font-size: 15px;
  border: 1px solid red;
  border-radius: 50%;
  &:hover {
    color: #1890ff;
  }
`

const Filling: React.FC = () => {
  // console.log(imgUrl)
  return (
    <FillingContainer target="_blank" href="https://beian.miit.gov.cn/">
      <img
        src={imgUrl}
        css={css`
          float: left;
        `}
      />
      <TextBox>鄂ICP备2021016708号-1</TextBox>
    </FillingContainer>
  )
}

export default Filling
