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
const TextBox = styled.p`
  float: left;
  height: 20px;
  line-height: 20px;
  margin: 0px 0px 0px 5px;
  color: #939393;
`

const Filling: React.FC = () => {
  // console.log(imgUrl)
  return (
    <FillingContainer
      target="_blank"
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011102004612"
    >
      <img
        src={imgUrl}
        css={css`
          float: left;
        `}
      />
      <TextBox>鄂公网安备 42011102004612号</TextBox>
    </FillingContainer>
  )
}

export default Filling
