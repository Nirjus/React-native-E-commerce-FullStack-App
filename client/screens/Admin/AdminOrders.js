import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Layout/Header";
import OrderItem from "../../components/Orders/OrderItem";
import Loader from "../../components/Loader";

const AdminOrders = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { orders: ordersData } = useSelector((state) => state.order);
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        await axios
          .get("/order/admin/get-all-orders", {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          })
          .then((res) => {
            setLoading(false);
            setOrders(res.data.orders);
          })
          .catch((error) => {
            setLoading(false);
            alert(error.response.data.message);
          });
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getAllOrders();
  }, [ordersData]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<Ionicons name="arrow-back-sharp" size={22} color="black" />}
        rightIcon={<FontAwesome name="user-o" size={22} color="black" />}
        rightOnClick={() => {
          navigation.navigate("BottomTabs", { screen: "Profile" });
        }}
        leftOnclick={() => {
          navigation.goBack();
        }}
        search={false}
        title={"Admin Orders"}
      />

      <Text
        style={{ textAlign: "center", fontWeight: "bold", marginVertical: 10 }}
      >
        Mange All orders
      </Text>
      {orders && orders.length !== 0 ? (
        <FlatList
          data={orders}
          renderItem={({ item, index }) => (
            <OrderItem order={item} key={item._id} isAdmin={true} />
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
      <Loader visible={loading} />
    </View>
  );
};

export default AdminOrders;

const styles = StyleSheet.create({});
