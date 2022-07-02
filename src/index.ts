import 'dotenv/config'
import { createBot } from './bot'

createBot(process.env.BOT_TOKEN!).launch().then(() => console.log('Bot started'))
