import { createReducer } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  loading: false,
  wishlist: [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADDTO_WISHLIST", (state, action) => {
    state.loading = false;
    let isItemExits = false;

    state.wishlist.map((item) => {
      if (item._id === action.payload._id) {
        isItemExits = true;
        state.wishlist = state.wishlist.filter(
          (ite) => ite._id !== action.payload._id
        );
      }
    });
    if (!isItemExits) {
      state.wishlist = [...state.wishlist, action.payload];
    }

    AsyncStorage.setItem("@wishlist", JSON.stringify(state.wishlist));
  });

  builder.addCase("REMOVEFROM_WISHLIST", (state, action) => {
    state.loading = false;
    state.wishlist.splice(action.payload.index, 1);

    AsyncStorage.setItem("@wishlist", JSON.stringify(state.wishlist));
  });

  builder.addCase("SETWISLIST_ITEMS", (state, action) => {
    state.loading = false;
    state.wishlist = action.payload;
  });
});

export const loadWishListDataFromStorage = () => {
  return async (dispatch) => {
    try {
      const savedWishlist = await AsyncStorage.getItem("@wishlist");
      if (savedWishlist !== null) {
        const wishlistData = JSON.parse(savedWishlist);
        dispatch({
          type: "SETWISLIST_ITEMS",
          payload: wishlistData,
        });
      }
    } catch (error) {
      console.error("Error loading wishList data:", error);
    }
  };
};
