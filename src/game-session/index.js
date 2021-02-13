const Game = require('../game');

const skins = require('../skins');
const dictionary = require('../dictionary');

const DEFAULT_LANGUAGE = 'en';
const DEFAULT_SKIN = skins[0];

module.exports = class GameSession {
  constructor(id) {
    this.private = {
      skin: DEFAULT_SKIN,
    };

    this.id = id;
    this.lang = DEFAULT_LANGUAGE;
    this.isUpdated = true;
    this.winner = null;
    this.game = new Game(DEFAULT_SKIN.symbols);

    this.timeStart = new Date();
  }

  get text() { return dictionary.text(this.lang); }

  get players() { return this.game.players; }

  set players(val) { this.game.players = val; }

  get skin() { return this.private.skin; }

  set skin(skin) {
    this.private.skin = skin;
    this.game.symbols = skin.symbols;
  }

  userClick(x, y) {
    const result = this.game.userClick(x, y);
    this.isUpdated = !result.doNotUpdate;
    if (this.game.turn.isWin) {
      this.winner = this.game.turn.enemyPlayer;
    } else if (result.key === 'lose') {
      this.winner = this.game.turn.enemyPlayer;
    }
    return result;
  }

  getErrorIfNotCurrentPlayer(name) {
    if (this.game.turn.currentPlayer.name === name) return null;

    if (this.game.turn.enemyPlayer.name === name) { return this.text.message.waitForYourTurn; }

    return this.text.message.unknownUser;
  }
};
