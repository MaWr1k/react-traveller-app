
import myMongoConnect from "../components/helpers/mongo-connect";
import Meta from "../components/common/SEO/Meta";

export default function Home({routes}) {
  console.log(routes)
  return (
    <div>
      <Meta/>
      <h1>Our routes</h1>
      {routes.map((route=>{
        return (<div key={route._id}>
          <h2>{route.title}</h2>
          <h3>Places</h3>
          <ul>
            {route.places.map(place => {
              return (<li key={place.placeId}>{place.title}</li>)
            })}
          </ul>
        </div>)
      }))}
    </div>
  )
}

export async function getStaticProps(){
  const {collectionsArr, client} = await myMongoConnect(['routes']);
  let routesCollection;
try{
  routesCollection = await collectionsArr['routes'].aggregate([
    {
      '$lookup': {from: "places", localField: "places", foreignField: '_id', as: "places"}
    }
  ]).toArray();
}catch (e){
  console.log('error - ', e);
}
  await client.close();
  const routesArr = routesCollection.map(route => {
    return {
      _id: route._id.toString(),
      title: route.title,
      places: route.places.map( place => {
        return {
          placeId: place._id.toString(),
          title: place.title,
        }
      }),

    }
  })
  console.log(routesArr)

  return {
    props:{
      routes:routesArr,
    },
    revalidate: 60
  }
}