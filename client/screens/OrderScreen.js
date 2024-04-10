import { View, Text, SafeAreaView, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("BottomTabs", { screen: "Home" });
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
      >
        <Image
          source={require("../assets/images/success.gif")}
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;
