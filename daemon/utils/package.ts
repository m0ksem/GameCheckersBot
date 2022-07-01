import { readFileSync } from 'fs'
import { resolve } from 'path'

const path = resolve(process.cwd(), './package.json')
const raw = readFileSync(path, 'utf8')

export default JSON.parse(raw)