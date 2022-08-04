import {MongoClient} from "mongodb";

export default async function myMongoConnect(collections){
  const client = await MongoClient.connect(process.env.DATABASE_STRING);
  const db = client.db();
  // const collectionsArr = collections.map((collection)=>{ return db.collection('routes')});
  // console.log(collectionsArr);
  let collectionsArr = {};
  collections.forEach((item)=> {
    collectionsArr[item] = db.collection(item);
  })
  // console.log(collectionsArr['routes'])
  return {
    collectionsArr,
    client
  };
}