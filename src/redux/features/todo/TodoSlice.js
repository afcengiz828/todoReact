import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React from 'react'

const initialState = {
    status : "",
    messages: "",
    data: [],
    loading : true,
    error: null

}

export const getAllTodo = createAsyncThunk( "gettodo" ,async () => {
    const response = await axios.get("http://localhost:8000/api/todos");
    // console.log("Api çağrısı başarılı");
    // console.log(response.data.data);
    return response.data;
})

export const addTodo = createAsyncThunk( "addtodo" , async (newTodo) => {

    console.log("addTodo içindeki json verisi");
    const response = await axios.post("http://localhost:8000/api/todos", newTodo); 
    console.log(response.data.data);
    return response.data.data;
})

export const delTodo = createAsyncThunk( "deltodo" ,async (id) => {
    const response = await axios.delete(`http://localhost:8000/api/todos/${id}`); 

    return response;
})

export const updateTodo = createAsyncThunk( "puttodo" ,async (newTodo) => {
    const response = await axios.put(`http://localhost:8000/api/todos/${newTodo.id}`, newTodo); 

    return response;
})

export const updateTodoStatus = createAsyncThunk( "deltodo" ,async (newTodo) => {
    const response = await axios.patch(`http://localhost:8000/api/todos/${newTodo.id}`, newTodo); 

    return response;
})


export const TodoSlice = createSlice({
    name: "TodoSlice",
    initialState,
    reducers:{
        updateList : (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(getAllTodo.fulfilled, (state, action) => {
                //console.log(action.payload);
                state.status = action.payload.status;
                state.messages = action.payload.messages;
               
                state.data = action.payload.data;

                state.loading = false;
                //console.log("Api sonrası işlemler başarılı.");
            })
            .addCase(getAllTodo.pending, (state) => {
                //onsole.log("pending")
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
                console.log(action.payload.status);
                state.status = action.payload.status;
                state.loading = false;
            })
            
    }
    
})

export const {  updateList } = TodoSlice.actions;


export default TodoSlice.reducer;