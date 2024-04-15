import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Layout/Header";
import axios from "axios";

const UserProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [addressList, setAddressList] = useState([]);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsersSpesificAddress = async () => {
      try {
        await axios
          .get("/address/getAll-address", {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          })
          .then((res) => {
            const filterdArray = res.data.addresses.filter((item) => {
              return route.params?.data?.address
                .map((i) => i.toString())
                .includes(item._id.toString());
            });
            setAddressList(filterdArray);
          });
      } catch (error) {
        alert(error);
      }
    };
    getUsersSpesificAddress();
  }, []);

  const uderDeleteHandler = async () => {
    try {
      await axios
        .delete(`/user/delete/${route.params?.data?._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          Alert.alert(res.data.message);
          dispatch({
            type: "UPDATE_USER",
          });
          navigation.goBack();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<Ionicons name="arrow-back-sharp" size={22} color="black" />}
        rightIcon={<FontAwesome name="user-o" size={22} color="black" />}
        rightOnClick={() => {
          navigation.navigate("Profile");
        }}
        leftOnclick={() => {
          navigation.goBack();
        }}
        search={false}
        title={"User Profile"}
      />
      {route.params?.data?.avatar?.url ? (
        <Image
          source={{ uri: route.params?.data?.avatar?.url }}
          style={{
            width: 120,
            height: 120,
            objectFit: "cover",
            alignSelf: "center",
            marginVertical: 20,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/images/shopping.png")}
          style={{
            width: 120,
            height: 120,
            objectFit: "cover",
            alignSelf: "center",
            marginVertical: 20,
          }}
        />
      )}
      <View style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Text
          style={{
            color: "#000",
            fontWeight: "700",
            fontSize: 17,
          }}
        >
          Name: {route.params?.data?.name}
        </Text>
        <Text
          style={{
            color: "#000",
            fontWeight: "700",
            fontSize: 15,

            marginVertical: 10,
          }}
        >
          Email: {route.params?.data?.email}
        </Text>
        <Text
          style={{
            color: "#000",
            fontWeight: "700",
            fontSize: 15,

            marginBottom: 10,
          }}
        >
          Role: {route.params?.data?.role}
        </Text>
      </View>
      <View style={styles.addressContainer}>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 18,
            fontWeight: "600",
            color: "#020279",
          }}
        >
          All Address ({addressList.length})
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {addressList &&
            addressList.map((item, index) => (
              <Pressable
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 13,
                  marginTop: 10,
                  backgroundColor: "#f0f0f0",
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="#da1919" />
                </View>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 12, textAlign: "center" }}
                >
                  {item.city},{item.state}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 12, textAlign: "center" }}
                >
                  {item.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 12, textAlign: "center" }}
                >
                  {item.pincode}
                </Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
      <Pressable
        onPress={() => {
          Alert.alert(
            "Delete the user",
            "Are you sure you want to remove the user?",
            [
              {
                text: "Yes",
                onPress: () => uderDeleteHandler(),
              },
              {
                text: "No",
                onPress: () => console.log("No"),
              },
            ]
          );
        }}
        style={{
          padding: 10,
          width: "90%",
          alignSelf: "center",
          marginVertical: 20,
          backgroundColor: "#000",
          borderRadius: 10,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Delete User
        </Text>
      </Pressable>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  addressContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
});
