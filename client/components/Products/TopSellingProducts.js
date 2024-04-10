import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

const TopSellingProducts = ({ topPrductList }) => {
  return (
    <View style={styles.container}>
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
});
