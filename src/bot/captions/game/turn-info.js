function header(session) {
  const { name, kingSymbol } = session.game.turn.currentPlayer;
  return `${session.text.Turn}: ${name} (${kingSymbol})`;
}

function footer(session) {
  const { white, black } = session.players;

  const whiteRow = `${white.name}: ${white.checkersCount} (${white.checkerSymbol})`;
  const blackRow = `${black.name}: ${black.checkersCount} (${black.checkerSymbol})`;

  return [whiteRow, blackRow].join('\n');
}

module.exports = (session) => [header(session), '', footer(session)].join('\n');
