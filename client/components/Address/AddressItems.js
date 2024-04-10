import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const AddressItems = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [addressList, setAddressList] = useState([]);
  const { token } = useSelector((state) => state.user);
  const { addresses, defaultAddress } = useSelector((state) => state.address);

  useEffect(() => {
    if (addresses) {
      setAddressList(addresses);
    }
  }, [addresses]);
  const editHandler = (item) => {
    navigation.navigate("Address", { data: item, type: "edit" });
  };

  const removeAddressHandler = async (id) => {
    try {
      await axios
        .delete(`/address/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          Alert.alert(res.data.message);
          dispatch({
            type: "REMOVE_ADDRESS",
            payload: {
              _id: id,
            },
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      {/* {All the address} */}
      {addressList.map((item, index) => (
        <Pressable
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "#D0D0D0",
            padding: 10,
            flexDirection: "column",
            gap: 5,
            marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Text style={{ fontWeight: "bold", color: "#000" }}>
              {item.name}
            </Text>
            <Entypo name="location-pin" size={24} color="#da1919" />
          </View>
          <Text style={{ fontSize: 15, color: "#444343" }}>
            {item.city}, {item.state}
          </Text>
          <Text style={{ color: "#181818" }}>{item.street}</Text>

          <Text style={{ color: "#181818" }}>
            <Text style={{ fontWeight: "700" }}> Landmark: </Text>
            {item.landmark}
          </Text>
          <Text style={{ color: "#181818" }}>
            <Text style={{ fontWeight: "700" }}> Pincode: </Text>
            {item.pincode}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 7,
            }}
          >
            <TouchableOpacity
              onPress={() => editHandler(item)}
              style={{
                backgroundColor: "#D0D0D0",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D0D0D0",
              }}
            >
              <Text style={{ color: "#000" }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeAddressHandler(item._id)}
              style={{
                backgroundColor: "#D0D0D0",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D0D0D0",
              }}
            >
              <Text style={{ color: "#000" }}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: "SET_DEFAULT_ADDRESS",
                  payload: item,
                });
              }}
              style={{
                backgroundColor:
                  defaultAddress?._id === item?._id ? "#6c6c6c" : "#D0D0D0",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D0D0D0",
              }}
            >
              <Text
                style={{
                  color: defaultAddress?._id === item?._id ? "#fff" : "#000",
                }}
              >
                {defaultAddress?._id === item?._id
                  ? "Default Address"
                  : "Set as Default"}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default AddressItems;

const styles = StyleSheet.create({});
