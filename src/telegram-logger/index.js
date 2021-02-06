/**
 * This module send logs to telegram receiverId.
 */
module.exports = class Logger {
  constructor(receiverId, telegraf) {
    this.receiverId = receiverId;
    this.telegram = telegraf.telegram;
  }

  log(text) { this.sendMessage(`[ℹ] Info\n\n${text}`); }

  error(text) { this.sendMessage(`[🔥] Error\n\n${text}`); }

  sendMessage(text) { this.telegram.sendMessage(this.receiverId, text); }
};
