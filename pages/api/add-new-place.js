import myMongoConnect from "../../components/helpers/mongo-connect";

// /api/add-new-place/

export default async function handler(req, res) {
  if (req.method === 'POST'){
    const data = req.body;

    const {collectionsArr, client} = await myMongoConnect(['places']);
    const result = await collectionsArr['places'].insertOne(data);

    await client.close();
    res.status(201).json({message:'Place added successfully'});
  }
}