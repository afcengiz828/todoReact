import React from 'react'
import  todoReducer from "../features/todo/TodoSlice.js";
import { configureStore } from '@reduxjs/toolkit';
import  filteredReducer  from '../features/todo/FilteredSlice.js';
import  allTodoReducer  from '../features/todo/AllTodoSlice.js';
import  allCategoriesReducer  from '../features/categories/AllCategoriesSlice.js';
import  ThemeReducer  from '../features/todo/ThemeSlice.js';
import authReducer from '../features/AuthSlice.js';
import userReducer from '../features/user/UserSlice.js';


export const store = configureStore({
    reducer: {
        user : userReducer,
        auth: authReducer,
        todo: todoReducer,
        categories: allCategoriesReducer,
        filter: filteredReducer,
        all : allTodoReducer,
        dark : ThemeReducer
    },
})

