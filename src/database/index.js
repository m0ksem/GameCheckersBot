const { MongoClient } = require('mongodb');

const serializeSession = require('./serializers/game-session');
const serializeUser = require('./serializers/user');

class DataBase {
  constructor(clusterUrl, databaseName) {
    this.clusterUrl = clusterUrl;
    this.databaseName = databaseName;
  }

  connect() {
    return MongoClient.connect(this.clusterUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        this.client = client;
        this.db = client.db(this.databaseName);
      });
  }

  updateUser(user) {
    this.db.collection('users').findOne({ id: user.id }, (err, foundedUser) => {
      if (foundedUser) {
        console.log(foundedUser.games_count);
        return this.db.collection('users')
          .updateOne(
            { id: foundedUser.id },
            { $set: { games_count: foundedUser.games_count + 1 } },
          );
      }
      const userDocument = serializeUser(user);
      userDocument.join_date = new Date();
      return this.db.collection('users').insertOne(userDocument, {}, () => {});
    });
  }

  /** @returns {Promise} */
  dropGamesDatabase() {
    return this.db.collection('games').drop();
  }

  /**
   *  @param {GameSession[]} sessions
   *  @returns { Promise}
  */
  async createGamesDatabase(sessions) {
    await this.db.createCollection('games');

    const jsonSessions = sessions.map((session) => serializeSession(session));

    if (jsonSessions.length === 0) return ('No active sessions');

    const result = await this.db.collection('games').insertMany(jsonSessions);

    return `Saved ${result.insertedCount} sessions.`;
  }

  /** @param {GameSession[]} sessions */
  async saveSessions(sessions) {
    const isDropped = await this.dropGamesDatabase();
    if (!isDropped) throw new Error('Can not drop database.');

    return this.createGamesDatabase(sessions);
  }

  async getSessions() {
    return this.db.collection('games')
      .find({})
      .toArray();
  }
}

module.exports = DataBase;
