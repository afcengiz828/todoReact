import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getAllCategories = createAsyncThunk("getcategory", async (url) => {

    const response = await axios.get('http://localhost:8000/api/categories');
    return response.data;
})

const initialState = {
  data : [],
}
const AllCategoriesSlice = createSlice({
  name : "categories",
  initialState,
  reducers: {},
  extraReducers : builder => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        console.log("Tüm kategoriler alındı.")
        console.log(action.payload);
      })
      .addCase(getAllCategories.pending, (state, action) => {
        console.log("Tüm kategoriler alınıyor.")
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        console.log("Kategoriler alınırken hata oluştu")
      })
  }
});


export default AllCategoriesSlice.reducer;