import {MongoClient} from "mongodb";

// /api/add-new-place/

export default async function handler(req, res) {
  if (req.method === 'POST'){
    const data = req.body;

    const clients = await MongoClient.connect('mongodb+srv://MaWr1k:VwU4LZ1HbcpO9sBX@cluster0.xbin73r.mongodb.net/traveller?retryWrites=true&w=majority');
    const db = clients.db();

    const travellerCollection = db.collection('places');

    const result = await travellerCollection.insertOne(data);

    console.log(result);

    clients.close();
    res.status(201).json({message:'Place added successfully'});
  }


}