import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PriceTaible = ({ price, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.priceTxt}>{title}</Text>
      <Text style={{ color: "green" }}>₹{price.toFixed(1)}</Text>
    </View>
  );
};

export default PriceTaible;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  priceTxt: {
    color: "#000",
    fontWeight: "700",
  },
});
