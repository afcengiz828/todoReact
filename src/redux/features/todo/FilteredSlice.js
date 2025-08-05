import { createSlice, current } from '@reduxjs/toolkit'
import React, { act } from 'react'

const initialState = {
    filteredTodos: [],
    filterStatus : false,
    dataCount: 0
}

export const FilteredSlice = createSlice({
    name: "FilteredSlice",
    initialState,
    reducers: {
        setFiltered: (state, action) => {

            if (action.payload) {
                state.filteredTodos = action.payload;
                state.dataCount = action.payload.length;
            }

        },
        addFiltered: (state, action) => {
            if (action.payload && action.payload !== undefined) {
                state.filteredTodos = [...current(state.filteredTodos), action.payload];   
            }

        },
        updateFiltered: (state, action) => {
            if(action.payload.length){

                //console.log(action.payload);
                state.filteredTodos = action.payload;
            }
        },
        setFilteredStatus : (state, action) => {
            //console.log(action.payload);
            if(action.payload){
                state.filterStatus = action.payload;
            }
        }
    }
});

export const { addFiltered, updateFiltered, setFiltered, setFilteredStatus } = FilteredSlice.actions;


export default FilteredSlice.reducer;