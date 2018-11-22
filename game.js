var games = []

// Symbols
var picked = '☄️'
var whiteCell = '  '
var blackCell = '|||'
var whiteChecker = '🌕'
var blackChecker = '🌑'
var whiteDamk = '🌝'
var blackDamk = '🌚'

function CheckAround(game, x, y) {
  if (y + 2 < 8 && x + 2 < 8) {
    if ((game.table[y+1][x+1] == game.enemy.color || game.table[y+1][x+1] == game.enemy.damkColor) && game.table[y+2][x+2] == blackCell) {
        return true
    }
  } else if (y - 2 >= 0 && x - 2 >= 0) {
    if ((game.table[y-1][x-1] == game.enemy.color || game.table[y-1][x-1] == game.enemy.damkColor) && game.table[y-2][x-2] == blackCell) {
        return true
    }
  } else if (x - 2 >= 0 && y + 2 < 8) {
    if ((game.table[y+1][x-1] == game.enemy.color || game.table[y+1][x-1] == game.enemy.damkColor) && game.table[y+2][x-2] == blackCell) {
        return true
    }
  } else if (y - 2 >= 0 && x + 2 < 8) {
    if ((game.table[y-1][x+1] == game.enemy.color || game.table[y-1][x+1] == game.enemy.damkColor) && game.table[y-2][x+2] == blackCell) {
        return true
    }
  }

  return false
}

function CheckAroundDamk(game, x, y) {
  for (let i = 1; i + y + 1 < 8 && i + x + 1 < 8 ; i++) {
    if (game.table[i + y][i + x] != blackCell) {
      if (game.table[i + y][i + x] == game.enemy.damkColor || game.table[i + y][i + x] == game.enemy.color) {
        if (game.table[i + y + 1][i + x + 1] == blackCell) {
          return true
        }
      }

      break
    }
  }

  for (let i = 1; y - i - 1 > -1 && x - i - 1 > -1; i++) {
    if (game.table[y - i][x - i] != blackCell) {
      if (game.table[y - i][x - i] == game.enemy.damkColor || game.table[y - i][x - i] == game.enemy.color) {
        if (game.table[y - i - 1][x - i - 1] == blackCell) {
          return true
        }
      }

      break
    }
  }

  for (let i = 1; y + i + 1 < 8 && x - i - 1 > -1; i++) {
    if (game.table[y + i][x - i] != blackCell) {
      if (game.table[y + i][x - i] == game.enemy.damkColor || game.table[y + i][x - i] == game.enemy.color) {
        if (game.table[y + i + 1][x - i - 1] == blackCell) {
          return true
        }
      }

      break
    }
  }

  for (var i = 1; y - i - 1 > -1 && x + i + 1 < 8 ; i++) {
    if (game.table[y - i][x + i] != blackCell) {
      if (game.table[y - i][x + i] == game.enemy.damkColor || game.table[y - i][x + i] == game.enemy.color) {
        if (game.table[y - i - 1][x + i + 1] == blackCell) {
          return true
        }
      }

      break
    }
  }
  
  return false
}

function SwapTurns(game) {
    let temp = game.player
    game.player = game.enemy
    game.enemy = temp
    game.turn = 0 - game.turn
}

