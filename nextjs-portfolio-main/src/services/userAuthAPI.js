// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthAPI = createApi({
    reducerPath: 'userAuthAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (MyUser) => {
                return {
                    url: 'register/',
                    method: 'POST',
                    body: MyUser,
                    headers: { 'Content-type': 'application/json', }
                }
            }
        }),
        UserLogIn: builder.mutation({
            query: (MyUser) => {
                return {
                    url: 'SignIn/',
                    method: 'POST',
                    body: MyUser,
                    headers: { 'Content-type': 'application/json', }
                }
            }
        }),

        GetLoggedUser: builder.query({
            query: (access_token) => {
                return {
                    url: 'profile/',
                    method: 'GET',
                    headers: { authorization: `Bearer ${access_token}`, }
                }
            }
        }),
        ChangeUserPassword: builder.mutation({
            query: ({ actualPinChangeData, access_token }) => {
                return {
                    url: 'change_password/',
                    method: 'POST',
                    body: actualPinChangeData,
                    headers: {
                        'Content-type': 'application/json',
                        authorization: `Bearer ${access_token}`,
                    }
                }
            }
        }),
        SendEmailLinkUserPassword: builder.mutation({
            query: (MyUser) => {
                return {
                    url: 'ResetLink_Pin/',
                    method: 'POST',
                    body: MyUser,
                    headers: { 'Content-type': 'application/json', }
                }
            }
        }),
        ResetUserPassword: builder.mutation({
            query: ({ actualData, uid, token }) => {
                console.log('create User data')
                return {
                    url: `/reset/${uid}/${token}/`,
                    method: 'POST',
                    body: actualData,
                    headers: { 'Content-type': 'application/json', }
                }
            }
        }),

        UserLogOut: builder.mutation({
            query: ({ refreshToken, accessToken }) => ({
                url: 'logout/',
                method: 'POST',
                body: { refresh_token: refreshToken },
                headers: { 'Content-type': 'application/json' , authorization: `Bearer ${accessToken}` },
                // ...(accessToken && { authorization: `Bearer ${accessToken}` }),
            }),
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useUserLogInMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation, useSendEmailLinkUserPasswordMutation, useResetUserPasswordMutation, useUserLogOutMutation } = userAuthAPI