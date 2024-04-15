import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Header from "../../components/Layout/Header";
import { useSelector, useDispatch } from "react-redux";

const AdminCategory = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { updateCategory } = useSelector((state) => state.product);
  const [categories, setCategories] = useState([]);
  const [categoryLength, setCategoryLength] = useState("");

  useEffect(() => {
    const getAllcategories = async () => {
      await axios
        .get("/category/getAll-category")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoryLength(res.data.categoryLength);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    };
    getAllcategories();
  }, [updateCategory]);

  const deleteHandler = async (id) => {
    try {
      await axios
        .delete(`/category/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((res) => {
          dispatch({
            type: "UPDATE_CATEGORY",
          });
          Alert.alert(res.data.message);
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
        title={"Admin Categories"}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.headingTxt}>
          We have {categoryLength} Categories in our Shop
        </Text>

        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <View key={item._id} style={styles.categoryContainer}>
              <View
                style={{
                  backgroundColor: "#fff",
                  width: 130,
                  height: 130,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.icon.url }}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                  }}
                />
              </View>
              <Text style={styles.styledNmae}>{item.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    Alert.alert(
                      "Delete Category",
                      "are you sure you want to delete the category?",
                      [
                        {
                          text: "Yes",
                          onPress: () => deleteHandler(item._id),
                        },
                        {
                          text: "No",
                          onPress: () => console.log("No"),
                        },
                      ]
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete-circle"
                    size={26}
                    color="black"
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate("CategoryWorks", { data: item })
                  }
                >
                  <MaterialIcons name="edit-square" size={26} color="black" />
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("CategoryWorks")}
        style={{
          backgroundColor: "rgb(58, 76, 213)",
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
          position: "absolute",
          bottom: 30,
          right: 30,
        }}
      >
        <FontAwesome6 name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default AdminCategory;

const styles = StyleSheet.create({
  headingTxt: {
    fontStyle: "italic",
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 10,
  },
  categoryContainer: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.3,
    width: 200,
    height: 200,
    marginLeft: 20,
    marginVertical: 10,
  },
  styledNmae: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#540b0b",
    marginLeft: 35,
  },
});
