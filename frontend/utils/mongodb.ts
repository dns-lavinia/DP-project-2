import { MongoClient } from "mongodb";

export async function connectToMongo() {
    const client = await MongoClient.connect(
        'mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/cruce?retryWrites=true&w=majority'
    );

    return {
        db: client.db(),
        client
    };
}