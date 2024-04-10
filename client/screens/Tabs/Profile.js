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
import {
  Feather,
  Ionicons,
  Octicons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Layout/Header";
import BottomModal from "../../components/Layout/BottomModal";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [userinfo, setUserinfo] = useState({});

  const { user, token } = useSelector((state) => state.user);
  const { addresses, defaultAddress } = useSelector((state) => state.address);
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    } else {
      setUserinfo(user);
      const getAllAddress = async () => {
        await axios
          .get("/address/getMy-address", {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          })
          .then((res) => {
            dispatch({
              type: "LOAD_ADDRESS",
              payload: res.data.addressArray,
            });
          })
          .catch((error) => {
            Alert.alert(error.response.data.message);
          });
      };
      if (addresses.length === 0) {
        getAllAddress();
      }
    }
  }, [user, addresses]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await axios
          .get(`/order/getMyAll-orders`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          })
          .then((res) => {
            dispatch({
              type: "LOAD_ORDERS",
              payload: res.data.orders,
            });
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    loadOrders();
  }, []);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("@auth");
    await AsyncStorage.removeItem("@token");
    await axios
      .get("/user/logout")
      .then((res) => {
        Alert.alert(res.data.message);
        dispatch({
          type: "LOGOUT_SUCCESS",
        });
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <Header
          leftIcon={
            <Ionicons name="arrow-back-sharp" size={22} color="black" />
          }
          rightIcon={<Feather name="shopping-cart" size={22} color="black" />}
          rightOnClick={() => {
            navigation.navigate("BottomTabs", { screen: "Cart" });
          }}
          leftOnclick={() => {
            navigation.goBack();
          }}
          search={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => setOpenModal(true)}
            style={styles.addressBar}
          >
            <Ionicons name="location-outline" size={22} color="#000000" />
            {defaultAddress ? (
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#000" }}>
                Delever to {defaultAddress.name} - {defaultAddress.street}
              </Text>
            ) : (
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#000" }}>
                Add a address to delever
              </Text>
            )}
            {openModal ? (
              <Octicons
                name="chevron-up"
                size={22}
                style={{ marginLeft: 10 }}
                color="black"
              />
            ) : (
              <Octicons
                name="chevron-down"
                size={22}
                style={{ marginLeft: 10 }}
                color="black"
              />
            )}
          </Pressable>
          <View style={{ marginTop: 20 }}>
            {userinfo?.avatar?.url ? (
              <Image
                source={{ uri: userinfo?.avatar?.url }}
                style={styles.img}
              />
            ) : (
              <Image
                source={require("../../assets/images/shopping.png")}
                style={styles.img}
              />
            )}

            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "700", color: "#363636" }}
              >
                Hi <Text style={{ color: "#0ac40a" }}>{userinfo.name}</Text> 👋
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialIcons name="email" size={22} color="#636363" />
                  <Text>{userinfo.email}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <FontAwesome6
                    name="square-phone-flip"
                    size={20}
                    color="#636363"
                  />
                  <Text>
                    {userinfo.contact ? userinfo.contact : "Update Phone no"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgrey",
                }}
              >
                AccountSettings
              </Text>

              <Pressable
                style={styles.buttn}
                onPress={() =>
                  navigation.navigate("EditProfile", { data: userinfo })
                }
              >
                <Feather name="edit" size={22} color="#7a7a7a" />
                <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                  Edit Profile
                </Text>
              </Pressable>
              <Pressable
                style={styles.buttn}
                onPress={() => navigation.navigate("Orders")}
              >
                <Feather name="gift" size={22} color="#7a7a7a" />
                <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                  Orders
                </Text>
              </Pressable>
              <Pressable
                style={styles.buttn}
                onPress={() =>
                  navigation.navigate("BottomTabs", {
                    screen: "Notification",
                  })
                }
              >
                <Feather name="shopping-bag" size={22} color="#7a7a7a" />
                <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                  Wishlist
                </Text>
              </Pressable>
              {userinfo.role === "Admin" && (
                <Pressable
                  style={styles.buttn}
                  onPress={() => navigation.navigate("Admin")}
                >
                  <MaterialIcons
                    name="admin-panel-settings"
                    size={22}
                    color="#7a7a7a"
                  />
                  <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                    Admin Pannel
                  </Text>
                </Pressable>
              )}
            </View>
            <View style={styles.btnContainer}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgrey",
                }}
              >
                Other Settings
              </Text>
              <Pressable style={styles.buttn} onPress={() => logoutHandler()}>
                <MaterialIcons name="logout" size={22} color="#7a7a7a" />
                <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>

      <BottomModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        addressList={addresses}
      />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  addressBar: {
    width: "100%",
    height: 40,
    backgroundColor: "#7bd8f7",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
    resizeMode: "cover",
    alignSelf: "center",
  },
  btnContainer: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
    paddingBottom: 10,
  },
  buttn: {
    margin: 5,
    flexDirection: "row",
    width: 200,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#eaeaea",
    padding: 10,
  },
});
