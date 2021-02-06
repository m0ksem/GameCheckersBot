const serializePlayer = require('./player');
const serializeGame = require('./game');

/** @param {GameSession} session */
module.exports = function serializeSession(session) {
  return {
    id: session.id,
    lang: session.lang,
    game: serializeGame(session.game),
    skin_name: session.skin.name,
    players: {
      white: serializePlayer(session.players.white),
      black: serializePlayer(session.players.black),
    },
    _serializationDate: new Date(),
  };
};