module.exports = {
  CreateGame: function (id) {
    let game = {
      id: id,
      turn: 1,  // 1 - white, -1 for black
      picked: null,
      table: [],
      player: {
          player: null,
          color: whiteChecker,
          damkColor: whiteDamk,
          checkersCount: 12
      },
      enemy: {
          player: null,
          color: blackChecker,
          damkColor: blackDamk,
          checkersCount: 12
      }
    }

    for (let r = 0; r < 8; r++) {
      game.table.push([])

      for (let c = 0; c < 8; c++) {
        if ((r + c) % 2 == 0) {
            game.table[r].push(whiteCell)
        } else {
          if (r < 3) {
              game.table[r].push(whiteChecker)
          }
          else if (r > 4) {
              game.table[r].push(blackChecker)
          }
          else {
              game.table[r].push(blackCell)
          }
        }
      }
    }

    games.push(game)

    return game
  },
  FindGame: function (id) {
    for (let index = 0; index < games.length; index++) {
        const element = games[index];
        if (element.id === id) {
            return element
        }
    }

    return none
  },
  CreateTable: function () {
    var keyboard = []

    for (let r = 0; r < 8; r++) {
        keyboard.push([])
        for (let c = 0; c < 8; c++) {
            keyboard[r].push((r + c) % 2 == 0 ? ' ' : '⬛')
        }
    }

    return keyboard
  },
  CheckPlayer: function (game, player) {
    if (game.player.player == null) {
        game.player.player = player
        return true
    } else if (game.player.player.id == player.id) {
        return true
    }

    return false
  },
  CheckEndGame: function (game) {
    if (game.player.checkersCount == 0) {
      SwapTurns(game)
      return true
    }

    return false
  },
  Turn: function (game, pickedCords) {
    let pickedX = parseInt(pickedCords[1])
    let pickedY = parseInt(pickedCords[0])
    if ((pickedX + pickedY) % 2 == 0) {
        return false
    } else {
        if (game.table[pickedY][pickedX] == game.player.color || game.table[pickedY][pickedX] == game.player.damkColor) {
          if (game.picked != null) game.table[game.picked.y][game.picked.x] = game.picked.color
          game.picked = {
              x: pickedX,
              y: pickedY,
              color: game.table[pickedY][pickedX]
          }

          game.table[pickedY][pickedX] = picked

          return true
        } else {
          let CheckersMustBeat = false

          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
              if (game.table[r][c] == game.player.color || (game.table[r][c] == picked && game.picked.color == game.player.color)) {
                if ( CheckAround(game, c, r) ) {
                  CheckersMustBeat = true

                  if (game.picked.x - pickedX == 2 && pickedY - game.picked.y == 2) {
                    if (game.table[pickedY][pickedX] == blackCell) {
                      if (game.table[pickedY - 1][pickedX + 1] == game.enemy.color || game.table[pickedY - 1][pickedX + 1] == game.enemy.damkColor) {
                        game.enemy.checkersCount--
                        game.table[pickedY - 1][pickedX + 1] = blackCell
                        game.table[game.picked.y][game.picked.x] = blackCell

                        if (pickedY === (7 / 2) * (1 + game.turn)) {
                          game.picked.color = game.player.damkColor
                        }

                        if (!CheckAround(game, pickedX, pickedY)) {
                          game.table[pickedY][pickedX] = game.picked.color
                          SwapTurns(game)
                          game.picked = null
                        } else {
                          game.table[pickedY][pickedX] = picked
                          game.picked = {
                            x: pickedX,
                            y: pickedY,
                            color: game.picked.color
                          }
                        }

                        return true
                      }
                    }

                    return false
                  }
                  else if (game.picked.x - pickedX == -2 && pickedY - game.picked.y == 2) {
                    if (game.table[pickedY][pickedX] == blackCell) {
                      if (game.table[pickedY - 1][pickedX - 1] == game.enemy.color || game.table[pickedY - 1][pickedX - 1] == game.enemy.damkColor) {
                        game.enemy.checkersCount--
                        game.table[pickedY - 1][pickedX - 1] = blackCell
                        game.table[game.picked.y][game.picked.x] = blackCell
                        
                        if (pickedY === (7 / 2) * (1 + game.turn)) {
                          game.picked.color = game.player.damkColor
                        }

                        if (!CheckAround(game, pickedX, pickedY)) {
                            game.table[pickedY][pickedX] = game.picked.color
                            SwapTurns(game)
                            game.picked = null
                        } else {
                          game.table[pickedY][pickedX] = picked
                          game.picked = {
                              x: pickedX,
                              y: pickedY,
                              color: game.picked.color
                          }
                        }

                        return true
                      }
                    }

                    return false
                  }
                  else if (game.picked.x - pickedX == 2 && pickedY - game.picked.y == -2) {
                    if (game.table[pickedY][pickedX] == blackCell) {
                      if (game.table[pickedY + 1][pickedX + 1] == game.enemy.color || game.table[pickedY + 1][pickedX + 1] == game.enemy.damkColor) {
                          game.enemy.checkersCount--
                          game.table[pickedY + 1][pickedX + 1] = blackCell
                          game.table[game.picked.y][game.picked.x] = blackCell

                          if (pickedY === (7 / 2) * (1 + game.turn)) {
                            game.picked.color = game.player.damkColor
                          }

                          if (!CheckAround(game, pickedX, pickedY)) {
                              game.table[pickedY][pickedX] = game.picked.color
                              SwapTurns(game)
                              game.picked = null
                          } else {
                            game.table[pickedY][pickedX] = picked
                            game.picked = {
                                x: pickedX,
                                y: pickedY,
                                color: game.picked.color
                            }
                          }

                          return true
                      }
                    }

                    return false
                  }
                  else if (game.picked.x - pickedX == -2 && pickedY - game.picked.y == -2) {
                    if (game.table[pickedY][pickedX] == blackCell) {
                      if (game.table[pickedY + 1][pickedX - 1] == game.enemy.color || game.table[pickedY + 1][pickedX - 1] == game.enemy.damkColor) {
                          game.enemy.checkersCount--
                          game.table[pickedY + 1][pickedX - 1] = blackCell
                          game.table[game.picked.y][game.picked.x] = blackCell

                          if (pickedY === (7 / 2) * (1 + game.turn)) {
                            game.picked.color = game.player.damkColor
                          }

                          if (!CheckAround(game, pickedX, pickedY)) {
                              game.table[pickedY][pickedX] = game.picked.color
                              SwapTurns(game)
                              game.picked = null
                          } else {
                            game.table[pickedY][pickedX] = picked
                            game.picked = {
                                x: pickedX,
                                y: pickedY,
                                color: game.picked.color
                            }
                          }

                          return true
                      }
                    }

                    return false
                  }
                }
              }
              else if (game.table[r][c] == game.player.damkColor || (game.table[r][c] == picked && game.picked.color == game.player.damkColor)) {
                if (CheckAroundDamk(game, c, r)) {
                  CheckersMustBeat = true
                  if (Math.abs(pickedX - game.picked.x) == Math.abs(pickedY - game.picked.y)) {
                    let xSymbol = pickedX - game.picked.x
                    xSymbol = xSymbol / Math.abs(xSymbol)
                    let ySymbol = pickedY - game.picked.y
                    ySymbol = ySymbol / Math.abs(ySymbol)
                    for (let i = 1; i < Math.abs(pickedX - game.picked.x); i++) {
                      if (game.table[ySymbol * i + game.picked.y][xSymbol * i + game.picked.x] != blackCell) {
                        if (game.table[ySymbol * i + game.picked.y][xSymbol * i + game.picked.x] == game.enemy.color ||
                            game.table[ySymbol * i + game.picked.y][xSymbol * i + game.picked.x] == game.enemy.damkColor) {
                          if (game.table[ySymbol * (i + 1) + game.picked.y][xSymbol * (i + 1) + game.picked.x] == blackCell) {
                            game.enemy.checkersCount--
                            game.table[ySymbol * i + game.picked.y][xSymbol * i + game.picked.x] = blackCell
                            game.table[game.picked.y][game.picked.x] = blackCell

                            if (!CheckAround(game, pickedX, pickedY)) {
                                game.table[pickedY][pickedX] = game.player.damkColor
                                SwapTurns(game)
                                game.picked = null
                            } else {
                              game.table[pickedY][pickedX] = picked
                              game.picked = {
                                  x: pickedX,
                                  y: pickedY,
                                  color: game.picked.color
                              }
                            }

                            return true
                          }
                        }
                      }
                    }

                    return false
                  }
                }
              }
            }
          }
          if (!CheckersMustBeat && Math.abs(game.picked.x - pickedX) == 1 && pickedY - game.picked.y == game.turn) {
            if (game.table[pickedY][pickedX] == blackCell) {
              game.table[game.picked.y][game.picked.x] = blackCell

              if (pickedY === (7 / 2) * (1 + game.turn)) {
                game.table[pickedY][pickedX] = game.player.damkColor
              } else {
                game.table[pickedY][pickedX] = game.picked.color
              }

              SwapTurns(game)
              game.picked = null

              return true
            }

            return false
          } else if (!CheckersMustBeat && game.picked.color == game.player.damkColor && Math.abs(pickedX - game.picked.x) == Math.abs(pickedY - game.picked.y)) {
            let xSymbol = pickedX - game.picked.x
            xSymbol = xSymbol / Math.abs(xSymbol)
            let ySymbol = pickedY - game.picked.y
            ySymbol = ySymbol / Math.abs(ySymbol)

            for (let i = 1; i < Math.abs(pickedX - game.picked.x); i++) {
              if (game.table[ySymbol * i + game.picked.y][xSymbol * i + game.picked.x] != blackCell) {
                return false
              }
            }

            game.table[game.picked.y][game.picked.x] = blackCell
            game.table[pickedY][pickedX] = game.picked.color
            SwapTurns(game)
            game.picked = null
            
            return true
          }

        return false
      }
    }
  },
  GetGameInfo: function (game) {
    if (game.turn == 1) {
      return [game.player, game.enemy]
    }
    else {
      return [game.enemy, game.player]
    }
  }
}
