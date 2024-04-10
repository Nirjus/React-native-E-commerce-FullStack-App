import { createReducer } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  laoding: false,
  data: [],
};

export const CartReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADDTO_CART", (state, action) => {
    state.laoding = false;
    let isItemExits = false;
    state.data.map((item) => {
      if (item._id === action.payload.item._id) {
        isItemExits = true;
        item.quantity += action.payload.qty ? action.payload.qty : 1;
      }
    });
    if (!isItemExits) {
      state.data = [...state.data, action.payload.item];
    }
    AsyncStorage.setItem("cart", JSON.stringify(state.data));
  });

  builder.addCase("REMOVE_FROM_CART", (state, action) => {
    state.laoding = false;
    let isItemExits = false;
    state.data.map((item) => {
      if (item._id === action.payload._id) {
        isItemExits = true;
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          isItemExits = false;
        }
      }
    });
    if (!isItemExits) {
      state.data.splice(action.payload.index, 1);
    }
    AsyncStorage.setItem("cart", JSON.stringify(state.data));
  });
  builder.addCase("DELETE_CART_ITEM", (state, action) => {
    state.laoding = false;
    state.data.splice(action.payload.index, 1);
    AsyncStorage.setItem("cart", JSON.stringify(state.data));
  });
  builder.addCase("EMPTY_CART", (state, action) => {
    state.laoding = false;
    state.data = [];
    AsyncStorage.removeItem("cart");
  });

  builder.addCase("SET_CART_DATA", (state, action) => {
    state.laoding = false;
    state.data = action.payload;
    AsyncStorage.setItem("cart", JSON.stringify(state.data));
  });
});

export const loadCartDataFromStorage = () => {
  return async (dispatch) => {
    try {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart !== null) {
        const cartData = JSON.parse(savedCart);
        dispatch({
          type: "SET_CART_DATA",
          payload: cartData,
        });
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };
};
