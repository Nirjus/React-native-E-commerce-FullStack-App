import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const Category = ({ category: categoryData }) => {
  const navigation = useNavigation();

  return (
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
                <Image
                  source={{ uri: category.icon.url }}
                  style={styles.categoryImag}
                />
                <Text style={{ textTransform: "capitalize" }}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
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
    backgroundColor: "#fff",
    padding: 5,
    flexDirection: "row",
    paddingVertical: 10,
  },
  categoryItem: {
    padding: 10,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: "#ececec",
  },
});
