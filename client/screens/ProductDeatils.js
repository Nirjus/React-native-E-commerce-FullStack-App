import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import {
  Foundation,
  Ionicons,
  Feather,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import Header from "../components/Layout/Header";
import axios from "axios";
import ProductCard from "../components/Products/ProductCard";

const ProductDeatils = () => {
  const { width } = Dimensions.get("window");
  const route = useRoute();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const [relatedItemList, setRelatedItemList] = useState([]);
  const navigation = useNavigation();
  const { data } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const discountPrice = route.params.data.price;
  const actualPrice =
    discountPrice + discountPrice * (route.params.data.offer / 100);

  const isItemWishlisted = wishlist.find(
    (item) => item._id === route.params.data._id
  );
  const addToWishListHandler = () => {
    dispatch({
      type: "ADDTO_WISHLIST",
      payload: route.params.data,
    });
  };
  const addToCartHandler = async () => {
    const user = await AsyncStorage.getItem("@auth");
    // const userData = JSON.parse(user)
    if (user === null) {
      Alert.alert("Sign In required", "SignIn or create your Account", [
        {
          text: "SignIn",
          onPress: () => navigation.navigate("Login"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
        },
      ]);
    } else {
      dispatch({
        type: "ADDTO_CART",
        payload: {
          item: { ...route.params.data, quantity },
          qty: quantity,
        },
      });
      Alert.alert("Item add to Cart");
    }
  };
  const buyNowHandler = async () => {
    const user = await AsyncStorage.getItem("@auth");
    if (user === null) {
      Alert.alert("Sign In required", "SignIn or create your Account", [
        {
          text: "SignIn",
          onPress: () => navigation.navigate("Login"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
        },
      ]);
    } else {
      const item = { ...route.params.data, quantity };
      navigation.navigate("Checkout", { data: item });
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(`/product/getAll-products?category=${route.params?.data.category}`)
        .then((res) => {
          setRelatedItemList(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProduct();
  }, []);
  const shareImage = async (url) => {
    try {
      // Download the image to a local file
      const fileUri = FileSystem.documentDirectory + "shared_image.jpg";
      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      // Share the local file
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<Ionicons name="arrow-back-sharp" size={24} color="black" />}
        rightIcon={
          <View style={{ position: "relative" }}>
            <Feather name="shopping-cart" size={24} color="black" />
            <View
              style={{
                backgroundColor: "#f7143e",
                height: 15,
                width: 15,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -5,
                right: -5,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 10 }}>
                {data?.length}
              </Text>
            </View>
          </View>
        }
        rightOnClick={() => {
          navigation.navigate("BottomTabs", { screen: "Cart" });
        }}
        leftOnclick={() => {
          navigation.goBack();
        }}
        search={true}
      />
      <ScrollView>
        {/* <View style={styles.imgContainer}> */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {route.params.data.images.map((img, index) => (
            <ImageBackground
              resizeMode="contain"
              style={{
                width: width,
                height: width,
                backgroundColor: "#fff",
              }}
              source={{ uri: img.url }}
              key={index}
            >
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {route.params.data.offer}% Off
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    shareImage(img.url);
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#c9c8c8",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Entypo name="share" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => addToWishListHandler()}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#c9c8c8",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 10,
                  marginBottom: 20,
                }}
              >
                {isItemWishlisted ? (
                  <AntDesign name="heart" size={24} color="#c82626" />
                ) : (
                  <AntDesign name="hearto" size={24} color="black" />
                )}
              </TouchableOpacity>
            </ImageBackground>
          ))}
        </ScrollView>
        {/* </View> */}
        <View style={styles.container}>
          <Text style={styles.title}>{route.params.data.name}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
              paddingRight: 10,
            }}
          >
            <View style={{ width: 100 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={20}
                rating={route.params.data.rating}
                fullStarColor={"#e8ca08"}
                halfStarEnabled={true}
              />
            </View>
            <View style={styles.ratingSection}>
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                {route.params.data?.rating}
              </Text>
              <Foundation name="star" size={20} color="#ffffff" />
            </View>
          </View>

          <Text style={{ height: 1, borderColor: "#DBDBDB", borderWidth: 1 }} />
          <Text style={styles.description}>
            {route.params.data.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{ color: "#c20505", textDecorationLine: "line-through" }}
            >
              ₹{actualPrice}
            </Text>
            <Text style={[styles.title, { color: "green" }]}>
              ₹{route.params.data.price}
            </Text>
            <Text style={{ fontSize: 12, color: "#7a7a7a" }}>
              (Save upto {route.params.data.offer}%)
            </Text>
          </View>
          <Text style={{ height: 1, borderColor: "#DBDBDB", borderWidth: 1 }} />
          {route.params.data.stock > 0 ? (
            <Text
              style={{
                marginLeft: 10,
                color: "green",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              •In Stock
            </Text>
          ) : (
            <Text
              style={{
                marginLeft: 10,
                color: "red",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              •Out of Stock
            </Text>
          )}
          <View
            style={[styles.btnContainer, { justifyContent: "space-between" }]}
          >
            <Text>Select quantity: </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnQty}
                onPress={() =>
                  setQuantity(quantity <= 1 ? quantity : quantity - 1)
                }
              >
                <Text style={styles.btnQtyTxt}>-</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity
                style={styles.btnQty}
                onPress={() => {
                  if (quantity >= 10) {
                    alert("You cant add more than 10 items at a time");
                  } else if (route.params.data.stock <= 0) {
                    alert("Product is out of stock");
                  } else {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                <Text style={styles.btnQtyTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => addToCartHandler()}
            disabled={route.params.data.stock <= 0}
          >
            <Text style={styles.btnTxt}>
              {route.params.data.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addToCartBtn, { backgroundColor: "#ef4731" }]}
            onPress={() => buyNowHandler()}
            disabled={route.params.data.stock <= 0}
          >
            <Text style={styles.btnTxt}>
              {route.params.data.stock > 0 ? "BUY NOW" : "OUT OF STOCK"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reviewSection}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 15,
              color: "#5a61ab",
              marginTop: 10,
              marginBottom: 5,
              marginHorizontal: 10,
            }}
          >
            Reviews
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginHorizontal: 10,
              color: "#6e6e6e",
              marginBottom: 5,
            }}
          >
            item Revied by
          </Text>
          {route.params?.data?.reviews.length !== 0 ? (
            <>
              {route.params?.data?.reviews.map((item, index) => (
                <View style={{ marginBottom: 15 }} key={item._id}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          index % 2 === 0 ? "#9f9f9f" : "#8be9ac",
                      }}
                    >
                      <Text>{item?.name.substring(0, 1)}</Text>
                    </View>
                    <View style={{ width: "85%" }}>
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: 16,
                          fontStyle: "italic",
                        }}
                      >
                        {item?.name}
                      </Text>
                      <View style={styles.reviewContentSection}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginBottom: 10,
                          }}
                        >
                          <View style={{ width: 80 }}>
                            <StarRating
                              disabled={true}
                              maxStars={5}
                              starSize={15}
                              rating={item?.rating}
                              fullStarColor={"#ffb700"}
                              halfStarEnabled={true}
                            />
                          </View>

                          <Text
                            style={{
                              color: "#ffb700",
                              fontSize: 13,
                              fontWeight: "600",
                            }}
                          >
                            {item?.rating} ⭐ Rating
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 13,

                            textAlign: "justify",
                            color: "#000",
                          }}
                        >
                          {item?.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <Text
              style={{
                marginVertical: 10,
                textAlign: "center",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {route.params?.data?.reviews.length} reviews till now!
            </Text>
          )}
          {/* <View style={{ marginBottom: 15 }}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#9f9f9f",
                }}
              >
                <Text>P</Text>
              </View>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 16,
                  fontStyle: "italic",
                }}
              >
                Prakash raj
              </Text>
            </View>
            <View style={styles.reviewContentSection}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <View style={{ width: 100 }}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={18}
                    rating={4}
                    fullStarColor={"#ffb700"}
                    halfStarEnabled={true}
                  />
                </View>

                <Text
                  style={{ color: "#ffb700", fontSize: 13, fontWeight: "600" }}
                >
                  4 ⭐ Rating
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 13,
                  padding: 5,
                  textAlign: "justify",
                  color: "#000",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </View>
          </View> */}
        </View>
        <View style={styles.relatedItems}>
          <Text style={styles.relatedItemHeader}>Related Items</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicato={false}
            data={relatedItemList}
            renderItem={({ item, index }) => (
              <ProductCard product={item} key={item?._id} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDeatils;

const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: "#fff",
  },
  image: {
    height: 300,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 12,
    color: "#000",
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
  },
  addToCartBtn: {
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
  },
  btnTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  btnQtyTxt: {
    fontSize: 20,
    fontWeight: "500",
  },
  btnQty: {
    backgroundColor: "lightgrey",
    width: 30,
    height: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#07b507",
    borderRadius: 5,
    padding: 5,
  },
  reviewSection: {
    marginTop: 15,
    backgroundColor: "#f0f1fe",
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    elevation: 5,
  },
  reviewContentSection: {
    backgroundColor: "#ffffff",
    padding: 7,
    borderRadius: 10,
    height: "auto",
  },
  relatedItems: {
    marginVertical: 20,
  },
  relatedItemHeader: {
    marginVertical: 10,
    marginHorizontal: 20,
    fontWeight: "bold",
    color: "#000",
    fontSize: 17,
  },
});
