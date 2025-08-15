import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React from 'react'
import { delFiltered } from './FilteredSlice';
import { useDispatch } from 'react-redux';
import { updateCategories } from '../categories/AllCategoriesSlice';

const initialState = {
    status: "",
    messages: "",
    data: [],
    dataCount: 0,
    loading: true,
    error: null

}

export const getAllTodo = createAsyncThunk("gettodo", async (url) => {

    try {
        // localStorage'dan token'ı al
        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue('Token bulunamadı, lütfen giriş yapın');
        }

        const response = await axios.get('http://localhost:8000/api/todos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        // 401 hatası (Unauthorized)
        if (error.response?.status === 401) {
            // Token geçersiz, localStorage'ı temizle
            localStorage.removeItem('token');
            return rejectWithValue('Oturum süreniz dolmuş, lütfen tekrar giriş yapın');
        }

        return rejectWithValue(
            error.response?.data?.message || 'Todos alınırken hata oluştu'
        );
    }
})

export const addTodo = createAsyncThunk("addtodo", async (newTodo) => {
    console.log("addTodo içindeki json verisi");
    console.log(newTodo);
    try {

        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue('Token bulunamadı, lütfen giriş yapın');
        }

        const response = await axios.post("http://localhost:8000/api/todos", newTodo, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        // 401 hatası (Unauthorized)
        if (error.response?.status === 401) {
            // Token geçersiz, localStorage'ı temizle
            localStorage.removeItem('token');
            return rejectWithValue('Oturum süreniz dolmuş, lütfen tekrar giriş yapın');
        }

        return rejectWithValue(
            error.response?.data?.message || 'Todos alınırken hata oluştu'
        );
    }
})

export const delTodo = createAsyncThunk("deltodo", async (id) => {

    try {

        // localStorage'dan token'ı al
        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue('Token bulunamadı, lütfen giriş yapın');
        }

        const response = await axios.delete(`http://localhost:8000/api/todos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        // 401 hatası (Unauthorized)
        if (error.response?.status === 401) {
            // Token geçersiz, localStorage'ı temizle
            localStorage.removeItem('token');
            return rejectWithValue('Oturum süreniz dolmuş, lütfen tekrar giriş yapın');
        }

        return rejectWithValue(
            error.response?.data?.message || 'Todos alınırken hata oluştu'
        );
    }

})

export const updateTodo = createAsyncThunk("puttodo", async (newTodo) => {

    try {
        // localStorage'dan token'ı al
        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue('Token bulunamadı, lütfen giriş yapın');
        }
        const response = await axios.put(`http://localhost:8000/api/todos/${newTodo.id}`, newTodo);

        return response;
    } catch (error) {
        // 401 hatası (Unauthorized)
        if (error.response?.status === 401) {
            // Token geçersiz, localStorage'ı temizle
            localStorage.removeItem('token');
            return rejectWithValue('Oturum süreniz dolmuş, lütfen tekrar giriş yapın');
        }

        return rejectWithValue(
            error.response?.data?.message || 'Todos alınırken hata oluştu'
        );
    }
})

export const updateTodoStatus = createAsyncThunk("updatetodostatus", async (data) => {

    console.log(data);
    try {
        // localStorage'dan token'ı al
        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue('Token bulunamadı, lütfen giriş yapın');
        }

        const response = await axios.patch(`http://localhost:8000/api/todos/${data.idObj.id}`, data.dataObj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
        return response;
    } catch (error) {
        // 401 hatası (Unauthorized)
        if (error.response?.status === 401) {
            // Token geçersiz, localStorage'ı temizle
            localStorage.removeItem('token');
            return rejectWithValue('Oturum süreniz dolmuş, lütfen tekrar giriş yapın');
        }

        return rejectWithValue(
            error.response?.data?.message || 'Todos alınırken hata oluştu'
        );
    }
})


export const TodoSlice = createSlice({
    name: "TodoSlice",
    initialState,
    reducers: {
        updateList: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodo.fulfilled, (state, action) => {
                state.status = action.payload.status;
                state.messages = action.payload.messages;

                state.data = action.payload.data;
                state.dataCount = action.payload.count;

                state.loading = false;
            })
            .addCase(getAllTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(getAllTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload != undefined) {
                    state.data.push(action.payload.data);
                    state.loading = false;
                } else {
                    console.log("Undefined veri yakalandı");
                    state.loading = false;

                }
            })
            .addCase(addTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload;
                state.loading = false;
            })
            .addCase(delTodo.fulfilled, (state, action) => {

                //console.log(action.payload);
                if (action.payload != undefined && action.payload.data.status == "succes") {
                    const deletedTodo = action.payload.data.data;
                    state.data = state.data.filter(todo => todo.id !== deletedTodo.id);

                    state.loading = false;
                } else {
                    console.log("Undefined veri yakalandı")
                }
            })
            .addCase(delTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(delTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload;
                state.loading = false;
            })
            .addCase(updateTodoStatus.fulfilled, (state, action) => {
                console.log(action.payload);

                state.loading = false;
            })
            .addCase(updateTodoStatus.pending, (state) => {
                state.loading = true;

            })
            .addCase(updateTodoStatus.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload.data.status;
                state.messages = action.payload.data.message;
                state.loading = false;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                console.log(action.payload.data.data);
                const todo = action.payload.data.data;
                const index = state.data.findIndex(c => c.id == todo.id);
                state.data[index] = todo;

                state.loading = false;
            })
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;

            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = action.payload.data.status;
                state.messages = action.payload.data.message;
                state.loading = false;
            })
            .addCase(updateCategories.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(c => c.id == action.payload.category.id);
                console.log(action.payload.category)
                state.data[index].categories = action.payload.category;
            })

    }

})

export const { updateList } = TodoSlice.actions;


export default TodoSlice.reducer;