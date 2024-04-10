import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const WishlistItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addToCartHandler = () => {
    dispatch({
      type: "ADDTO_CART",
      payload: {
        item,
        qty: 1,
      },
    });
    dispatch({
      type: "REMOVEFROM_WISHLIST",
      payload: {
        index: index,
      },
    });
  };

  const removeFromWishList = () => {
    dispatch({
      type: "REMOVEFROM_WISHLIST",
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
          <TouchableOpacity
            style={{ borderWidth: 0.6, padding: 5 }}
            onPress={() => addToCartHandler()}
          >
            <Text style={{ fontSize: 12, color: "#4a4a4a" }}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderWidth: 0.6, padding: 5 }}
            onPress={() => removeFromWishList()}
          >
            <Text style={{ fontSize: 12, color: "#4a4a4a" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate("ProductDetails", { data: item })}
        style={{
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#eeeeee",
          paddingHorizontal: 5,
        }}
      >
        <AntDesign name="arrowright" size={22} color="#7b7b7b" />
        <Text style={{ color: "#6e6e6e", fontSize: 12 }}>See</Text>
      </Pressable>
    </View>
  );
};

export default WishlistItem;

const styles = StyleSheet.create({
  cartCard: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 5,
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
