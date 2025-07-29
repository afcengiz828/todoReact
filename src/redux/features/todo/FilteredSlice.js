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
            state.filteredTodos.push(action.payload);
        }
  }
});

export const {  gerFiltered } = FilteredSlice.actions;


export default FilteredSlice.reducer;