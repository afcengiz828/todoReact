import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React from 'react'

const initialState = {
    status: "",
    messages: "",
    data: [],
    loading: true,
    error: null

}

export const getUsers = createAsyncThunk("getusers", async () => {

    // localStorage'dan token'ı al
    const token = localStorage.getItem('token');

    if (!token) {
        return rejectWithValue('Token bulunamadı, lütfen giriş yapın');
    }

    const response = await axios.get("http://localhost:8000/api/user", {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    console.log(response);
    return response;
})

export const addUsers = createAsyncThunk("addusers", async (user) => {
    console.log(user);
    const response = await axios.post("http://localhost:8000/api/user", user);
    console.log(response);
    return response;
})

export const delUsers = createAsyncThunk("delusers", async (user) => {
    const response = await axios.delete(`http://localhost:8000/api/user/${user}`);
    console.log(response);
    return response;
})

export const updateUsers = createAsyncThunk("updusers", async (user) => {

    // localStorage'dan token'ı al
    const token = localStorage.getItem('token');

    if (!token) {
        return rejectWithValue('Token bulunamadı, lütfen giriş yapın');
    }

    const response = await axios.put(`http://localhost:8000/api/user/${user[0]}`, user[1] , {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    return response;
})

export const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data = action.payload
            })
            .addCase(getUsers.pending, (state, action) => {
                
            })
            .addCase(getUsers.rejected, (state, action) => {
                
            })
            .addCase(addUsers.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data.push(action.payload.data.user);
            })
            .addCase(addUsers.pending, (state, action) => {
                
            })
            .addCase(addUsers.rejected, (state, action) => {
                
            })
            .addCase(delUsers.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data.remove(u => u.id == action.payload.id);
            })
    }

})



export default UserSlice.reducer;