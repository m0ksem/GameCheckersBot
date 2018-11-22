const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Config = require('./config')
const Bot = new Telegraf(Config.token)
const Checkers = require('./game')

function TelegramKeyboard(keyboard) {
		let tg_kb = []
		
    for (let r = 0; r < 8; r++) {
        tg_kb.push([])
        for (let c = 0; c < 8; c++) {
            tg_kb[r].push(Markup.callbackButton(keyboard[r][c], r + '' + c))
        }
		}
		
    tg_kb = Markup.inlineKeyboard(tg_kb)
    return tg_kb
}

function StartGameButton() {
    return Markup.inlineKeyboard([ Markup.callbackButton('Click to start your game!', 'STARTGAME') ])
}

Bot.on('callback_query', async (ctx) => {
	let cords = ctx.update.callback_query.data

	if (cords != 'STARTGAME') {
			let game = Checkers.FindGame(ctx.update.callback_query.inline_message_id)
			if ( Checkers.CheckPlayer(game, ctx.update.callback_query.from) ) {
					if (Checkers.Turn(game, cords)) {
						if (Checkers.CheckEndGame(game)) {
							return ctx.editMessageCaption('Game over! \n' + game.player.player.first_name + '(' + game.player.color +') is winner! \n\nAny bugs - @m0ksem')
						}
						let name = game.player.player != null ? game.player.player.first_name + ' (' + game.player.color + ')' : 'Black (🌑)'
						let info = Checkers.GetGameInfo(game)
						return ctx.editMessageCaption('Turn: ' + name + '\n\n\nWhite: ' + info[0].checkers_count + '\nBlack: ' + info[1].checkers_count, TelegramKeyboard(game.table))
					}
			}
	} else {
			return ctx.editMessageCaption('Turn: White () \n\n\nWhite: 12\nBlack: 12', TelegramKeyboard( Checkers.CreateGame(ctx.update.callback_query.inline_message_id).table ))
	}
})

Bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
	return answerInlineQuery(
		[
			{
				type: 'article',
				id: 1,
				title: 'Send table to play!',
				message_text: 'Your game is ready!',
				reply_markup: StartGameButton()
			}
		]
	)
})

Bot.startPolling();

Bot.catch((err) => {
  console.log('Error: ', err)
})
