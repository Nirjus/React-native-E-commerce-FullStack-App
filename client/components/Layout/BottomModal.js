import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const BottomModal = ({ openModal, onClose, addressList }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { defaultAddress } = useSelector((state) => state.address);

  return (
    <Modal animationType="slide" transparent visible={openModal}>
      <View style={{ backgroundColor: "#00000027", flex: 1 }}>
        <Pressable
          style={styles.overlay}
          onPress={() => {
            onClose();
          }}
        ></Pressable>
        <Pressable style={styles.mainView}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Choose your location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 14, color: "grey" }}>
              Select a delevery location to see product availability and delever
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* {add address} */}
              {addressList &&
                addressList.map((item, index) => (
                  <Pressable
                    onPress={() => {
                      dispatch({
                        type: "SET_DEFAULT_ADDRESS",
                        payload: item,
                      });
                    }}
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
                      backgroundColor:
                        defaultAddress?._id === item?._id
                          ? "#feb98f"
                          : "#f0f0f0",
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
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  navigation.navigate("AddAddress");
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  backgroundColor: "#F0F0F0",
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ textAlign: "center", color: "#0066b2" }}>
                  Add an address or pick-up point
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons name="locate-sharp" size={24} color="black" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Use my current Location
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <AntDesign name="earth" size={22} color="black" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Delivery Outside India
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons name="location-outline" size={24} color="black" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Enter an Indian pincode
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  mainView: {
    width: Dimensions.get("screen").width,
    height: "60%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end", // Pushes the modal to the top of the screen
  },
});
