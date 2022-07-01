import { Telegraf } from 'telegraf'
import { CustomContext } from './types'
import i18n from './i18n'

export const createBot = (token: string) => {
  const app = new Telegraf<CustomContext>(token)

  app.use(i18n.middleware())

  app.start((ctx) => {
    ctx.reply(ctx.i18n.t('hello', {
      name: ctx.from.username
    }))
  })

  return app
}