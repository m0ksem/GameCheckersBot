import TelegrafI18n from 'telegraf-i18n'
import { Context } from 'telegraf'

export interface CustomContext extends Context {
  i18n: TelegrafI18n
}