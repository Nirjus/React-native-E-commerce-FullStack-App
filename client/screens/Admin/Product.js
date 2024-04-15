import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Loader";
import { useSelector, useDispatch } from "react-redux";

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [name, setName] = useState(route.params?.data?.name || "");
  const [description, setDescription] = useState(
    route.params?.data?.description || ""
  );
  const [price, setPrice] = useState(route.params?.data?.price || "");
  const [stock, setStock] = useState(route.params?.data?.stock || "");
  const [offer, setOffer] = useState(route.params?.data?.offer || "");
  const [category, setCategory] = useState(route.params?.data?.category || "");
  const [image, setImage] = useState({
    url: "",
    id: "",
  });
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{ label: "", value: "" }]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        await axios
          .get("/category/getAll-category")
          .then((res) => {
            const categoryArray = [];
            res.data.categories.map((item) => {
              categoryArray.push({
                label: item.name,
                value: item.name,
              });
            });
            setItems(categoryArray);
          })
          .catch((error) => {
            Alert.alert(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ url: result.assets[0].uri, id: 123 });
      if (route.params?.data) {
        Alert.alert("Add Image", "Press ok to add image", [
          {
            text: "OK",
            onPress: () => handleAddImage(result.assets[0].uri),
          },
          {
            text: "Cancel",
            onPress: () =>
              setImage({
                url: "",
                id: "",
              }),
          },
        ]);
      }
    }
  };
  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: image.url,
        name: new Date() + "_profile",
        type: "image/jpeg",
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("offer", offer);
      formData.append("category", category);

      await axios
        .post("/product/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_PRODUCT",
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

  const handleUpdateProduct = async () => {
    try {
      setLoading(true);
      await axios
        .put(
          `/product/${route.params?.data?._id}`,
          {
            name,
            description,
            price,
            stock,
            offer,
            category,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_PRODUCT",
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
  const handleUpdateImage = async (url, id) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: url,
        name: new Date() + "_profile",
        type: "image/jpeg",
      });
      setLoading(true);
      await axios
        .put(
          `/product/image-update/${route.params?.data?._id}?imageId=${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_PRODUCT",
          });
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          setImage({
            url: "",
            id: "",
          });
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const updateImagePopup = async (id) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage({
        url: result.assets[0].uri,
        id: id,
      });
      Alert.alert("Update imgae", "select an Image then Update", [
        {
          text: "OK",
          onPress: () => handleUpdateImage(result.assets[0].uri, id),
        },
        {
          text: "Cancel",
          onPress: () =>
            setImage({
              url: "",
              id: "",
            }),
        },
      ]);
    }
  };
  const handleAddImage = async (url) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: url,
        name: new Date() + "_profile",
        type: "image/jpeg",
      });
      setLoading(true);

      await axios
        .put(`/product/image/${route.params?.data?._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_PRODUCT",
          });
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          setImage({
            url: "",
            id: "",
          });
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const deleteImageHandler = async (id) => {
    try {
      setLoading(true);
      await axios
        .delete(
          `/product/delete-image/${route.params?.data?._id}?imageId=${id}`,
          {
            headers: {
              Authorization: token,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_PRODUCT",
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
        title={`${route.params?.data ? "Update Product" : "Add Products"}`}
      />
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={{
              marginVertical: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {route.params?.data &&
              route.params?.data?.images?.map((img) => (
                <Pressable
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor: "#000",
                    height: 200,
                    width: 200,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                  key={img._id}
                >
                  <ImageBackground
                    resizeMode="contain"
                    source={{ uri: image.id === img._id ? image.url : img.url }}
                    style={{
                      height: 195,
                      width: "100%",
                      objectFit: "contain",
                      borderRadius: 5,
                    }}
                  >
                    {route.params?.data && (
                      <View>
                        <Pressable
                          onPress={() => updateImagePopup(img._id)}
                          style={{
                            backgroundColor: "#000000",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            marginHorizontal: 10,
                            marginTop: 5,
                          }}
                        >
                          <Feather name="edit" size={18} color="#ffffff" />
                        </Pressable>
                        <Pressable
                          onPress={() => deleteImageHandler(img._id)}
                          style={{
                            backgroundColor: "#000000",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            marginHorizontal: 10,
                            marginTop: 10,
                          }}
                        >
                          <MaterialIcons
                            name="delete-outline"
                            size={24}
                            color="#ffffff"
                          />
                        </Pressable>
                      </View>
                    )}
                  </ImageBackground>
                </Pressable>
              ))}
            {image.id === 123 ? (
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
                  source={{ uri: image.url }}
                  resizeMode="contain"
                  style={{
                    height: 195,
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: 5,
                  }}
                />
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
                  Add Image
                </Text>
                <Text
                  style={{
                    color: "#6c6b6b",
                    fontSize: 14,
                    textAlign: "center",
                    marginHorizontal: 20,
                  }}
                >
                  Image must contain white background
                </Text>
              </Pressable>
            )}
          </Pressable>
        </ScrollView>
        <View style={{ width: "auto", marginBottom: 15 }}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            placeholder="Enter Product Title"
            placeholderTextColor={"#adadad"}
            value={name}
            onChangeText={(txt) => setName(txt)}
            style={styles.input}
          />
        </View>
        <View style={{ width: "auto", marginBottom: 5 }}>
          <Text style={styles.title}>Description</Text>
          <TextInput
            placeholder="Enter Product Description"
            placeholderTextColor={"#adadad"}
            value={description}
            multiline
            numberOfLines={3}
            onChangeText={(txt) => setDescription(txt)}
            style={styles.input}
          />
        </View>
        <View style={{ width: "auto", marginBottom: 10 }}>
          <Text style={styles.title}>Price</Text>
          <TextInput
            placeholder="Enter Product Price"
            placeholderTextColor={"#adadad"}
            value={price.toString()}
            keyboardType="numeric"
            onChangeText={(txt) => setPrice(Number(txt))}
            style={styles.input}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            paddingVertical: 5,
            width: 250,
          }}
        >
          <DropDownPicker
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder={"Choose Category"}
          />
        </View>
        <View style={{ width: "auto", marginBottom: 10 }}>
          <Text style={styles.title}>Stock</Text>
          <TextInput
            placeholder="Enter Product Stock"
            placeholderTextColor={"#adadad"}
            value={stock.toString()}
            keyboardType="numeric"
            onChangeText={(txt) => setStock(Number(txt))}
            style={styles.input}
          />
        </View>
        <View style={{ width: "auto", marginBottom: 10 }}>
          <Text style={styles.title}>Offer</Text>
          <TextInput
            placeholder="Enter Product Offers"
            placeholderTextColor={"#adadad"}
            value={offer.toString()}
            keyboardType="numeric"
            onChangeText={(txt) => setOffer(Number(txt))}
            style={styles.input}
          />
        </View>
        <Pressable
          onPress={() => {
            if (route.params?.data) {
              handleUpdateProduct();
            } else {
              handleCreateProduct();
            }
          }}
          style={styles.submitBtn}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {route.params?.data ? "Update" : "Create"}
          </Text>
        </Pressable>
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default Product;

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
