const Telegraf = require('telegraf');
const Bot = require('./bot');
const Logger = require('./telegram-logger');
const config = require('./config');

const telegraf = new Telegraf(config.token);
const logger = new Logger(config.botAdmin, telegraf);

const onError = (error) => {
  if (error.message) logger.error(error.message);
  if (error.stack) logger.error(error.stack);
  if (config.env === 'development') { console.error(error); }
};

new Bot(telegraf, onError);
