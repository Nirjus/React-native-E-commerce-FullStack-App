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
import { useDispatch } from "react-redux";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import img from "../assets/images/CARTI.png";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const setUserInfo = async (data) => {
    await AsyncStorage.setItem("@auth", JSON.stringify(data.user));
    await AsyncStorage.setItem("@token", data.token);
    dispatch({
      type: "LOGIN_SUCCESS",
      user: data.user,
      token: data.token,
    });
  };
  const submitHandler = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          "/user/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          Alert.alert(res.data.message);
          setEmail("");
          setPassword("");
          setUserInfo(res.data);
          navigation.navigate("BottomTabs");
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
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
              Login To your Account
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
                value={password}
                onChangeText={(txt) => setPassword(txt)}
                secureTextEntry={!visible}
                placeholderTextColor={"grey"}
                placeholder="Enter your Password"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{ color: "#007fff", fontWeight: "500" }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot Password?
            </Text>
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
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
              Don't have any account? Sign Up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
