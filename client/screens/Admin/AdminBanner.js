import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Layout/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const AdminBanner = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setBannerImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    const getAllBanner = async () => {
      await axios.get("/banner/getAll-banner").then((res) => {
        setBanners(res.data.banners);
      });
    };
    getAllBanner();
  }, [loading]);
  const handleCreateBanner = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: bannerImage,
        name: new Date() + "_profile",
        type: "image/jpeg",
      });
      formData.append("name", name);
      await axios
        .post("/banner/create", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          setLoading(false);
          Alert.alert(res.data.message);
          setName("");
          setBannerImage("");
          setPage(2);
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
  const deleteHndler = async (id) => {
    try {
      setLoading(true);
      await axios
        .delete(`/banner/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          setLoading(false);
          Alert.alert(res.data.message);
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
        title={"Mange Banner"}
      />
      {page === 1 && (
        <View>
          <Text
            style={{
              fontWeight: "900",
              fontSize: 15,
              color: "#000",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Set your Banner
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.inputTxt}>Banner Name</Text>
            <TextInput
              placeholder="Banner Name"
              placeholderTextColor={"#8e8e8e"}
              style={styles.input}
              value={name}
              onChangeText={(txt) => setName(txt)}
            />
          </View>
          <View style={{ marginTop: 20, marginLeft: 20 }}>
            {bannerImage ? (
              <Pressable onPress={() => pickImage()}>
                <Image
                  source={{ uri: bannerImage }}
                  style={{
                    width: "90%",
                    height: 200,
                    objectFit: "cover",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            ) : (
              <Pressable
                style={styles.pickImage}
                disabled={loading}
                onPress={() => pickImage()}
              >
                <Text>Set Banner</Text>
                <Text>Image</Text>
              </Pressable>
            )}
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => handleCreateBanner()}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Add Banner</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => setPage(2)}
            style={{
              backgroundColor: "#d8d8d8",
              borderWidth: 0.5,
              width: 150,
              padding: 10,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
              alignSelf: "center",
            }}
          >
            <Text>See All Banners</Text>
            <AntDesign name="rightcircleo" size={20} color="black" />
          </Pressable>
        </View>
      )}
      {page === 2 && (
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              textAlign: "center",
              color: "#000",
              marginVertical: 10,
            }}
          >
            All banners
          </Text>
          <AntDesign
            name="leftcircleo"
            size={24}
            color="black"
            style={{ position: "absolute", top: 10, left: 20 }}
            onPress={() => setPage(1)}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {banners &&
              banners.map((item, index) => (
                <Pressable key={index} style={{ padding: 5, marginBottom: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontStyle: "italic",
                        marginBottom: 5,
                        marginTop: 6,
                        color: "#000",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Feather
                      name="delete"
                      size={22}
                      color="black"
                      onPress={() => {
                        Alert.alert(
                          "Delete Banner",
                          "Are you sure you want to delete this banner",
                          [
                            {
                              text: "Yes",
                              onPress: () => deleteHndler(item?._id),
                            },
                            {
                              text: "No",
                              onPress: () => console.log("No"),
                            },
                          ]
                        );
                      }}
                    />
                  </View>
                  <Image
                    source={{ uri: item?.bannerImage?.url }}
                    style={{ width: "100%", height: 250, objectFit: "contain" }}
                  />
                </Pressable>
              ))}
          </ScrollView>
          {banners.length === 0 && (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                marginVertical: 20,
              }}
            >
              No Banners Have 🤧
            </Text>
          )}
        </View>
      )}
      <Loader visible={loading} />
    </View>
  );
};

export default AdminBanner;

const styles = StyleSheet.create({
  inputTxt: {
    fontWeight: "400",
    fontSize: 15,
    color: "#000",
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    height: 45,
    width: 250,
    backgroundColor: "#DFDFDF",
    paddingHorizontal: 10,
    color: "#000",
  },
  pickImage: {
    borderWidth: 1,
    borderRadius: 5,
    height: 200,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    width: "85%",
    alignSelf: "center",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#000",
    marginVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  allbaner: {},
});
