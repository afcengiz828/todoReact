import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";



export const getAllCategories = createAsyncThunk("getcategory", async (_, { getState }) => {
  const state = getState();
  const token = state?.auth?.token || localStorage.getItem('token');

  const response = await axios.get('http://localhost:8000/api/categories', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
})

export const addCategories = createAsyncThunk("addcategory", async (newCategory, { getState }) => {
  const state = getState();
  const token = state?.auth?.token || localStorage.getItem('token');

  const response = await axios.post(
    'http://localhost:8000/api/categories',
    newCategory,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
})

export const delCategories = createAsyncThunk("delcategory", async (id, { getState }) => {
  const state = getState();
  const token = state?.auth?.token || localStorage.getItem('token');

  const response = await axios.delete(`http://localhost:8000/api/categories/${id}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
})

export const updateCategories = createAsyncThunk("updcategory", async (data, { getState }) => {
  const state = getState();
  const token = state?.auth?.token || localStorage.getItem('token');
 
  const response = await axios.put(
    `http://localhost:8000/api/categories/${data[1]}`,
    data[0],
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
  );
  // console.log(response.data.data)
  return response.data;
})

export const todoCounts = createAsyncThunk("todocount", async (data, { getState }) => {
  const state = getState();
  const token = state?.auth?.token || localStorage.getItem('token');

  console.log(data);
  const response = await axios.put(
    `http://localhost:8000/api/categories/${data[1]}`,
    data[0],
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
  );
  return response.data;
})

const initialState = {
  data: [],
  id: null,
  loading: false,
  error: null
}

const AllCategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {

        state.data = action.payload.data;
        state.loading = false;

      })
      .addCase(getAllCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.messages

      })

      .addCase(addCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload[2])
        console.log(action.payload);
      })
      .addCase(addCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategories.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.error = action.payload.messages
      })

      .addCase(delCategories.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.data = state.data.filter(c => c.id != action.payload.data.data.id);
        console.log(state.data)
      })
      .addCase(delCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.messages
      })

      .addCase(updateCategories.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(c => c.id == action.payload.data.id);
        console.log(action.payload.data.id)
        state.data[index] = action.payload.data;
        state.id = null
      })
      .addCase(updateCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.messages
      })
  }
});

export const { setId, setError, clearError } = AllCategoriesSlice.actions;

export default AllCategoriesSlice.reducer;