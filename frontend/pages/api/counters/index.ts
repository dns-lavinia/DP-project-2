import { MongoClient } from "mongodb";
import { NextApiRequest , NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { counterId }= req.query;
        const { id }= req.body;

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/recipes?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

        const collection = db.collection('counters');

        const result = collection.findOneAndUpdate( 
            {_id: counterId}, 
            {$set: {id : id + 1}}
        );

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json({
            message: "Table updated!"
        })
    }

    if (req.method === 'GET') {
        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/cruce?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

        const collection = db.collection('counters');

        const result = await collection.find();

        client.close()

        res.status(200).json({
            id: result.id
        });
    }
}