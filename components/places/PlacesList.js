import React,{Fragment} from 'react';

const PlacesList = ({placesRouteList,changeOrderPlaceHandler}) => {
  if(placesRouteList.length === 0){
    return '';
  }
  return (
      <Fragment>
        <h2>Places list</h2>
        <ul>
          {placesRouteList.map((place)=>{
            return <li key={place._id}>
              {place.title}
              <div>
                <button type='button' onClick={changeOrderPlaceHandler.bind(null,place._id,'up')}>Up</button>
                <button type='button' onClick={changeOrderPlaceHandler.bind(null,place._id,'down')}>Down</button>
              </div>
            </li>
          })
          }
        </ul>
      </Fragment>
  );
};

export default PlacesList;