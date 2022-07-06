import {MongoClient} from "mongodb";

export default async function myMongoConnect(collection){
  const client = await MongoClient.connect('mongodb+srv://MaWr1k:VwU4LZ1HbcpO9sBX@cluster0.xbin73r.mongodb.net/traveller?retryWrites=true&w=majority');
  const db = client.db();
  return {
    collection:db.collection(collection),
    client
  };
}