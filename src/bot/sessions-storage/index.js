const GameSession = require('../../game-session');
const mergeDeep = require('../utils/object-merge');
const skins = require('../../skins');

const sessionStorage = {
  /**
   * @type { GameSession[] }
   * @private
   */
  sessions: [],

  /**
   * @param {Number} id
   * @returns {GameSession}
   */
  new(id) {
    const session = new GameSession(id);
    this.sessions.push(session);
    return session;
  },

  /**
   * @param {Number} id
   * @returns {GameSession}
   */
  find(id) {
    for (let i = 0; i < this.sessions.length; i += 1) {
      if (this.sessions[i].id === id) return this.sessions[i];
    }
    return null;
  },

  remove(id) {
    for (let i = 0; i < this.sessions.length; i += 1) {
      if (this.sessions[i].id === id) {
        delete this.sessions[i];
        this.sessions.splice(i, 1);
      }
    }
  },

  restoreSessions(serializedSessions) {
    const sessionObjects = serializedSessions.map((serializedSession) => {
      let session = new GameSession(serializedSession.id);
      session = mergeDeep(session, serializedSession);
      const skin = skins.find((s) => s.name === session.skin_name);
      if (skin) session.skin = skin;
      session._restoreDate = new Date();

      // Delete mongodb _id
      delete session._id;
      delete session.skin_name;

      return session;
    });
    this.sessions.push(...sessionObjects);
  },
};

const ONE_HOUR = 1000 * 60 * 60;
const FIVE_HOURS = ONE_HOUR * 5;

setInterval(() => {
  const currentTime = new Date();
  sessionStorage.sessions.forEach((session) => {
    if (currentTime - session.timeStart > FIVE_HOURS) {
      sessionStorage.remove(session.id);
    }
  });
}, ONE_HOUR);

module.exports = sessionStorage;
module.exports.GameSession = GameSession;
