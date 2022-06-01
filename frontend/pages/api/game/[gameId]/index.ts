import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { gameId } = req.query;

        const { db, client } = await connectToMongo();

        const collection = db.collection('game');

        const result = await collection.findOne({ gameId: gameId });

        client.close()

        if (!result) {
            res.status(404);
            return;
        }
        
        res.status(200).json(result)
    }

    if (req.method === 'PUT') {
        const { gameId, method } = req.query;
        const { joined, player } = req.body;

        console.log(method)
        
        const { db, client } = await connectToMongo();

        const collection = db.collection('game');

        const result = await collection.updateOne(
            {gameId: gameId}, 
            {
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

    if (req.method === 'DELETE') {
        const { gameId } = req.query;

        const { db, client } = await connectToMongo();

        const collection = db.collection('game');

        const result = await collection.deleteOne({ gameId: gameId });

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json({
            message: 'Table deleted successfully'
        })
    }
}
