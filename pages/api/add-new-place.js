import myMongoConnect from "../../components/helpers/mongo-connect";

// /api/add-new-place/

export default async function handler(req, res) {
  if (req.method === 'POST'){
    const data = req.body;

    const {collection, clients} = await myMongoConnect('places');
    const result = await collection.insertOne(data);

    console.log(result);
    clients.close();
    res.status(201).json({message:'Place added successfully'});
  }
}