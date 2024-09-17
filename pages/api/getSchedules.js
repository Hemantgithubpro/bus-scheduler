import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db('busSchedulerDB');
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const db = await connectToDatabase();
    const collection = db.collection('busSchedules');

    const busSchedules = await collection.find({}).toArray();
    res.status(200).json(busSchedules);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
