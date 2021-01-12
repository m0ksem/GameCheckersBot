const Telegraf = require('telegraf');
const Bot = require('./bot');
const Logger = require('./telegram-logger');
const config = require('./config');

const telegraf = new Telegraf(config.token);
const logger = new Logger(config.botAdmin, telegraf);

if (config.botAdmin) {
  try {
    new Bot(telegraf);
  } catch (error) {
    if (error.message) logger.error(error.message);
    if (error.stack) logger.error(error.stack);
  }
} else {
  new Bot(telegraf);
}
