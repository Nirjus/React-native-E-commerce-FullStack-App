import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Layout/Header";
import { useNavigation } from "@react-navigation/native";
import WishlistItem from "../../components/wishlist/WishlistItem";

const Notification = () => {
  const navigation = useNavigation();
  const [wishlistData, setWishListData] = useState([]);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist) {
      setWishListData(wishlist);
    }
  }, [wishlist]);

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
  );
};

export default Notification;

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginVertical: 10,
  },
});
