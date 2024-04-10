import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../../components/Layout/Header";
import Category from "../../components/Category";
import Carousol from "../../components/Carousol";
import { Carousolimage } from "../../data/seedData";
import ProductsData from "../../components/Products/ProductsData";
import TopSellingProducts from "../../components/Products/TopSellingProducts";

const Home = () => {
  const [productsList, setProductList] = useState([]);
  const [topProductsList, setTopProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([{ label: "", value: "" }]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        await axios
          .get("/category/getAll-category")
          .then((res) => {
            const categoryArray = [
              {
                label: "All",
                value: "",
              },
            ];
            setCategory(res.data.categories);
            res.data.categories.map((item) => {
              categoryArray.push({
                label: item.name,
                value: item.name,
              });
            });
            setItems(categoryArray);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);
  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(`/product/getAll-products?category=${value}`)
        .then((res) => {
          setProductList(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProduct();
  }, [value]);
  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get("/product/getTop-products")
        .then((res) => {
          setTopProductList(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProduct();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIcon={<AntDesign name="menu-fold" size={22} color="#383838" />}
        rightIcon={<Feather name="shopping-cart" size={22} color="#343434" />}
        rightOnClick={() => {}}
        leftOnclick={() => {}}
        search={true}
      />
      <ScrollView>
        <Category category={category} />
        <Carousol image={Carousolimage} />
        <Text style={styles.fieldText}>Top Selling Products</Text>
        <TopSellingProducts topPrductList={topProductsList} />

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <Text style={styles.fieldText}>Top Deals</Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
          }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"Choose Category"}
          />
        </View>
        <ProductsData productsList={productsList} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  fieldText: {
    fontWeight: "bold",
    color: "#515151",
    margin: 10,
    marginLeft: 15,
    fontSize: 16,
  },
});