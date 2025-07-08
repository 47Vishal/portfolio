import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email : '',
  First_name : '',
  Last_Name : '',
}

export const user_info_Slice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo : (state, action) =>{
        state.email = action.payload.email
        state.First_name = action.payload.First_name
        state.Last_Name = action.payload.Last_Name
    },
    UnsetUserInfo : (state ) =>{
        state.email = '';
        state.First_name = '';
        state.Last_Name = '';
    },
    },
})

// Action creators are generated for each case reducer function
export const {setUserInfo, UnsetUserInfo } = user_info_Slice.actions

export default user_info_Slice.reducer