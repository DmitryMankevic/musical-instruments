import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  eagles: string[];
}

const initialState: CounterState = {
  value: 100,
  eagles: ["Eagle"],
};

export const counterSlice = createSlice({
  name: "counterrrrrrrr",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log("action", action);
      state.value += action.payload;
    },
    addEagle: (state, action: PayloadAction<string>) => {
      state.eagles.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addEagle } =
  counterSlice.actions;

export default counterSlice.reducer;
