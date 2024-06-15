import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const Header = ({
  leftIcon,
  leftOnclick,
  rightIcon,
  rightOnClick,
  search = false,
  title,
}) => {
  const navigation = useNavigation();
  const [searchItem, setSearchItem] = React.useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState(1);
  const [productsList, setProductList] = useState([]);
  const handleSearch = async () => {
    await axios
      .get(
        `/product/getAll-products?keyword=${searchItem}&category=${category}`
      )
      .then((res) => {
        setProductList(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    handleSearch();
  }, [category, searchItem]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => leftOnclick()}
        >
          {leftIcon}
        </TouchableOpacity>
        {search ? (
          <View style={styles.searchView}>
            {method === 1 ? (
              <Pressable
                onPress={() => {
                  setMethod(2);
                  setSearchItem("");
                }}
              >
                <Image
                  source={require("../../assets/icon/keyword.png")}
                  style={{ width: 20, height: 20, tintColor: "#4c4c4c" }}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setMethod(1);
                  setCategory("");
                }}
              >
                <Image
                  source={require("../../assets/icon/category.png")}
                  style={{ width: 20, height: 20, tintColor: "#4c4c4c" }}
                />
              </Pressable>
            )}
            {method === 1 ? (
              <TextInput
                placeholder={"Search by keyword"}
                placeholderTextColor={"#7d7d7d"}
                style={styles.input}
                value={searchItem}
                onChangeText={(txt) => setSearchItem(txt)}
              />
            ) : (
              <TextInput
                placeholder={"Search by category"}
                placeholderTextColor={"#7d7d7d"}
                style={styles.input}
                value={category}
                onChangeText={(txt) => setCategory(txt)}
              />
            )}
          </View>
        ) : (
          <View style={{ width: "70%" }}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => rightOnClick()}
        >
          {rightIcon}
        </TouchableOpacity>
      </View>
      {productsList &&
        productsList.length !== 0 &&
        (category.length !== 0 || searchItem.length !== 0) && (
          <View
            style={{
              backgroundColor: "#fff",
              height: Dimensions.get("screen").height,
            }}
          >
            <FlatList
              data={productsList}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("ProductDetails", { data: item })
                  }
                  key={index}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    height: 45,
                    paddingHorizontal: 10,
                    alignItems: "center",
                    padding: 5,
                    marginHorizontal: 5,
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#868585",
                  }}
                >
                  <Image
                    source={{ uri: item.images[0].url }}
                    style={{ width: 35, height: 35 }}
                  />
                  <Text
                    style={{
                      color: "#231a87",
                      fontStyle: "italic",
                      width: "90%",
                    }}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
  },
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 45,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width,
    borderBottomWidth: 1,
    borderBottomColor: "#bebdbd",
  },
  headerBtn: {
    backgroundColor: "#eeeeee",
    borderRadius: 100,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: "#bebdbd",
  },
  searchView: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "70%",
    backgroundColor: "#eeeeee",
    borderWidth: 0.4,
    borderColor: "#bebdbd",
    borderRadius: 10,
  },
  input: {
    width: "85%",
    height: 35,
    color: "#000",
    paddingLeft: 5,
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
});
