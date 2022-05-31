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
        const { gameId } = req.query;
        const { joined, player } = req.body;
        
        const { db, client } = await connectToMongo();

        const collection = db.collection('game');

        const result = await collection.updateOne(
            {gameId: gameId, "players.id": `${joined-1}`}, 
            {$set: {
                joined: joined,
                'players.$.name': player.name,
                'players.$.photo': player.photo
            }
        })

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

        const result = await collection.deleteOne({ id: gameId });

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
