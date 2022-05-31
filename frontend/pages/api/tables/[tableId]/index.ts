import { table } from 'console';
import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { tableId } = req.query;

        const { db, client } = await connectToMongo();

        const collection = db.collection('tables');
        
        const result = await collection.findOne({ id: tableId });

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json({
            id: result.id,
            gameMode: result.gameMode,
            name: result.name,
            joined: result.joined,
            time: result.time,
            points: result.points,
            password: result.password,
            cheating: result.cheating,
            bigger: result.bigger
        })
    }

    if (req.method === 'PUT') {
        const { tableId } = req.query;
        const { joined } = req.body;

        console.log("update", joined, tableId);

        const { db, client } = await connectToMongo();

        const collection = db.collection('tables');

        const result = await collection.updateOne({id: tableId}, {$set: {joined : joined}})

        console.log(result);

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
        const { tableId } = req.query;

        console.log("delete", tableId);

        const { db, client } = await connectToMongo();

        const collection = db.collection('tables');

        const result = await collection.deleteOne({ id: tableId });

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
