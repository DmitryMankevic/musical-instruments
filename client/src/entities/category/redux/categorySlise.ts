import { createSlice } from "@reduxjs/toolkit";
import type { ICategory } from "../model/index";
import {  getAllCategoriesThunk } from "./categoryThunk";

type CategoryState = {

  categoriesArr: ICategory[];
  currentCategory: ICategory | null;
  loading: boolean;
  errorMessage: string;
}

const initialState: CategoryState = {
  categoriesArr: [],
  currentCategory: null,
  loading: false,
  errorMessage: "",
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.categoriesArr = action.payload;
      })
      .addCase(getAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
