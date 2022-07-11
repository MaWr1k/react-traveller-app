import React,{Fragment} from 'react';

const PlacesList = ({placesRouteList,changeOrderPlaceHandler,removePlaceHandler}) => {
  if(placesRouteList.length === 0){
    return '';
  }
  return (
      <Fragment>
        <h2>Places list</h2>
        <ul>
          {placesRouteList.map((place,index)=>{
            let up = '';
            let down = '';
            if(index){
              up = <button type='button' onClick={changeOrderPlaceHandler.bind(null,place._id,'up')}>Up</button>;
            }
            if(index + 1 !== placesRouteList.length){
              down = <button type='button' onClick={changeOrderPlaceHandler.bind(null,place._id,'down')}>Down</button>;
            }
            return <li key={place._id}>
              {place.title}
              <div>
                {up}
                {down}
                <button type='button' onClick={removePlaceHandler.bind(null, place)}>Remove</button>
              </div>
            </li>
          })
          }
        </ul>
      </Fragment>
  );
};

export default PlacesList;