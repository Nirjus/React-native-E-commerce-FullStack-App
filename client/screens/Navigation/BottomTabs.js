import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Home from "../Tabs/Home";
import Notification from "../Tabs/Notification";
import Cart from "../Tabs/Cart";
const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  const { data } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <Tabs.Navigator initialRouteName="Home">
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarBadge: data?.length,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="shopping-cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarBadge: wishlist?.length,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications-sharp" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
