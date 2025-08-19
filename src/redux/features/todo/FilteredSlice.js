import { createSlice, current } from '@reduxjs/toolkit'
import React, { act } from 'react'
import { addTodo, delTodo, updateTodoStatus } from './TodoSlice';

const initialState = {
    filteredTodos: [],
    filterStatus: false,
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
        delFiltered: (state, action) => {

            /* Filtered todo dan silme işlemi action silinecek todo objesi */
            state.filteredTodos.remove(todo => todo.id == action.payload.id);

        },
        updateFiltered: (state, action) => {
            if (action.payload.length) {

                //console.log(action.payload);
                state.filteredTodos = action.payload;
            }
        },
        setFilteredStatus: (state, action) => {
            //console.log(action.payload);
            if (action.payload) {
                state.filterStatus = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(delTodo.fulfilled, (state, action) => {
                const deletedTodo = action.payload.data.data;
                state.filteredTodos = state.filteredTodos.filter(todo => todo.id !== deletedTodo.id);
            })
            .addCase(updateTodoStatus.fulfilled, (state, action) => {
                const updatedTodo = action.payload.data.data;
                const index = state.filteredTodos.findIndex(todo => { todo.status = updatedTodo.status; });
                if (index !== -1) {
                    state.allTodos[index].status = updatedTodo.status;
                }
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                // API'den gelen verinin "data" özelliğinin var olduğundan emin olun
                if (action.payload && action.payload.data) {
                    state.filteredTodos.push(action.payload.data);
                } else {
                    // Hata ayıklama için konsola bir uyarı yazdırın
                    console.error("Payload.data is missing:", action.payload);
                }
            })
    },
});


export const { addFiltered, updateFiltered, setFiltered, setFilteredStatus, delFiltered } = FilteredSlice.actions;


export default FilteredSlice.reducer;