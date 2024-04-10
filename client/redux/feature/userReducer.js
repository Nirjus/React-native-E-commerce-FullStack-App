import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: undefined,
  token: "",
  isAuth: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase("LOGIN_SUCCESS", (state, action) => {
    state.loading = false;
    state.isAuth = true;
    state.token = action.payload.token;
    state.user = action.payload.user;
  });

  builder.addCase("GETUSER_SUCCESS", (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isAuth = true;
  });

  builder.addCase("LOGOUT_SUCCESS", (state, action) => {
    state.loading = false;
    state.user = undefined;
    state.token = "";
    state.isAuth = false;
  });
});
