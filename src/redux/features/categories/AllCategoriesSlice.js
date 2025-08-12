import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getAllCategories = createAsyncThunk("getcategory", async () => {

  const response = await axios.get('http://localhost:8000/api/categories');
  return response.data;
})

export const addCategories = createAsyncThunk("addcategory", async (newCategory) => {

  const response = await axios.post('http://localhost:8000/api/categories', newCategory);
  return response.data;
})

export const delCategories = createAsyncThunk("delcategory", async (id) => {

  const response = await axios.delete(`http://localhost:8000/api/categories/${id}`);
  return response;
})

export const updateCategories = createAsyncThunk("updcategory", async (data) => {

  console.log(data[0], typeof(data[0].name));
  console.log(data[0], typeof(data[0].color));
  const response = await axios.put(`http://localhost:8000/api/categories/${data[1]}`, data[0]);
  return response.data;
})

export const todoCounts = createAsyncThunk("updcategory", async (data) => {

  console.log(data);
  const response = await axios.put(`http://localhost:8000/api/categories/${data[1]}`, data[0]);
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
        state.error = action.payload

      })

            .addCase(addCategories.fulfilled, (state, action) => {
              state.loading = false;
              state.data.push(action.payload.category)
              console.log(action.payload);
            })
            .addCase(addCategories.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(addCategories.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload
            })

      .addCase(delCategories.fulfilled, (state, action) => {
        console.log(action.payload.data.data)
        state.loading = false;
        state.data = state.data.filter(c => c.id != action.payload.data.data.id);
      })
      .addCase(delCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

            .addCase(updateCategories.fulfilled, (state, action) => {
              state.loading = false;
              const index = state.data.findIndex(c => c.id == action.payload.category.id);
              state.data[index] = action.payload.category;
              state.id = null
            })
            .addCase(updateCategories.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(updateCategories.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload
            })
  }
});

export const { setId } = AllCategoriesSlice.actions;

export default AllCategoriesSlice.reducer;