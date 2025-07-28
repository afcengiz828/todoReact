import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React from 'react'

const initialState = {
    status : "",
    messages: "",
    data: [],
    loading : false,
    error: null

}

export const getAllTodo = createAsyncThunk( "gettodo" ,async () => {
    const response = await axios.get("http://localhost:8000/api/todos");
    console.log("Api çağrısı başarılı");
    return response.data;
})

export const addTodo = createAsyncThunk( "addtodo" ,async (newTodo) => {
    const response = await axios.post("http://localhost:8000/api/todos", newTodo); 

    return response;
})


export const TodoSlice = createSlice({
    name: "TodoSlice",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder
            .addCase(getAllTodo.fulfilled, (state, action) => {
                //console.log(action.payload);
                state.status = action.payload.status;
                state.messages = action.payload.messages;
                for(var i = 0; i<Object.keys(action.payload.data).length; i++)
                    state.data.push(action.payload.data[i]);

                state.loading = false;
                console.log("Api sonrası işlemler başarılı.");
            })
            .addCase(getAllTodo.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(getAllTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                //console.log(action.payload);
                
                state.data.push(action.payload.data)
                state.loading = false;
            })
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload.status;
                state.loading = false;
            })
            
    }
    
})

export default TodoSlice.reducer;