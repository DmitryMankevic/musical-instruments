import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/redux/userSlice";
import itemReducer from "@/entities/item/redux/itemSlice";
import categoryReducer from "@/entities/category/redux/categorySlice";
import cartReducer from "@/entities/cart/redux/cartSlice";
import orderReducer from "@/entities/order/redux/orderSlice";
import userInfoReducer from "@/entities/user-info/redux/userInfoSlice";
import adminUserSlice from "@/entities/admin-users/redux/adminUsersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    userInfo: userInfoReducer,
    categories: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
    adminUsers: adminUserSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
