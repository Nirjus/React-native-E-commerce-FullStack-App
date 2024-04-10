import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Header from "../components/Layout/Header";
import Loader from "../components/Loader";
const Address = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const route = useRoute();
  const [name, setName] = useState(route.params?.data?.name || "");
  const [city, setCity] = useState(route.params?.data?.city || "");
  const [state, setState] = useState(route.params?.data?.state || "");
  const [street, setStreet] = useState(route.params?.data?.street || "");
  const [landmark, setLandmark] = useState(route.params?.data?.landmark || "");
  const [pincode, setPincode] = useState(route.params?.data?.pincode || "");

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (route.params?.type === "edit") {
        await axios
          .put(
            `/address/update/${route.params?.data?._id}`,
            {
              name,
              city,
              state,
              street,
              landmark,
              pincode,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              withCredentials: true,
            }
          )
          .then((res) => {
            setLoading(false);
            Alert.alert(res.data.message);
            dispatch({
              type: "EDIT_ADDRESS",
              payload: res.data.address,
            });
            setName("");
            setCity("");
            setLandmark("");
            setState("");
            setPincode("");
            setStreet("");
            navigation.goBack();
          })
          .catch((error) => {
            setLoading(false);
            alert(error.response.data.message);
          });
      } else {
        await axios
          .post(
            "/address/create",
            {
              name,
              city,
              state,
              street,
              landmark,
              pincode,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              withCredentials: true,
            }
          )
          .then((res) => {
            setLoading(false);
            Alert.alert(res.data.message);
            dispatch({
              type: "ADD_ADDRESS",
              payload: res.data.address,
            });
            setName("");
            setCity("");
            setLandmark("");
            setState("");
            setPincode("");
            setStreet("");
            navigation.goBack();
          })
          .catch((error) => {
            setLoading(false);
            alert(error.response.data.message);
          });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
        search={false}
        title={`${
          route.params?.type === "edit" ? "Edit Address" : "Save Address"
        }`}
      />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Add a new Address
          </Text>
          <TextInput
            placeholder="India"
            placeholderTextColor={"#6f6d6d"}
            style={{
              color: "#000",
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Full Name (First and last name)
            </Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={"#6d6d6d"}
              value={name}
              onChangeText={(txt) => setName(txt)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                color: "#000",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 2,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>City</Text>
            <TextInput
              placeholder="Enter your city"
              placeholderTextColor={"#6d6d6d"}
              value={city}
              onChangeText={(txt) => setCity(txt)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                color: "#000",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 2,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              State or Province
            </Text>
            <TextInput
              value={state}
              onChangeText={(txt) => setState(txt)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                color: "#000",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 2,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Area, Street
            </Text>
            <TextInput
              value={street}
              onChangeText={(txt) => setStreet(txt)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                color: "#000",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 2,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Landmark</Text>
            <TextInput
              placeholder="near barabazar metro"
              placeholderTextColor={"#6d6d6d"}
              value={landmark}
              onChangeText={(txt) => setLandmark(txt)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                color: "#000",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 2,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Pincode</Text>
            <TextInput
              placeholder="Enter Pin code"
              placeholderTextColor={"#6d6d6d"}
              keyboardType="numeric"
              value={pincode.toString()}
              onChangeText={(txt) => setPincode(Number(txt))}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                color: "#000",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 2,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => submitHandler()}
            style={{
              backgroundColor: "#000",
              padding: 15,
              borderRadius: 10,
              alignSelf: "center",
              width: "95%",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              {route.params?.type === "edit" ? "Edit Address" : "Save Address"}
            </Text>
          </TouchableOpacity>
        </View>
        <Loader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({});
