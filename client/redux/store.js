import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./feature/userReducer";
import axios from "axios";
import { productReducer } from "./feature/productReducer";
import { CartReducer, loadCartDataFromStorage } from "./feature/cartReducer";
import {
  loadWishListDataFromStorage,
  wishlistReducer,
} from "./feature/wishlistReducer";
import { addressReducer } from "./feature/addressReducer";
import { orderReducer } from "./feature/orderReducer";

axios.defaults.baseURL = "http://192.168.29.5:8000/api/v1";

const Store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: CartReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    order: orderReducer,
  },
});
Store.dispatch(loadCartDataFromStorage());
Store.dispatch(loadWishListDataFromStorage());
export default Store;
