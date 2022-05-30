import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body;
    
        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/cruce?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();
    
        const collection = db.collection('game');
    
        const result = await collection.insertOne(data)
    
        client.close()
    
        res.status(201).json({
            message: "Game Created"
        })
    }
}


