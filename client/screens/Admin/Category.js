import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [name, setName] = useState(route.params?.data?.name || "");
  const [icon, setIcon] = useState(route.params?.data?.icon?.url || "");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIcon(result.assets[0].uri);
    }
  };

  const handleCretaeCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: icon,
        name: new Date() + "_profile",
        type: "image/jpeg",
      });
      formData.append("name", name);
      setLoading(true);
      await axios
        .post("/category/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_CATEGORY",
          });
          Alert.alert(res.data.message);
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: icon,
        name: new Date() + "_profile",
        type: "image/jpeg",
      });
      formData.append("name", name);
      setLoading(true);
      await axios
        .put(`/category/update/${route.params?.data?._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_CATEGORY",
          });
          Alert.alert(res.data.message);
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
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
        title={`${route.params?.data ? "Update Categoty" : "Create Category"}`}
      />
      <Pressable style={{ marginHorizontal: 25, marginVertical: 15 }}>
        {icon ? (
          <Pressable
            onPress={() => pickImage()}
            style={{
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: "#000",
              height: 200,
              width: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={{ uri: icon }}
              resizeMode="contain"
              style={{
                height: 195,
                width: "100%",
                objectFit: "contain",
                borderRadius: 5,
              }}
            ></ImageBackground>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => pickImage()}
            style={{
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: "#000",
              height: 200,
              width: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#000",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              Add Icon
            </Text>
            <Text
              style={{
                color: "#6c6b6b",
                fontSize: 14,
                textAlign: "center",
                marginHorizontal: 20,
              }}
            >
              Icon must be contain FlatIcons
            </Text>
          </Pressable>
        )}
      </Pressable>
      <View style={{ width: "auto", marginBottom: 15 }}>
        <Text style={styles.title}>Name</Text>
        <TextInput
          placeholder="Enter Category Name"
          placeholderTextColor={"#adadad"}
          value={name}
          onChangeText={(txt) => setName(txt)}
          style={styles.input}
        />
      </View>
      <Pressable
        onPress={() => {
          if (route.params?.data) {
            handleUpdateCategory();
          } else {
            handleCretaeCategory();
          }
        }}
        style={{
          padding: 10,
          width: "90%",
          alignSelf: "center",
          backgroundColor: "#2e2e2e",
          marginVertical: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: 17,
            textAlign: "center",
          }}
        >
          {route.params?.data ? "Update" : "Create"}
        </Text>
      </Pressable>
      <Loader visible={loading} />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
    marginLeft: 25,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: "90%",
    borderRadius: 5,
    color: "#000",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  submitBtn: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#333333",
    marginVertical: 15,
  },
});
