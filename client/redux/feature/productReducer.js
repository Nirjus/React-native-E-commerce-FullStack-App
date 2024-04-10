import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: undefined,
  loading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder.addCase("LOAD_PRODUCTS", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });
});
