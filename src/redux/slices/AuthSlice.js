import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') == 'true' || false,
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {}
}
//console.log(typeof localStorage.getItem('isLoggedIn'))

export const createAccount = createAsyncThunk('/auth/createAccount', async (data) =>
{
    try {
        const response = axiosInstance.post('/users', data)
        toast.promise(response, {
            success: (resolvedPromise) => {
                return resolvedPromise?.data?.message;
            },
            loading: 'Hold back tight, we are registering your id...',
            error: 'Ohh No!, Something went wrong. Please try again.',
        });
        const apiResponse = await response;
        return apiResponse;
    } catch (error) {
        console.log(error)
    }
})

export const login = createAsyncThunk('/auth/login', async (data) =>
    {
        try {
            const response = axiosInstance.post('/auth/login', data)
            toast.promise(response, {
                success: (resolvedPromise) => {
                    return resolvedPromise?.data?.message;
                },
                loading: 'Hold back tight, we are registering your id...',
                error: 'Ohh No!, Something went wrong. Please try again.',
            });
            const apiResponse = await response;
            return apiResponse;
        } catch (error) {
            console.log(error)
        }
})

export const logout = createAsyncThunk('/auth/logout', async () =>
    {
        try {
            const response = axiosInstance.post('/auth/logout')
            toast.promise(response, {
                success: (resolvedPromise) => {
                    return resolvedPromise?.data?.message;
                },
                loading: 'Logging Out...',
                error: 'Ohh No!, Something went wrong. Please try again.',
            });
            const apiResponse = await response;
            console.log(apiResponse);
            return apiResponse;
        } catch (error) {
            console.log(error)
        }
})

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true,
            state.role = action?.payload?.data?.data?.userRole,
            state.data = action?.payload?.data?.data?.userData,
           //console.log(action.payload);
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.data?.data?.userRole)
            localStorage.setItem('data', JSON.stringify(action?.payload?.data?.data?.userData))
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false,
            state.role = '',
            state.data = {},
            localStorage.setItem('isLoggedIn', false)
            localStorage.setItem('role', '')
            localStorage.setItem('data', JSON.stringify({}))
        })
    }
})

export default AuthSlice.reducer;