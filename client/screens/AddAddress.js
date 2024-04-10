import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather, Ionicons, Octicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Layout/Header";
import AddressItems from "../components/Address/AddressItems";

const AddAddress = () => {
  const navigation = useNavigation();

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
        title={"Add Address"}
      />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Address</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Address");
            }}
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Add new Address</Text>
            <Octicons name="chevron-right" size={22} color="black" />
          </Pressable>
          <AddressItems />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({});
