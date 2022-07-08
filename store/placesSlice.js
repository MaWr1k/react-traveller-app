import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  placesListDb: [],
  placesInRoute: [],
  isShowModal: false,
};

const placesSlice = createSlice({
  name:'places',
  initialState,
  reducers:{
    toggleModal:(state)=>{
      state.isShowModal = !state.isShowModal;
    },
    insertPlacesFromDB(state, action){
      state.placesListDb = action.payload;
    },
    addPlaceToRoute(state,{payload}){
      state.placesInRoute.push(payload);
      state.placesListDb = state.placesListDb.filter(place=> place._id !== payload._id );
    },
    changeOrderPlaceInRoute(state, {payload}){
      const placeIndex = state.placesInRoute.findIndex((place)=>{
        return place._id === payload.place_id
      });
      console.log(payload.type);
      if(payload.type === 'up'){
        [state.placesInRoute[placeIndex],state.placesInRoute[placeIndex-1]] = [state.placesInRoute[placeIndex-1],state.placesInRoute[placeIndex]];
      }else if(payload.type === 'down'){
        [state.placesInRoute[placeIndex+1],state.placesInRoute[placeIndex]] = [state.placesInRoute[placeIndex],state.placesInRoute[placeIndex+1]];
      }
    }
  }
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;