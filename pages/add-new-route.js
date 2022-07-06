import React, {Fragment} from 'react';
import {useSelector, useDispatch} from "react-redux";

import myMongoConnect from "../components/helpers/mongo-connect";
import ModalPortal from "../HOC/ModalPortal";
import {placesActions} from "../store/placesSlice";

import Modal from "../components/common/UI/Modal";
import Input from "../components/common/form/Input";
import useInput from "../hooks/use-input";



const AddNewRoute = ({places}) => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(state => state.places.isShowModal);

  const title = useInput(value => value.length > 3);



  const addPlaceHandler = () => {
    dispatch(placesActions.toggleModal());
  }
  const onCloseHandler = (e) => {

    dispatch(placesActions.toggleModal());
  }
  const formHandler = (e) => {
    e.preventDefault();

    title.reset();
  }

  let formIsCorrect = false;
  if(title.isValid){
    formIsCorrect = true;
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
        <button type='button' onClick={addPlaceHandler}> Add place </button>
        <button type='submit' disabled={!formIsCorrect}> Add new route </button>
      </form>
      {isShowModal && <ModalPortal>
        <Modal onClose={onCloseHandler}/>
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
      places:places.map((place) =>{
        return {
          ...place,
          _id:place._id.toString()
        }
      }),
    },
    revalidate: 60
  }
}

export default AddNewRoute;