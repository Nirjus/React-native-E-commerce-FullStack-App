import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import RazorpayCheckout from "react-native-razorpay";
import Header from "../components/Layout/Header";
import AddressForcheckout from "../components/Address/AddressForcheckout";
import Loader from "../components/Loader";
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedPament, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
    if (route.params?.data) {
      setCartItems([route.params?.data]);
    }
  }, [data]);
  const total = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const shippingCharge = 1;
  const tax = 1;
  const grandTotal = total + shippingCharge + tax;
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const handlePlaceOrder = async (paymentID, paymentmode) => {
    try {
      const orderItems = [];
      cartItems.map((item) => {
        orderItems.push({
          product: item,
          qty: item.quantity,
        });
      });
      const obj = {
        shippingInfo: {
          name: selectedAddress.name,
          city: selectedAddress.city,
          state: selectedAddress.state,
        },
        orderItems,
        paymentInfo: {
          paymentId: paymentID,
          totalAmount: grandTotal,
          shippingCharges: shippingCharge,
          tax: tax,
          productPrice: total,
          paymentMode: paymentmode,
        },
      };
      console.log(obj);
      setLoading(true);
      await axios
        .post("/order/create", obj, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          Alert.alert(res.data.message);
          dispatch({
            type: "ADD_ORDERS",
            payload: res.data.order,
          });
          if (!route.params?.data) {
            dispatch({
              type: "SET_CART_DATA",
              payload: [],
            });
          }
          setCurrentStep(4);
          navigation.navigate("OrderScreen");
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        })
        .finally(() => {
          setCurrentStep(0);
          setSelectedPayment("");
        });
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log(error);
    }
  };
  const razorPay = () => {
    try {
      const options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: "INR",
        key: "rzp_test_hzUg2csoySkyWy", // Your api key
        amount: total * 100,
        name: "foo",
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "Razorpay Software",
        },
        theme: { color: "#7450f7" },
      };
      RazorpayCheckout.open(options)
        .then((data) => {
          handlePlaceOrder(data.razorpay_payment_id, "Card");
        })
        .catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cartItems.length);
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<Ionicons name="arrow-back-sharp" size={22} color="black" />}
        rightIcon={<Feather name="home" size={22} color="black" />}
        rightOnClick={() => {
          navigation.navigate("BottomTabs", { screen: "Home" });
        }}
        leftOnclick={() => {
          navigation.goBack();
        }}
        search={false}
        title={"Checkout Page"}
      />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            {steps.map((step, index) => (
              <View
                style={{ justifyContent: "center", alignItems: "center" }}
                key={index}
              >
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: "green" },
                      index <= currentStep && { backgroundColor: "green" },
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    index < currentStep && { backgroundColor: "green" },
                  ]}
                >
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      &#10003;
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  {step.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {currentStep === 0 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Select Delevery address
            </Text>
            <AddressForcheckout
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setCurrentStep={setCurrentStep}
            />
          </View>
        )}
        {currentStep === 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Choose your delevery options
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                padding: 8,
                gap: 7,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              {option ? (
                <MaterialIcons
                  onPress={() => setOption(!option)}
                  name="radio-button-checked"
                  size={22}
                  color="black"
                />
              ) : (
                <Feather
                  onPress={() => setOption(!option)}
                  name="circle"
                  size={22}
                  color="black"
                />
              )}

              <Text style={{ flex: 1 }}>
                <Text style={{ color: "green", fontWeight: "500" }}>
                  Tommorrow by 10pm
                </Text>
                - FREE delevery with Prime membership
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: "#000",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep === 2 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
              Select your Payment Method
            </Text>
            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedPament === "Cash" ? (
                <MaterialIcons
                  onPress={() => setSelectedPayment("Cash")}
                  name="radio-button-checked"
                  size={22}
                  color="black"
                />
              ) : (
                <Feather
                  onPress={() => setSelectedPayment("Cash")}
                  name="circle"
                  size={22}
                  color="black"
                />
              )}

              <Text style={{ color: "#000" }}>Cash on Delever</Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedPament === "Card" ? (
                <MaterialIcons
                  onPress={() => setSelectedPayment("Card")}
                  name="radio-button-checked"
                  size={22}
                  color="black"
                />
              ) : (
                <Feather
                  onPress={() => {
                    setSelectedPayment("Card");
                    Alert.alert("UPI/Debit card", "Pay Online", [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel is Pressed"),
                      },
                      {
                        text: "OK",
                        onPress: () => razorPay(),
                      },
                    ]);
                  }}
                  name="circle"
                  size={22}
                  color="black"
                />
              )}
              <Text style={{ color: "#000" }}>UPI / Credit or Debit Card</Text>
            </View>
            <TouchableOpacity
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: "#000",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep === 3 && selectedPament === "Cash" && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 15, color: "grey", marginTop: 5 }}>
              Order Now
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                backgroundColor: "white",
                padding: 8,
                borderColor: "#DODODO",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  Save 5% and never run out
                </Text>
                <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                  Turn on auto deliveries
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text>Shipping to {selectedAddress?.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "500", color: "grey" }}
                >
                  Items
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "500", color: "green" }}
                >
                  ₹{total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "500", color: "grey" }}
                >
                  Delevery
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "500", color: "green" }}
                >
                  ₹{shippingCharge}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#000" }}
                >
                  Order Total
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#C60C30" }}
                >
                  ₹{grandTotal}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "grey" }}>Pay with</Text>
              <Text style={{ color: "#000", marginTop: 7, fontWeight: "600" }}>
                Pay on delevery (cash)
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handlePlaceOrder(Date(Date.now()), selectedPament)}
              style={{
                backgroundColor: "#000",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Loader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginVertical: 20,
  },
  price: {
    fontSize: 25,
  },
});
