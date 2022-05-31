import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        
        const { db, client } = await connectToMongo();

        const collection = db.collection('chat');

        const result = await collection.find({}).toArray();

        client.close()

        res.status(200).json(result.map(message => ({
            name: message.name,
            message: message.message,
            time: message.time,
            image: message.image
        })))
    }

    if (req.method === 'POST') {
        const data = req.body;

        const { db, client } = await connectToMongo();

        const collection = db.collection('chat');

        const result = await collection.insertOne(data)

        client.close()

        res.status(201).json({
            message: "Message Created"
        })
    }
}
