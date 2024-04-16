import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Header from "../../components/Layout/Header";
import { useNavigation } from "@react-navigation/native";
import WishlistItem from "../../components/wishlist/WishlistItem";
import axios from "axios";

const Notification = () => {
  const navigation = useNavigation();
  const [wishlistData, setWishListData] = useState([]);
  const [banners, setBanners] = useState([]);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (wishlist) {
      setWishListData(wishlist);
    }
  }, [wishlist]);
  useEffect(() => {
    const getAllBanner = async () => {
      await axios.get("/banner/getAll-banner").then((res) => {
        setBanners(res.data.banners);
      });
    };
    getAllBanner();
  }, []);
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
        search={true}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={[
            styles.headerBt,
            { backgroundColor: page === 1 ? "#868ef2" : "#fff582" },
          ]}
          onPress={() => setPage(1)}
        >
          <Text style={{ fontSize: 11, color: "#ff8a16", fontWeight: "500" }}>
            Wishlist
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.headerBt,
            { backgroundColor: page === 2 ? "#868ef2" : "#fff582" },
          ]}
          onPress={() => setPage(2)}
        >
          <Text style={{ fontSize: 11, color: "#ff8a16", fontWeight: "500" }}>
            Event
          </Text>
        </Pressable>
      </View>
      {page === 1 && (
        <View>
          <Text style={styles.heading}>
            {wishlistData.length > 0
              ? `You have ${wishlistData.length} items in your wishlist`
              : `No items have! 🤧`}
          </Text>
          {wishlistData && wishlistData.length > 0 && (
            <FlatList
              data={wishlistData}
              renderItem={({ item, index }) => (
                <WishlistItem item={item} index={index} key={index} />
              )}
            />
          )}
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
            All Events
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
                <Pressable
                  key={index}
                  style={{
                    padding: 2,
                    marginBottom: 10,
                    height: 400,
                    borderBottomWidth: 1,
                    borderBottomColor: "#9d9d9d",
                  }}
                >
                  <Image
                    source={{ uri: item?.bannerImage?.url }}
                    style={{ width: "100%", height: 250, objectFit: "contain" }}
                  />
                  <Text
                    style={{
                      fontSize: 26,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      marginBottom: 5,
                      marginTop: 6,
                      color: "#644dff",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 5,
                      marginTop: 6,
                      color: "#000",
                    }}
                  >
                    Event Started from: {item?.createdAt.substring(0, 10)}
                  </Text>
                  <Text>Stay tuened for more Offers</Text>
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
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  headerBt: {
    // backgroundColor: "#fff582",
    padding: 5,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
