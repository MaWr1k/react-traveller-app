import React from 'react';

import classes from './PlacesModal.module.css';

const PlacesModal = ({places, addPlaceToRouteHandler}) => {

  let content = <p>No places</p>;
  if(places.length){
    content = <ul className={classes['places-list']}>
      {places.map((place)=>{
        return <li key={place._id} onClick={addPlaceToRouteHandler.bind(null,place)}>{place.title}</li>
      })}
    </ul>;
  }

  return content;
};

export default PlacesModal;