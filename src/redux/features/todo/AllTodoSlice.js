import { createSlice, current } from '@reduxjs/toolkit'
import React, { act } from 'react'
import { delTodo, updateTodo, updateTodoStatus } from './TodoSlice';

const initialState = {
    allTodos: [],
    dataCount: 0
}

export const AllTodoSlice = createSlice({
    name: "AllTodoSlice",
    initialState,
    reducers: {
        setAllTodos: (state, action) => {
            if(action.payload && action.payload !== undefined){
                state.allTodos = action.payload;
                state.dataCount = action.payload.length;
                console.log(state.allTodos)
            }
        }
    },
    extraReducers: (builder) => {
            builder
                .addCase(delTodo.fulfilled, (state, action) => {
                    const deletedTodo = action.payload.data.data;
                    console.log(current(state.allTodos));
                    state.allTodos = state.allTodos.filter(todo => todo.id !== deletedTodo.id);
                    console.log(state.allTodos);
                    console.log(deletedTodo);
                })
                .addCase(updateTodoStatus.fulfilled, (state, action) => {
                    const updatedTodo = action.payload.data.data;
                    console.log(updatedTodo)
                    const index  = state.allTodos.findIndex(todo => todo.id == updatedTodo.id);
                    if(index !== -1){
                        state.allTodos[index].status = updatedTodo.status;
                    }

                })
                .addCase(updateTodo.fulfilled, (state, action) => {
                    const updatedTodo = action.payload.data.data;
                    console.log(updatedTodo)
                    const index  = state.allTodos.findIndex(todo => todo.id == updatedTodo.id);
                    if(index !== -1){
                        state.allTodos[index] = updatedTodo;
                    }

                })
        },
});

export const { setAllTodos } = AllTodoSlice.actions;


export default AllTodoSlice.reducer;