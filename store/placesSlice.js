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
    }
  }
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;