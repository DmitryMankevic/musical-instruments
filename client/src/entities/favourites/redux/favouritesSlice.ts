import { createSlice } from "@reduxjs/toolkit";
import type { IItem } from "@/entities/item/model";
import { getAllByUserIdThunk, 
  deleteFavouriteThunk, 
  addItemToFavouritesThunk } from "./favouritesThunk";


interface FavouritesState {
  items: IItem[];
  loading: boolean;
  errorMessage: string | null;
}

const initialState: FavouritesState = {
  items: [],
  loading: false,
  errorMessage: "",
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    // Опционально: очистка при выходе
    clearFavourites: (state) => {
      state.items = [];
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllByUserIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllByUserIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllByUserIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(deleteFavouriteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFavouriteThunk.fulfilled, (state, action) => {
        const itemId = action.meta.arg;   // здесь action.meta.arg = id выбранного товара
       state.items = state.items.filter(item => item.id !== itemId);
      })
      .addCase(deleteFavouriteThunk.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      });
      builder
      .addCase(addItemToFavouritesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToFavouritesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.meta.arg); // здесь action.meta.arg = item
      })
      .addCase(addItemToFavouritesThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
  },
});

export const { clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
