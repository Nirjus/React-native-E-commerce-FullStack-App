import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADD_ORDERS", (state, action) => {
    state.loading = false;
    state.orders = [...state.orders, action.payload];
  });

  builder.addCase("LOAD_ORDERS", (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });

  builder.addCase("UPDATE_ORDER", (state, action) => {
    state.loading = false;
    state.orders = state.orders.map((item) => {
      if (item._id === action.payload._id) {
        return action.payload;
      }
      return item;
    });
  });
});
