import packagejson from './utils/package.js'
import $ from './utils/execute.js'

const name  = packagejson.name

// Safety delete pm2 process (ignore message if process hasn't been started)
try {
  $(`yarn pm2 stop ${name}`)
  $(`yarn pm2 delete ${name}`)
} catch (e) {
  void 0
}
