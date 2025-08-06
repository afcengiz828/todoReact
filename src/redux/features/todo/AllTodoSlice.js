import { createSlice, current } from '@reduxjs/toolkit'
import React, { act } from 'react'

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
                //console.log(action.payload);
                state.allTodos = action.payload;
                state.dataCount = action.payload.length;
                console.log(state.allTodos)
            }
        }
    }
});

export const { setAllTodos } = AllTodoSlice.actions;


export default AllTodoSlice.reducer;