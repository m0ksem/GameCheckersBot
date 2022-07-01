import packagejson from './utils/package.js'
import $ from './utils/execute.js'

const executable = 'dist/index.js'
const logs = './logs/current.log'
const name  = packagejson.name

$(`yarn pm2 start ${executable} --name ${name} --log '${logs}'`)
