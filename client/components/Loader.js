import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const Loader = ({ visible }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.mainView}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size={"large"} color={"blue"} />
          <Text style={styles.loadingTxt}>Loading..</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  mainView: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "#00000025",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    elevation: 5,
  },
  loadingTxt: {
    fontSize: 20,
    color: "#656464",
    fontWeight: "bold",
    textAlign: "center",
  },
});
