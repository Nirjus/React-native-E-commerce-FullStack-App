import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import OrderItem from "../components/Orders/OrderItem";

const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const { orders: ordersData } = useSelector((state) => state.order);
  console.log(ordersData);
  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<Ionicons name="arrow-back-sharp" size={22} color="black" />}
        rightIcon={<Feather name="shopping-cart" size={22} color="black" />}
        rightOnClick={() => {
          navigation.navigate("BottomTabs", { screen: "Cart" });
        }}
        leftOnclick={() => {
          navigation.goBack();
        }}
        search={true}
      />
      <View style={{ marginTop: 10, flex: 1 }}>
        <Text style={styles.heading}>My Orders</Text>
        {orders && orders.length !== 0 ? (
          <FlatList
            data={orders}
            renderItem={({ item, index }) => (
              <OrderItem key={item._id} order={item} />
            )}
          />
        ) : (
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
              marginVertical: 20,
            }}
          >
            No orders have 😥
          </Text>
        )}
      </View>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#050630",
    textAlign: "center",
  },
});
