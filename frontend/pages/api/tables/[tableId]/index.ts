import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { tableId } = req.query;

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/recipes?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

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
        const { tableId }= req.query;
        const { joined }= req.body;

        console.log("update", joined);

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/recipes?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );

        const db = client.db();

        const collection = db.collection('tables');

        const result = await collection.findOneAndUpdate({id: tableId}, {$set: {joined : joined}})

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

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/recipes?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

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