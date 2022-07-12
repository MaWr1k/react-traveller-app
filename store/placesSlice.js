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
      let placesArr = [...action.payload];
      placesArr = placesArr.sort(function (a, b) {
        const first = a.title.toLowerCase();
        const second = b.title.toLowerCase();
        if (first > second) {
          return 1;
        }
        if (first < second) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      state.placesListDb = placesArr;
    },
    addPlaceToRoute(state,{payload}){
      state.placesInRoute.push(payload);
      state.placesListDb = state.placesListDb.filter(place => place._id !== payload._id );
    },
    removePlaceFromRoute(state,{payload}){
      state.placesListDb.push(payload);
      state.placesInRoute = state.placesInRoute.filter(place => place._id !== payload._id );
    },
    changeOrderPlaceInRoute(state, {payload}){
      const placeIndex = state.placesInRoute.findIndex((place)=>{
        return place._id === payload.place_id
      });
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