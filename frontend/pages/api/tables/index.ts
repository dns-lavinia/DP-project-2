import { MongoClient , ObjectId} from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/cruce?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

        const collection = db.collection('tables');

        const result = await collection.find({}).toArray();

        client.close()

        res.status(200).json(result.map(table => ({
            // id: table._id.toString(),
            id: table.id,
            gameMode: table.gameMode,
            name: table.name,
            joined: table.joined,
            time: table.time,
            points: table.points,
            password: table.password,
            cheating: table.cheating,
            bigger: table.bigger
        })))
    }

    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/cruce?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

        const collection = db.collection('tables');

        const result = await collection.insertOne(data)

        client.close()

        res.status(201).json({
            message: "Table Created"
        })
    }

    if (req.method === 'PUT') {
        const { tableId }= req.query;
        const { joined }= req.body;

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
