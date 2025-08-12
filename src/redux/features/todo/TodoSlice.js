import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React from 'react'
import { delFiltered } from './FilteredSlice';
import { useDispatch } from 'react-redux';

const initialState = {
    status: "",
    messages: "",
    data: [],
    dataCount: 0,
    loading: true,
    error: null

}

export const getAllTodo = createAsyncThunk("gettodo", async (url) => {

    const response = await axios.get('http://localhost:8000/api/todos');
    return response.data;
})

export const addTodo = createAsyncThunk("addtodo", async (newTodo) => {

    console.log("addTodo içindeki json verisi");
    console.log(newTodo);
    const response = await axios.post("http://localhost:8000/api/todos", newTodo);
    console.log(response.data);
    return response.data;
})

export const delTodo = createAsyncThunk("deltodo", async (id) => {
    const response = await axios.delete(`http://localhost:8000/api/todos/${id}`);

    return response;
})

export const updateTodo = createAsyncThunk("puttodo", async (newTodo) => {
    const response = await axios.put(`http://localhost:8000/api/todos/${newTodo.id}`, newTodo);

    return response;
})

export const updateTodoStatus = createAsyncThunk("updatetodostatus", async (data) => {
    console.log(data);
    const response = await axios.patch(`http://localhost:8000/api/todos/${data.idObj.id}`, data.dataObj);
    console.log("Response");
    console.log(response);
    return response;
})


export const TodoSlice = createSlice({
    name: "TodoSlice",
    initialState,
    reducers: {
        updateList: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodo.fulfilled, (state, action) => {
                state.status = action.payload.status;
                state.messages = action.payload.messages;

                state.data = action.payload.data;
                state.dataCount = action.payload.count;

                state.loading = false;
            })
            .addCase(getAllTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(getAllTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload != undefined) {
                    state.data.push(action.payload.data)
                    state.loading = false;
                } else {
                    console.log("Undefined veri yakalandı");
                    state.loading = false;

                }
            })
            .addCase(addTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload;
                state.loading = false;
            })
            .addCase(delTodo.fulfilled, (state, action) => {

                //console.log(action.payload);
                if (action.payload != undefined && action.payload.data.status == "succes") {
                    const deletedTodo = action.payload.data.data;
                    state.data = state.data.filter(todo => todo.id !== deletedTodo.id);

                    state.loading = false;
                } else {
                    console.log("Undefined veri yakalandı")
                }
            })
            .addCase(delTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(delTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload;
                state.loading = false;
            })
            .addCase(updateTodoStatus.fulfilled, (state, action) => {
                console.log(action.payload);

                state.loading = false;
            })
            .addCase(updateTodoStatus.pending, (state) => {
                state.loading = true;

            })
            .addCase(updateTodoStatus.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload.data.status;
                state.messages = action.payload.data.message;
                state.loading = false;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                console.log(action.payload.data.data);

                state.loading = false;
            })
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload.data.status;
                state.messages = action.payload.data.message;
                state.loading = false;
            })

    }

})

export const { updateList } = TodoSlice.actions;


export default TodoSlice.reducer;