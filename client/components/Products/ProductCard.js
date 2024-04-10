import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Foundation } from "@expo/vector-icons";

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addToCartHandler = async () => {
    const user = await AsyncStorage.getItem("@auth");
    // const userData = JSON.parse(user)
    if (user === null) {
      Alert.alert("Sign In required", "SignIn or create your Account", [
        {
          text: "SignIn",
          onPress: () => navigation.navigate("Login"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
        },
      ]);
    } else {
      dispatch({
        type: "ADDTO_CART",
        payload: {
          item: { ...product, quantity: 1 },
          qty: 1,
        },
      });
      Alert.alert("Item added to cart");
    }
  };
  return (
    <Pressable
      onPress={() => navigation.navigate("ProductDetails", { data: product })}
      style={styles.card}
    >
      <Image source={{ uri: product.images[0].url }} style={styles.image} />
      <Text style={styles.cardTitle}>{product?.name}</Text>
      <View style={styles.descriptionContainer}>
        <View style={styles.ratingSection}>
          <Text style={{ color: "#ffa01a", fontSize: 12, fontWeight: "600" }}>
            {product.rating}
          </Text>
          <Foundation name="star" size={20} color="#ffa01a" />
          <Text style={{ color: "#ffa01a", fontSize: 12, fontWeight: "600" }}>
            rating
          </Text>
        </View>
        <Text style={styles.cardPrice}>₹{product.price}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "orange" }]}
          onPress={() => addToCartHandler()}
        >
          <Text style={styles.btnTxt}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderColor: "lightgray",
    width: 165,
    height: 230,
    padding: 10,
    marginLeft: 7,
    marginVertical: 8,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 120,
    alignSelf: "center",
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  cardPrice: {
    color: "#03a003",
    fontSize: 11,
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#000",
    fontSize: 12,
    width: "80%",
  },
  descriptionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  btnContainer: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "#000",
    height: 30,
    width: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
});
