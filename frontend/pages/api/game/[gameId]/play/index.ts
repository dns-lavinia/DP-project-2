import { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongo } from 'utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { gameId } = req.query
        const { playerTurn, trick, card, turn, team1Bonus, team2Bonus, team1Cheated, team2Cheated, openingPlayer } = req.body
        
        const { collection, client } = await connectToMongo('game')

        const result = await collection.updateOne({
                gameId: gameId,
            }, {
                $set: {
                    'round.turn': (turn + 1) % 4,
                    'round.playerTurn': (playerTurn + 1) % 4,
                    ...( (turn === 3) && {
                        'round.openingPlayer': openingPlayer,
                        'round.playedCards': []
                    } ),
                    ...( (turn === 0 && trick === 1) && {'round.trump': card.suit} ),
                    ...( (team1Cheated) && {'round.team1Cheated': true} ),
                    ...( (team2Cheated) && {'round.team2Cheated': true} ),
                },
                $push: {
                    'round.playedCards': card,
                },
                $pull: {
                    [`round.playerCards.${playerTurn}`]: {suit: card.suit, value: card.value},
                },
                $inc: {
                    'round.trick': (turn === 3) ? 1 : 0,
                    'round.team1Points': team1Bonus,
                    'round.team2Points': team2Bonus,
                }
            })

        client.close()

        if (!result) {
            res.status(404)
            return
        }

        res.status(200).json({
            message: "Table updated!"
        })
    }
}