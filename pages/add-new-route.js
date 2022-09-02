import React, {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";

import myMongoConnect from "../components/helpers/mongo-connect";
import ModalPortal from "../HOC/ModalPortal";
import {placesActions} from "../store/placesSlice";

import Meta from "../components/common/SEO/Meta";
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

  const [isSending, setIsSending] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);

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
    setIsSending(true);
    if(formIsCorrect){
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

      setIsSending(false);
      setIsSendSuccess(true);
      title.reset();
      desc.reset();
    }
  }

  let formContent = <form onSubmit={formHandler}>
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


  if(isSending){
    formContent = <p>Sending... </p>
  }
  if(isSendSuccess && !isSending){
    formContent = <p>Route added successfully!</p>
  }

  return (
    <Fragment>
      <Meta title='Add new route | App for Travellers' description='Add new route with places' keywords='route, places, traveller'/>

      <h1>Add new route</h1>

      {formContent}
      {isShowModal && <ModalPortal>
        <Modal onClose={onCloseHandler}>
          <PlacesModal places={placesListDb} addPlaceToRouteHandler={addPlaceToRouteHandler}/>
        </Modal>
      </ModalPortal>}
    </Fragment>
  );
};

export async function getStaticProps(){
  const {collectionsArr,client} = await myMongoConnect(['places']);
  const places = await collectionsArr['places'].find().toArray();

  client.close();

  return {
    props:{
      places:places.map((place) => {
        return {
          ...place,
          _id:place._id.toString(),
        }
      }),
    },
    revalidate: 60
  }
}

export default AddNewRoute;