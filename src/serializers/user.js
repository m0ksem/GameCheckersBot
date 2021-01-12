module.exports = function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    second_name: user.second_name,
    language_code: user.language_code,
    games_count: 1,
  };
};
