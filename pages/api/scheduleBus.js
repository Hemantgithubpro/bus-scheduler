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
  if (req.method === 'POST') {
    const { busNumber, startTime, endTime, busStops } = req.body;
    if (!busNumber || !startTime || !endTime || busStops.length === 0) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('busSchedules');

    const newSchedule = { busNumber, startTime, endTime, busStops };
    await collection.insertOne(newSchedule);
    res.status(200).json({ message: 'Bus scheduled successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
