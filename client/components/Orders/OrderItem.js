import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const OrderItem = ({ order, isAdmin = false }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const updateStatusHandler = async () => {
    try {
      await axios
        .put(
          `/order/admin/order/${order._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          dispatch({
            type: "UPDATE_ORDER",
            payload: res.data.order,
          });
          Alert.alert(res.data.message);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.orderInfo}>
        <Text style={{ color: "#000", fontSize: 12 }}>
          OrderId: {order._id}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>
            Order Date: {order.createdAt.toString().substring(0, 10)}
          </Text>
          {order.paymentInfo.status === "Deliverd" && (
            <Text style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>
              Delivery Date: {order?.deliverdAt.toString().substring(0, 10)}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#e6e6e6bd",
          }}
        >
          <Entypo name="location-pin" size={20} color="#777777" />
          <Text style={{ color: "#777777", fontWeight: "500" }}>
            {order.shippingInfo.city} - {order.shippingInfo.name} -{" "}
            {order.shippingInfo.state}
          </Text>
        </View>
      </View>
      <FlatList
        data={order.orderItems}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{ margin: 2, borderWidth: 1, borderColor: "#F0F0F0" }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={{ uri: item.product.images[0].url }}
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
              <View style={{ width: 200 }}>
                <Text
                  style={{ color: "#f35252", fontSize: 14, fontWeight: "900" }}
                >
                  {item.product.name}
                </Text>
                <Text
                  style={{
                    color: "#089a17",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  ₹{item.product.price}
                </Text>
                <Text style={{ color: "#000", fontSize: 12 }}>
                  Total Quantity: {item.qty}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 2,
          borderTopWidth: 1,
          borderColor: "#cccccc",
          padding: 5,
        }}
      >
        <View>
          <Text style={{ fontSize: 13 }}>
            Total Amount:{" "}
            <Text style={{ fontWeight: "700", color: "green" }}>
              ₹{order.paymentInfo.totalAmount}
            </Text>
          </Text>
          <Text style={{ fontSize: 13 }}>
            OrderStatus:{" "}
            <Text style={{ fontWeight: "700", color: "#746ee8" }}>
              {order.paymentInfo.status}
            </Text>
          </Text>
          <Text style={{ fontSize: 13 }}>
            Mayment Mode:{" "}
            <Text style={{ fontWeight: "800", color: "#57575b" }}>
              {order.paymentInfo.paymentMode}
            </Text>
          </Text>
        </View>
        <View style={styles.deliverd}>
          {order.paymentInfo.status === "Deliverd" && (
            <Image
              source={require("../../assets/icon/delivered.png")}
              style={{ width: 50, height: 50, objectFit: "contain" }}
            />
          )}
        </View>
      </View>
      {isAdmin && order.paymentInfo.status !== "Deliverd" && (
        <View style={{ alignSelf: "center" }}>
          <Pressable
            onPress={() => updateStatusHandler()}
            style={{
              padding: 10,
              borderRadius: 10,
              width: 250,
              backgroundColor: "#0cc792",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Update Status{" "}
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                ({order.paymentInfo.status})
              </Text>
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRa: 20,
  },
  orderInfo: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingBottom: 5,
  },
  deliverd: {
    justifyContent: "center",
    alignItems: "center",
  },
});
