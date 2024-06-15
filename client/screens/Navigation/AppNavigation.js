import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import BottomTabs from "./BottomTabs";
import ProductDeatils from "../ProductDeatils";
import About from "../About";
import Checkout from "../Checkout";
import Login from "../Login";
import Register from "../Register";
import AddAddress from "../AddAddress";
import Address from "../Address";
import OrderScreen from "../OrderScreen";
import EditProfile from "../EditProfile";
import Orders from "../Orders";
import Dashboard from "../Admin/Dashboard";
import CategoryPage from "../CategoryPage";
import AdminOrders from "../Admin/AdminOrders";
import Profile from "../Profile";
import AdminProducts from "../Admin/AdminProducts";
import Product from "../Admin/Product";
import AdminCategory from "../Admin/AdminCategory";
import Category from "../Admin/Category";
import AdminUsers from "../Admin/AdminUsers";
import UserProfile from "../Admin/UserProfile";
import AdminBanner from "../Admin/AdminBanner";
import ForgotPassword from "../Forgot-password";
import axios from "axios";
const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const setUserInfo = async (data, token) => {
    await AsyncStorage.setItem("@auth", JSON.stringify(data));
    await AsyncStorage.setItem("@token", token);
    dispatch({
      type: "GETUSER_SUCCESS",
      user: data,
      token: token,
    });
  };
  useEffect(() => {
    const getuser = async () => {
      let token = await AsyncStorage.getItem("@token");
      await axios
        .get("/user/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUserInfo(res.data.user, token);
        });
    };
    getuser();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="ProductDetails" component={ProductDeatils} />
            <Stack.Screen name="CategoryPage" component={CategoryPage} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="AddAddress" component={AddAddress} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Orders" component={Orders} />
            {/* {Admin Stack} */}
            <Stack.Screen name="Admin" component={Dashboard} />
            <Stack.Screen name="AdminOrders" component={AdminOrders} />
            <Stack.Screen name="AdminProducts" component={AdminProducts} />
            <Stack.Screen name="ProductWorks" component={Product} />
            <Stack.Screen name="AdminCategory" component={AdminCategory} />
            <Stack.Screen name="CategoryWorks" component={Category} />
            <Stack.Screen name="AdminUsers" component={AdminUsers} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="AdminBanner" component={AdminBanner} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
