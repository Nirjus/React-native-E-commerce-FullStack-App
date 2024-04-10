import { StyleSheet, View } from "react-native";
import React from "react";

import ProductCard from "./ProductCard";

const ProductsData = ({ productsList }) => {
  return (
    <View style={styles.container}>
      {productsList.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </View>
  );
};

export default ProductsData;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    marginBottom: 20,
  },
});
