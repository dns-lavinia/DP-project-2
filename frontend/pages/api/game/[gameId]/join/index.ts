import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { gameId } = req.query;
        const { joined, player } = req.body;

        const { collection, client } = await connectToMongo('game');

        const result = await collection.updateOne(
            {
                gameId: gameId
            }, {
                $set: {
                    joined: joined
                },
                $push: {
                    players: player
                }
            }
        )

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json({
            message: "Table updated!"
        })
    }
}