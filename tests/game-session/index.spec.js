const GameSession = require('../../src/game-session');

describe('GameSession', () => {
  describe('checkCurrentPlayer', () => {
    const method = GameSession.prototype.checkCurrentPlayer;

    function mockThis() {
      return {
        game: {
          turn: {
            currentPlayer: { name: undefined },
            enemyPlayer: { name: undefined },
          },
        },
        text: {
          message: {
            unknownUser: 'unknownUser',
            waitForYourTurn: 'waitForYourTurn',
          },
        },
      };
    }

    it('exists', () => {
      expect(method).not.toBeUndefined();
    });

    it('User is current player', () => {
      const mock = mockThis();
      mock.game.turn.currentPlayer.name = 'Maksim';

      const result = method.call(mock, 'Maksim');
      expect(result).toBe({ result: true, error: null });
    });

    it('User is current player enemy', () => {
      const mock = mockThis();
      mock.game.turn.enemyPlayer.name = 'Maksim';

      const result = method.call(mock, 'Maksim');
      expect(result).toBe({ result: false, error: mock.text.message.waitForYourTurn });
    });

    it('User is unknown', () => {
      const mock = mockThis();
      mock.game.turn.currentPlayer.name = 'Denis';

      const result = method.call(mock, 'Maksim');
      expect(result).toBe({ result: false, error: mock.text.message.unknownUser });
    });
  });
});
