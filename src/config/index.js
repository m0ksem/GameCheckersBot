require('dotenv').config();

const env = process.argv[2] || process.env.NODE_ENV || 'development';

console.log(`Running in ${env} env.`);

module.exports = {
  env,
  token: process.env.BOT_TOKEN,
  botAdmin: process.env.BOT_ADMIN_ID,
  mongodb: {
    url: process.env.MONGO_DB_URL,
    database: process.env.MONGO_DB_DATABASE,
  },
  // Use this in development mode for testing
  allowSamePlayer: JSON.parse(process.env.BOT_ALLOW_SAME_PLAYER || 'false'),
};
