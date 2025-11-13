// adminUsersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsersThunk,
  deleteUserThunk,
  toggleAdminStatusThunk,
} from "./adminUsersThunk";
import type { IUser } from "../model";

type State = {
  users: IUser[];
  loading: boolean;
  errorMessage: string | null;
};

const initialState: State = { users: [], loading: false, errorMessage: null };

export const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getAllUsersThunk.pending, (s) => {
      s.loading = true;
      s.errorMessage = null;
    });
    b.addCase(getAllUsersThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.users = a.payload;
    });
    b.addCase(getAllUsersThunk.rejected, (s, a) => {
      s.loading = false;
      s.errorMessage = a.payload ?? "Ошибка";
    });
    b.addCase(deleteUserThunk.fulfilled, (s, a) => {
      s.users = s.users.filter((u) => u.id !== a.payload);
    });
    b.addCase(toggleAdminStatusThunk.fulfilled, (state, action) => {
      const user = state.users.find((u) => u.id === action.payload.id);
      if (user) user.isAdmin = action.payload.isAdmin;
    });
  },
});
export default adminUsersSlice.reducer;
