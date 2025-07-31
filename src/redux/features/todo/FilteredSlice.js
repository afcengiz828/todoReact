import { createSlice, current } from '@reduxjs/toolkit'
import React, { act } from 'react'

const initialState = {
    filteredTodos : [],
}

export const FilteredSlice = createSlice( {
  name:"FilteredSlice",
  initialState,
  reducers:{
        setFiltered : (state, action) => {
            console.log(action.payload);
            
            if(!action.payload){
            }
            else{
                state.filteredTodos = action.payload;
                console.log(state.filteredTodos);
            }

        },
        addFiltered : (state, action) => {
            console.log('Current todos:', current(state.filteredTodos));
            //console.log(current(state.filteredTodos));
            //console.log('New todo:', action.payload);
            if (action.payload && action.payload !== undefined) {}
                state.filteredTodos = [...current(state.filteredTodos) , action.payload];
            
            console.log('Updated todos:', state.filteredTodos);
        },
        updateFiltered : (state, action) => {
            //console.log(action.payload);
            state.filteredTodos.forEach(element => {
                if(element.id == action.payload.id){
                    element = action.payload;
                }
            });
            state.filteredTodos = action.payload;
            //console.log(state.filteredTodos);
        }
  }
});

export const {  addFiltered, updateFiltered, setFiltered } = FilteredSlice.actions;


export default FilteredSlice.reducer;