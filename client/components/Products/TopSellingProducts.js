import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ProductCard from "./ProductCard";

const TopSellingProducts = ({ topPrductList }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          marginVertical: 10,
        }}
      >
        <Text style={styles.fieldText}>Top Selling Products</Text>
        <AntDesign name="arrowright" size={20} color="black" />
      </View>
      <FlatList
        data={topPrductList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCard key={item._id} product={item} />
        )}
      />
    </View>
  );
};

export default TopSellingProducts;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  fieldText: {
    fontWeight: "bold",
    color: "#515151",
    fontSize: 16,
  },
});
