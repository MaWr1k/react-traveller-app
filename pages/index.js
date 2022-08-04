
import myMongoConnect from "../components/helpers/mongo-connect";
import Meta from "../components/common/SEO/Meta";

export default function Home({routes}) {
  // console.log(routes)
  return (
    <div>
      <Meta/>
      <h1>Home page</h1>
    </div>
  )
}

export async function getStaticProps(){


  const {collectionsArr,client} = await myMongoConnect(['routes','places']);

  const routes = await collectionsArr['routes'].find({});
  const placesCollection = await collectionsArr['places'];
  // let testVar = '';
  let testVar =  await routes.forEach(route => {
    console.log(route);
    // let places = await placesCollection.find({});

  });
  // routes
  // console.log(testVar);
  // const placeTest = await collectionsArr['places'].find({_id:ObjectId("62ea4310c8a0d7c6cada0851")}).toArray();
  // console.log('Test place - ',placeTest)
  // console.log(routes);

  // const routesArr =  routes.map((route) =>{
  //   return {
  //     _id:route._id.toString(),
  //     title:route.title,
  //     desc:route.desc,
  //     places: route.places.map( place => {
  //       return place.toString();
  //     })
  //
  //   }
  // })
  const routesArr = [];
  // console.log(routesArr);

  await client.close();

  return {
    props:{
      routes:routesArr,
    },
    revalidate: 60
  }
}