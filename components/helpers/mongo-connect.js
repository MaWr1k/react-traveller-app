import {MongoClient} from "mongodb";

export default async function myMongoConnect(collections){
  const client = await MongoClient.connect(process.env.DATABASE_STRING);
  const db = await client.db();
  let collectionsArr = {};
  for (const item of collections) {
    collectionsArr[item] = await db.collection(item);
  }
  return {
    collectionsArr,
    client
  };
}