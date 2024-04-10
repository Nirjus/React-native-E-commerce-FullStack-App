import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  addresses: [],
  defaultAddress: undefined,
};

export const addressReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADD_ADDRESS", (state, action) => {
    state.loading = false;
    state.addresses = [...state.addresses, action.payload];
  });

  builder.addCase("LOAD_ADDRESS", (state, action) => {
    state.loading = false;
    state.addresses = action.payload;
  });
  builder.addCase("SET_DEFAULT_ADDRESS", (state, action) => {
    state.loading = false;
    state.defaultAddress = action.payload;
  });
  builder.addCase("EDIT_ADDRESS", (state, action) => {
    state.loading = false;
    state.addresses = state.addresses.map((item) => {
      if (item._id === action.payload._id) {
        return action.payload;
      }
      return item;
    });
  });

  builder.addCase("REMOVE_ADDRESS", (state, action) => {
    state.loading = false;
    state.addresses = state.addresses.filter((item) => {
      item._id !== action.payload._id;
    });
  });
});
