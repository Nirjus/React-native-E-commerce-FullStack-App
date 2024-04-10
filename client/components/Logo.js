import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Logo = ({ height, width }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../assets/images/letter-c.png")}
        style={[styles.image, { height: height, width: width }]}
      />
      <Image
        source={require("../assets/images/letter-a.png")}
        style={[styles.image, { height: height, width: width }]}
      />
      <Image
        source={require("../assets/images/letter-r.png")}
        style={[styles.image, { height: height, width: width }]}
      />
      <Image
        source={require("../assets/images/letter-t.png")}
        style={[styles.image, { height: height, width: width }]}
      />
      <Image
        source={require("../assets/images/letter-e.png")}
        style={[styles.image, { height: height, width: width }]}
      />
      <Image
        source={require("../assets/images/letter-f.png")}
        style={[styles.image, { height: height, width: width }]}
      />
      <Image
        source={require("../assets/images/letter-y.png")}
        style={[styles.image, { height: height, width: width }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    objectFit: "contain",
  },
});

export default Logo;
