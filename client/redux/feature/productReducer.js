import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: undefined,
  updated: false,
  loading: true,
  updateCategory: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder.addCase("LOAD_PRODUCTS", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });

  builder.addCase("UPDATE_PRODUCT", (state) => {
    state.loading = false;
    state.updated = !state.updated;
  });

  builder.addCase("UPDATE_CATEGORY", (state) => {
    state.loading = false;
    state.updateCategory = !state.updateCategory;
  });
});
