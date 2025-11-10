import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/redux/userSlice";
import itemReducer from "@/entities/item/redux/itemSlice";
import categoryReducer from "@/entities/category/redux/categorySlice";
import cartReducer from "@/entities/cart/redux/cartSlice";
import orderReducer from "@/entities/order/redux/orderSlice";
import favouritesReducer from "@/entities/favourites/redux/favouritesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    categories: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
    favourites: favouritesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
