import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
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
const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const [isAuth, setIsAuth] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserLocalData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let token = await AsyncStorage.getItem("@token");
      let loginData = JSON.parse(data);

      const payload = {
        user: loginData,
        token: token,
      };
      dispatch({
        type: "GETUSER_SUCCESS",
        payload: payload,
      });
      console.log("Login Data", loginData);

      setIsAuth(loginData);
    };

    getUserLocalData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabs">
        {!isAuth && (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDeatils}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CategoryPage"
          component={CategoryPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            headerShown: false,
          }}
        />
        {/* {Admin Stack} */}
        <Stack.Screen
          name="Admin"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminOrders"
          component={AdminOrders}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
