import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
const CartItem = ({ item, index }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch({
      type: "ADDTO_CART",
      payload: {
        item,
        qty: 1,
      },
    });
  };

  const removeFromCartHandler = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        _id: item._id,
        index: index,
      },
    });
  };

  const deleteCartItem = () => {
    dispatch({
      type: "DELETE_CART_ITEM",
      payload: {
        index: index,
      },
    });
  };
  return (
    <View style={styles.cartCard}>
      <Image source={{ uri: item.images[0].url }} style={styles.image} />
      <View style={{ marginTop: "auto" }}>
        <Text style={styles.name}>{item?.name.substring(0, 30)}..</Text>
        <Text style={[styles.name, { color: "#079a1d" }]}>
          Price: ₹{item?.price}
        </Text>
        {item.stock > 0 ? (
          <Text style={{ color: "green", fontSize: 11, marginLeft: 5 }}>
            •In Stock
          </Text>
        ) : (
          <Text style={{ color: "red", fontSize: 11, marginLeft: 5 }}>
            •Out Of Stock
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 20,
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnQty}
              onPress={() => removeFromCartHandler()}
            >
              {item?.quantity <= 1 ? (
                <AntDesign name="delete" size={16} color="#030303" />
              ) : (
                <Text style={styles.btnQtyTxt}>-</Text>
              )}
            </TouchableOpacity>
            <Text>{item?.quantity}</Text>
            <TouchableOpacity
              style={styles.btnQty}
              onPress={() => addToCartHandler()}
            >
              <Text style={styles.btnQtyTxt}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ borderWidth: 0.6, padding: 5 }}
            onPress={() => deleteCartItem()}
          >
            <Text style={{ fontSize: 12, color: "#4a4a4a" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartCard: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btnQtyTxt: {
    fontSize: 20,
    fontWeight: "500",
  },
  btnQty: {
    backgroundColor: "lightgrey",
    width: 26,
    height: 26,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
