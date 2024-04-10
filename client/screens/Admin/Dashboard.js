import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Layout/Header";

const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<Ionicons name="arrow-back-sharp" size={22} color="black" />}
        rightIcon={<FontAwesome name="user-o" size={22} color="black" />}
        rightOnClick={() => {
          navigation.navigate("BottomTabs", { screen: "Profile" });
        }}
        leftOnclick={() => {
          navigation.goBack();
        }}
        search={false}
        title={"Admin Dashboard"}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 40,
            width: "100%",
            backgroundColor: "#6eaaef",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ paddingLeft: 20, fontWeight: "500" }}>
            Welcome to Admin Dashboard
          </Text>
        </View>
        <Pressable style={styles.btn}>
          <FontAwesome5 name="house-user" size={21} color="black" />
          <Text style={{ color: "#000", fontSize: 17, fontWeight: "500" }}>
            Manage Product
          </Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <MaterialIcons name="category" size={21} color="black" />
          <Text style={{ color: "#000", fontSize: 17, fontWeight: "500" }}>
            Manage Categories
          </Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <FontAwesome5 name="users-cog" size={21} color="black" />
          <Text style={{ color: "#000", fontSize: 17, fontWeight: "500" }}>
            Manage Users
          </Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("AdminOrders")}
        >
          <FontAwesome5 name="gifts" size={21} color="black" />
          <Text style={{ color: "#000", fontSize: 17, fontWeight: "500" }}>
            Manage Orders
          </Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <AntDesign name="appstore-o" size={21} color="black" />
          <Text style={{ color: "#000", fontSize: 17, fontWeight: "500" }}>
            About App
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
  },
});
