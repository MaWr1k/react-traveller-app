import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  fields:{
    title:{
      value:'',
      isCorrect: false,
      isEdited: false,
    },
    address:{
      value:'',
      isCorrect: false,
      isEdited: false,
    },
    image:{
      value:'',
      isCorrect: false,
      isEdited: false,
    },
    desc:{
      value:'',
      isCorrect: false,
      isEdited: false,
    }
  }
};

const placeSlice = createSlice({
  name:'place',
  initialState,
  reducers:{
    checkTitle:(state)=>{
      console.log(state);
    }
  }
});

export const placeActions = placeSlice.actions;
export default placeSlice.reducer;