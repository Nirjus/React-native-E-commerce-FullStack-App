import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import ProductsData from "../components/Products/ProductsData";
import Loader from "../components/Loader";

const CategoryPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [productsList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.cart);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      await axios
        .get(`/product/getAll-products?category=${route.params.data?.name}`)
        .then((res) => {
          setLoading(false);
          setProductList(res.data.products);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    getProduct();
  }, [route]);
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<AntDesign name="arrowleft" size={22} color="#383838" />}
        rightIcon={
          <View style={{ position: "relative" }}>
            <Feather name="shopping-cart" size={24} color="black" />
            <View
              style={{
                backgroundColor: "#f7143e",
                height: 17,
                width: 17,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -4,
                right: -4,
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
        <View style={styles.iconBAr}>
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: route.params.data?.icon?.url }}
              style={styles.iconImage}
            />
            <Text style={styles.iconTitle}>{route.params.data?.name}</Text>
          </View>
        </View>
        <ProductsData productsList={productsList} />
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  iconContainer: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  iconBAr: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  iconTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7a18b8",
    textTransform: "capitalize",
    fontStyle: "italic",
  },
});
