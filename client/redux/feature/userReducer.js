import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: undefined,
  token: "",
  isAuth: false,
  updateUser: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase("LOGIN_SUCCESS", (state, action) => {
    state.loading = false;
    state.isAuth = true;
    state.token = action.token;
    state.user = action.user;
  });

  builder.addCase("GETUSER_SUCCESS", (state, action) => {
    state.loading = false;
    state.user = action.user;
    state.token = action.token;
    state.isAuth = true;
  });

  builder.addCase("LOGOUT_SUCCESS", (state, action) => {
    state.loading = false;
    state.user = undefined;
    state.token = "";
    state.isAuth = false;
  });
  builder.addCase("UPDATE_USER", (state) => {
    state.loading = false;
    state.updateUser = !state.updateUser;
  });
});
