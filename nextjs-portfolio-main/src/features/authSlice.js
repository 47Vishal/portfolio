import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null, // safe default
  // access_token : localStorage.getItem("access_token") || null,
}

export const AuthSlice = createSlice({
  name: 'Auth_token',
  initialState,
  reducers: {
    setUserToken : (state, action) =>{
      state.access_token = action.payload.access_token
    },
    UnsetUserToken : (state) =>{
      state.access_token = null;
    },
    },
})

// Action creators are generated for each case reducer function
export const {setUserToken, UnsetUserToken } = AuthSlice.actions

export default AuthSlice.reducer