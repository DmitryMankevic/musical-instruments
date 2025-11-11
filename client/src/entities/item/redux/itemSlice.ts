import { createSlice } from "@reduxjs/toolkit";
import type { IItem } from "../model";
import {
  createItemThunk,
  getAllItemsThunk,
  getItemByIdThunk,
  updateItemThunk,
  deleteItemThunk,
} from "./itemThunk";

type ItemState = {
  itemArr: IItem[];
  currentItem: IItem | null;
  total: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  errorMessage: string;
};

const initialState: ItemState = {
  itemArr: [],
  currentItem: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  errorMessage: "",
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItemsThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getAllItemsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.itemArr = action.payload.items;
          state.total = action.payload.total;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        }
      })
      .addCase(getAllItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(createItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.itemArr.push(action.payload);
      })
      .addCase(createItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(createItemThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getItemByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.currentItem = action.payload;
      })
      .addCase(getItemByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(updateItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.itemArr.findIndex(
            (item) => item.id === action.payload?.id
          );
          if (index !== -1) {
            state.itemArr[index] = action.payload;
          }
        }
      })
      .addCase(updateItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(deleteItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.itemArr = state.itemArr.filter(
            (item) => item.id !== action.payload
          );
        }
      })
      .addCase(deleteItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export default itemSlice.reducer;
