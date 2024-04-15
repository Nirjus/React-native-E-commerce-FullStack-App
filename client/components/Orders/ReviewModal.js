import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const ReviewModal = ({ visible, onClose, id, token }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const createReviewHandler = async () => {
    try {
      setLoading(true);
      await axios
        .put(
          `/product/${id}/review`,
          {
            comment,
            rating,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setComment("");
          setRating("");
          onClose();
          Alert.alert(res.data.message);
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.mainConatiner}>
          <View style={{ alignItems: "flex-end", padding: 5 }}>
            <Entypo
              name="cross"
              size={24}
              color="black"
              onPress={() => onClose()}
            />
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontWeight: "600",
                marginVertical: 5,
                marginHorizontal: 10,
              }}
            >
              Give Rating (out of 5)
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#DfDfDf",
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <AntDesign name="staro" size={20} color="#838383" />
              <TextInput
                placeholder="1 or 2 or 3 or 4 or 5"
                placeholderTextColor={"#8e8e8e"}
                style={styles.input}
                value={rating}
                onChangeText={(txt) => setRating(txt)}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <Text
              style={{
                color: "#000",
                fontWeight: "600",
                marginVertical: 5,
                marginHorizontal: 10,
              }}
            >
              Give Review
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                backgroundColor: "#DfDfDf",
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                name="reviews"
                size={24}
                color="#a0a0a0"
                style={{ marginTop: 15 }}
              />
              <TextInput
                placeholder="Give a review of this product based on your experience"
                placeholderTextColor={"#8e8e8e"}
                style={{
                  width: 180,
                  paddingLeft: 5,
                  backgroundColor: "#DfDfDf",
                }}
                multiline
                numberOfLines={6}
                value={comment}
                onChangeText={(txt) => setComment(txt)}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={loading}
            style={styles.reviewBtn}
            onPress={() => createReviewHandler()}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              {loading ? <ActivityIndicator size={"large"} /> : "Create"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000029",
  },
  mainConatiner: {
    width: 250,
    height: "auto",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  input: {
    width: 150,
    height: 40,
    paddingLeft: 5,
    backgroundColor: "#DfDfDf",
  },
  reviewBtn: {
    backgroundColor: "#363636",
    width: 100,
    borderRadius: 8,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginTop: 30,
  },
});
