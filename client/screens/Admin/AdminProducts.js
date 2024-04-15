import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../../components/Layout/Header";
import { useSelector, useDispatch } from "react-redux";

const AdminProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { updated } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.user);
  const [productsList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
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
  }, [value, updated]);
  const deleteProductHandler = async (id) => {
    try {
      await axios
        .delete(`/product/delete/${id}`, {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((res) => {
          dispatch({
            type: "UPDATE_PRODUCT",
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
        title={"Admin Products"}
      />
      <Text style={styles.heading}>Mange your Products</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            width: 160,
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
        <TouchableOpacity
          onPress={() => navigation.navigate("ProductWorks")}
          style={styles.addProductBtn}
        >
          <Text style={{ fontWeight: "400", color: "#000", fontSize: 13 }}>
            Add Product{" "}
          </Text>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }} />
      <FlatList
        data={productsList}
        renderItem={({ item, index }) => (
          <View key={item._id} style={styles.productItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item?.images[0].url }}
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "700", color: "#400505" }}
                >
                  {item?.name.substring(0, 30)}..
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: "#01940e",
                    }}
                  >
                    ₹{item?.price}
                  </Text>
                  <Text style={{ color: "#5d5c5c" }}>
                    {item?.rating}⭐ rating
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#706f6fba",
                    fontWeight: "700",
                    fontSize: 13,
                  }}
                >
                  Category:{" "}
                  <Text style={{ color: "#676767" }}>{item?.category}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.styledBtn}
                onPress={() =>
                  navigation.navigate("ProductDetails", { data: item })
                }
              >
                <Entypo name="eye" size={22} color="#6b6b6b" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductWorks", { data: item })
                }
                style={styles.styledBtn}
              >
                <Feather name="edit" size={22} color="#6b6b6b" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.styledBtn}
                onPress={() => {
                  Alert.alert(
                    "Delete Product",
                    "Are you sure you want to delete this Item",
                    [
                      {
                        text: "Yes",
                        onPress: () => deleteProductHandler(item?._id),
                      },
                      {
                        text: "No",
                        onPress: () => console.log("No"),
                      },
                    ]
                  );
                }}
              >
                <Feather name="delete" size={22} color="#6b6b6b" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
};

export default AdminProducts;

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  productItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "98%",
    padding: 5,
    alignSelf: "center",
  },
  styledBtn: {
    backgroundColor: "#ffffff",
    elevation: 3,
    borderRadius: 5,
    padding: 5,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  addProductBtn: {
    width: 150,
    padding: 10,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
  },
});
