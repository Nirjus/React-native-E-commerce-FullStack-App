import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Header from "../../components/Layout/Header";
import PriceTaible from "../../components/Cart/PriceTaible";
import CartItem from "../../components/Cart/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { data } = useSelector((state) => state.cart);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);
  const total =
    cartItems &&
    cartItems
      .map((item) => item.price * item.quantity)
      .reduce((curr, prev) => curr + prev, 0);
  const tax = 1;
  const shipping = 1;
  return (
    <View style={styles.container}>
      <Header
        leftIcon={<Ionicons name="arrow-back-sharp" size={22} color="black" />}
        rightIcon={<FontAwesome name="user-o" size={22} color="black" />}
        rightOnClick={() => {
          navigation.navigate("Profile");
        }}
        leftOnclick={() => {
          navigation.goBack();
        }}
        search={true}
      />
      <Text style={styles.heading}>
        {cartItems.length > 0
          ? `You have ${cartItems.length} item left in your cart`
          : `opps your cart is empty 🫤`}
      </Text>
      {cartItems && cartItems.length !== 0 && (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => (
              <CartItem item={item} index={index} key={index} />
            )}
          />
          <View
            style={{
              marginBottom: 10,
              borderTopWidth: 1,
              paddingTop: 10,
              borderTopColor: "#c7c7c7",
            }}
          >
            <PriceTaible title={"Price"} price={total} />
            <PriceTaible title={"Tax"} price={tax} />
            <PriceTaible title={"Shipping"} price={shipping} />
            <View style={styles.grandTotal}>
              <PriceTaible
                title={"Grand Total"}
                price={total + tax + shipping}
              />
            </View>
            <TouchableOpacity
              style={styles.btnCheckout}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.btnCheckoutTxt}>
                Proced to Checkout ({cartItems.length} items)
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginTop: 10,
    textAlign: "center",
    color: "green",
    fontWeight: "800",
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#000",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
  },
  btnCheckoutTxt: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
});
