import React, {Fragment, useEffect, useMemo, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
// import {ObjectId} from "mongodb";

import myMongoConnect from "../components/helpers/mongo-connect";
import ModalPortal from "../HOC/ModalPortal";
import {placesActions} from "../store/placesSlice";

import Modal from "../components/common/UI/Modal";
import Input from "../components/common/form/Input";
import useInput from "../hooks/use-input";
import PlacesModal from "../components/places/PlacesModal";
import PlacesList from "../components/places/PlacesList";


const AddNewRoute = ({places}) => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(state => state.places.isShowModal);
  const placesListDb = useSelector(state => state.places.placesListDb);
  const placesRouteList = useSelector(state => state.places.placesInRoute);
  // let placesModalList = placesList.filter((place)=>place.inRoute === 0);
  // let placesRouteList = placesList.filter((place)=>place.inRoute === 1);

  const title = useInput(value => value.trim().length > 3);
  const desc = useInput(value => value.trim().length > 20);

  useEffect(()=>{
    dispatch(placesActions.insertPlacesFromDB(places))
  },[dispatch, places]);

  const openAddingPlaceHandler = () => {
    dispatch(placesActions.toggleModal());
  }
  // MODAL PLACES CLOSE HANDLER
  const onCloseHandler = () => {
    dispatch(placesActions.toggleModal());
  }
  const addPlaceToRouteHandler = (place) => {
    dispatch(placesActions.addPlaceToRoute(place));
  }
  const removePlaceFromRouteHandler = (placeId) => {
    dispatch(placesActions.removePlaceFromRoute(placeId));
  }
  const changeOrderPlaceHandler = (place_id,type) => {
    dispatch(placesActions.changeOrderPlaceInRoute({place_id,type}));
  }

  // Checking form validation
  let formIsCorrect = false;
  if(title.isValid && desc.isValid && placesRouteList.length){
    formIsCorrect = true;
  }
  const formHandler = async (e) => {
    e.preventDefault();

    const data = {
      title: title.value,
      desc: desc.value,
      places: placesRouteList.map(place=>place._id)
    }
    const response = await fetch('/api/add-new-route',{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json',
      }
    });
    title.reset();
    desc.reset();
  }

  return (
    <Fragment>

      <h1>Add new route</h1>
      <form onSubmit={formHandler}>
        <Input
          name='route-title'
          placeholder='Title of the route'
          value={title.value}
          inputClasses={title.valueInputClasses}
          errorText='Fill the title'
          hasErrors={title.hasErrors}
          onChange={title.valueChangeHandler}
          onBlur={title.inputBlurHandler} />
        <Input
          name='route-desc'
          placeholder='Description of the route'
          value={desc.value}
          inputClasses={desc.valueInputClasses}
          errorText='Description should be more than 20 character'
          hasErrors={desc.hasErrors}
          onChange={desc.valueChangeHandler}
          onBlur={desc.inputBlurHandler} />
        <PlacesList placesRouteList={placesRouteList} changeOrderPlaceHandler={changeOrderPlaceHandler} removePlaceHandler={removePlaceFromRouteHandler}/>
        <button type='button' onClick={openAddingPlaceHandler}> Add place </button><br/>
        <button type='submit' disabled={!formIsCorrect}> Add new route </button>
      </form>
      {isShowModal && <ModalPortal>
        <Modal onClose={onCloseHandler}>
          <PlacesModal places={placesListDb} addPlaceToRouteHandler={addPlaceToRouteHandler}/>
        </Modal>
      </ModalPortal>}

    </Fragment>
  );
};

export async function getStaticProps(){
  const {collection,client} = await myMongoConnect('places');
  const places = await collection.find().toArray();

  client.close();

  return {
    props:{
      places:places.map((place) => {
        return {
          ...place,
          _id:place._id.toString(),
          inRoute: 1,
        }
      }),
    },
    revalidate: 60
  }
}

export default AddNewRoute;