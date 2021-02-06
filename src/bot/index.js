const DataBase = require('../database');
const sessionStorage = require('./sessions-storage');
const config = require('../config');

const onStartListener = require('./listeners/on-start');
const onHelpListener = require('./listeners/on-help');
const onInlineQueryListener = require('./listeners/on-inline-query');
const onCallbackQueryListener = require('./listeners/on-callback-query');
const onExportToJson = require('./listeners/on-export-to-json');
const onSaveToDatabase = require('./listeners/on-save-to-database');

module.exports = class Bot {
  constructor(telegraf, onError) {
    this.bot = telegraf;

    const db = new DataBase(config.mongodb.url, config.mongodb.database);
    db.connect().then(() => {
      db.getSessions().then((sessions) => {
        sessionStorage.restoreSessions(sessions);
        this.bot.startPolling();
        console.log('Bot started');
      });
    });

    this.bot.on('inline_query', onInlineQueryListener);
    this.bot.on('callback_query', onCallbackQueryListener);

    this.bot.command('start', onStartListener);
    this.bot.command('help', onHelpListener);
    this.bot.command('export_to_json', onExportToJson);
    this.bot.command('save_sessions_to_databases', (ctx) => onSaveToDatabase(ctx, db));

    if (onError) {
      this.bot.catch(onError);
    }
  }
};
