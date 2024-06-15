import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/Loader";
import img from "../assets/images/CARTI.png";
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const submitHandler = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          "/user/forgot-password",
          { email, newPassword },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          Alert.alert("Success", res.data.message);
          setEmail("");
          setNewPassword("");
          navigation.navigate("Login");
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <Image source={img} alt="image" style={{ width: 200, height: 200 }} />
        </View>
        <KeyboardAvoidingView>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#041e42",
                textAlign: "center",
              }}
            >
              Forgot password
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#6a6a6a",
                textAlign: "center",
              }}
            >
              put your email and new password
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                style={{
                  color: "#000",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
                placeholderTextColor={"grey"}
                placeholder="Enter your Email"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              {visible ? (
                <AntDesign
                  style={{ marginLeft: 8 }}
                  name="eye"
                  size={24}
                  color="grey"
                  onPress={() => setVisible(false)}
                />
              ) : (
                <FontAwesome5
                  style={{ marginLeft: 8 }}
                  name="lock"
                  size={24}
                  color="grey"
                  onPress={() => setVisible(true)}
                />
              )}
              <TextInput
                style={{
                  color: "#000",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={newPassword}
                onChangeText={(txt) => setNewPassword(txt)}
                secureTextEntry={!visible}
                placeholderTextColor={"grey"}
                placeholder="Enter a new password"
              />
            </View>
          </View>

          <View style={{ marginTop: 80 }} />
          <Pressable
            onPress={() => submitHandler()}
            disabled={loading}
            style={{
              width: 200,
              backgroundColor: "#000",
              borderRadius: 6,
              padding: 15,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Send
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
              back to Login?
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
