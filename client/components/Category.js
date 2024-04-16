import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const Category = ({ category: categoryData }) => {
  const navigation = useNavigation();

  return (
    <View style={{ paddingTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            textTransform: "capitalize",
            fontSize: 16,
            fontWeight: "700",
            color: "#535151",
          }}
        >
          Categories
        </Text>
        <AntDesign name="arrowright" size={20} color="black" />
      </View>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoryData.map((category) => {
            return (
              <View key={category._id} style={styles.categoryItem}>
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() =>
                    navigation.navigate("CategoryPage", {
                      data: category,
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      padding: 8,
                      borderRadius: 5,
                    }}
                  >
                    <Image
                      source={{ uri: category.icon.url }}
                      style={styles.categoryImag}
                    />
                  </View>
                  <Text
                    style={{
                      textTransform: "capitalize",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryImag: {
    height: 40,
    width: 40,
  },
  container: {
    padding: 5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  categoryItem: {
    padding: 10,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    borderRadius: 5,
  },
});
