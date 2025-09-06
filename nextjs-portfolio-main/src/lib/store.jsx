"use client";
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthAPI } from '../services/userAuthAPI'
import AuthSlice from '../features/authSlice'
import user_info_Slice from '../features/userSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    auth : AuthSlice,
    user : user_info_Slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthAPI.middleware),
})


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)