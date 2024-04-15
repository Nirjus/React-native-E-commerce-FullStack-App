import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import Header from "../../components/Layout/Header";
import axios from "axios";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

const AdminUsers = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        await axios.get("/user/getAll-users").then((res) => {
          setLoading(false);
          setUsers(res.data.users);
        });
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getAllUsers();
  }, [updateUser]);
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
        title={"Admin Users"}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.headrTxt}>Manage users</Text>
        <FlatList
          data={users}
          renderItem={({ item, index }) => (
            <Pressable
              key={item._id}
              style={styles.userCard}
              onPress={() => navigation.navigate("UserProfile", { data: item })}
            >
              {item?.avatar?.url ? (
                <Image
                  source={{ uri: item.avatar?.url }}
                  style={{ width: 50, height: 50, borderRadius: 99 }}
                />
              ) : (
                <Image
                  source={require("../../assets/images/shopping.png")}
                  style={{ width: 50, height: 50, borderRadius: 99 }}
                />
              )}
              <View style={styles.textContainer}>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      fontSize: 16,
                    }}
                  >
                    {item?.name}
                  </Text>
                  {item?.role === "Admin" && (
                    <MaterialIcons name="verified" size={18} color="black" />
                  )}
                </View>
                <Text
                  style={{ color: "#5f5f5f", fontSize: 12, fontWeight: "400" }}
                >
                  {item?.email}
                </Text>
              </View>
              <View style={styles.arrowRight}>
                <AntDesign name="arrowright" size={24} color="#696969" />
              </View>
            </Pressable>
          )}
        />
      </View>
      <Loader visible={loading} />
    </View>
  );
};

export default AdminUsers;

const styles = StyleSheet.create({
  headrTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  userCard: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  textContainer: {
    marginLeft: 15,
  },
  arrowRight: {
    position: "absolute",
    right: 10,
  },
});
