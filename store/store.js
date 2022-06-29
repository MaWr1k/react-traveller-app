import {configureStore} from "@reduxjs/toolkit";
import placeReducer from '../store/placeSlice';

export const store = configureStore({
  reducer:{
    place: placeReducer,
  }
});