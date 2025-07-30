import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState = {
    filteredTodos : [],
}

export const FilteredSlice = createSlice( {
  name:"FilteredSlice",
  initialState,
  reducers:{
        getFiltered : (state, action) => {
            return state.filteredTodos;
        },
        updateFiltered : (state, action) => {
            console.log("updateFiltered çalıştı.");
            console.log(action.payload);
            state.filteredTodos = action.payload;
            console.log(state.filteredTodos);
        }
  }
});

export const {  getFiltered, updateFiltered } = FilteredSlice.actions;


export default FilteredSlice.reducer;