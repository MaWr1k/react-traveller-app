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
    checkTitle:(state)=>{
      console.log(state);
    }
  }
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;