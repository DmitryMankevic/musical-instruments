import { createSlice } from "@reduxjs/toolkit";
import type { ICategory } from "../model/index";
import {
  getAllCategoriesThunk,
  createCategoryThunk,
  deleteCategoryThunk,
  updateCategoryThunk,
  getCategoryByIdThunk,
} from "./categoryThunk";

type CategoryState = {
  categoriesArr: ICategory[];
  currentCategory: ICategory | null;
  loading: boolean;
  errorMessage: string;
};

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
    builder
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.categoriesArr.push(action.payload);
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesArr = state.categoriesArr.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const index = state.categoriesArr.findIndex(
          (b) => b.id === updatedCategory.id
        );
        if (index !== -1) {
          state.categoriesArr[index] = updatedCategory;
        }
        if (state.currentCategory?.id === updatedCategory.id) {
          state.currentCategory = updatedCategory;
        }
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.currentCategory = action.payload;
      })
      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
