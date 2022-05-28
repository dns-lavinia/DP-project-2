import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { gameId } = req.query;

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/recipes?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

        const collection = db.collection('game');

        const result = await collection.findOne({ _id: new ObjectId(gameId as string) });

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json({
            deck: result.deck,
            tromf: result.tromf,
            team1Score: result.team1Score,
            team2Score: result.team2Score,
            team1Points: result.team1Points,
            team2Points: result.team2Points,
            pointsChosen: result.pointsChosen,
            teamPoints: result.teamPoints,
            gameRules: result.gameRules,
            team1Cheated: result.team1Cheated,
            team2Cheated: result.team2Cheated,
            hand: result.hand
        })
    }

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

    if (req.method === 'PUT') {
        const { gameId }= req.query;
        const { 
            deck, 
            tromf, 
            team1Score, 
            team2Score, 
            team1Points, 
            team2Points, 
            pointsChosen, 
            teamPoints, 
            team1Cheated, 
            team2Cheated, 
            hand}= req.body;

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/recipes?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );

        const db = client.db();

        const collection = db.collection('game');

        const result = await collection.findOneAndUpdate({_id: gameId}, {$set: {
            deck : deck, 
            tromf : tromf, 
            team1Score : team1Score, 
            team2Score : team2Score, 
            team1Points : team1Points, 
            team2Points : team2Points, 
            pointsChosen : pointsChosen, 
            teamPoints : teamPoints, 
            team1Cheated : team1Cheated, 
            team2Cheated : team2Cheated, 
            hand : hand
        }})

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

        const client = await MongoClient.connect(
            // 'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/recipes?retryWrites=true&w=majority'
            'mongodb+srv://eliza14:fuckoff01@cluster0.k4ojk.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db();

        const collection = db.collection('game');

        const result = await collection.deleteOne({ _id: new ObjectId(gameId as string) });

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
