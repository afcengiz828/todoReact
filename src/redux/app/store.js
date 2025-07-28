import React from 'react'
import  todoReducer  from "../features/todo/TodoSlice.js";
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
})

