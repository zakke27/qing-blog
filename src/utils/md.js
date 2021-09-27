import fs from 'fs'
import path from 'path'
// const fs = require('fs')
import process from 'process'
// const path = require('path')

const mdDirectory = path.join(process.cwd(), 'article')

export default function getMd() {
  console.log(mdDirectory)

  const fileNames = fs.readdirSync(mdDirectory)
  console.log(fileNames[0])

  const fullPath = path.join(mdDirectory, fileNames[0])
  console.log(fullPath)

  const fileContent = fs.readFileSync(fullPath)
  console.log(fileContent)
}
