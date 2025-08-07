import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState = {
    dark : false,
}

const ThemeSlice = createSlice({
    name:"theme",
    initialState,
    reducers : {
        setDark : (state, aciton) => {
            state.dark = !state.dark;
        }
    }
  
})


export const { setDark } = ThemeSlice.actions;

export default ThemeSlice.reducer;