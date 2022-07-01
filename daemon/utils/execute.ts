import { execSync } from 'child_process'

export default (command) => {
  try {
    return execSync(command, { 
      encoding: 'utf8',
      stdio: 'inherit',
    })
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}