import React from 'react'
import  todoReducer from "../features/todo/TodoSlice.js";
import { configureStore } from '@reduxjs/toolkit';
import  filteredReducer  from '../features/todo/FilteredSlice.js';


export const store = configureStore({
    reducer: {
        todo: todoReducer,
        filter: filteredReducer
    },
})

