import myMongoConnect from '../../components/helpers/mongo-connect';
import {ObjectId} from "mongodb";

export default async function handler(req,res){
  const data = {
      title: req.body.title,
      desc: req.body.desc,
      places: req.body.places.map(placeId=>ObjectId(placeId))
  }
  const {collectionsArr,client} = await myMongoConnect(['routes']);
  const result = await collectionsArr['routes'].insertOne(data);

  await client.close();
  res.status(201).json({message:'Route create successfully'});
}