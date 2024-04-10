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
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import Logo from "../components/Logo";

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
      payload: data,
    });
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please add email or password");
      setLoading(false);
    }
    await axios
      .post(
        "/user/login",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoading(false);
        Alert.alert(res.data.message);
        setEmail("");
        setPassword("");
        setUserInfo(res.data);
        navigation.navigate("BottomTabs");
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 90, alignSelf: "center" }}>
          <Logo height={40} width={40} />
        </View>
        <KeyboardAvoidingView>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                marginTop: 40,
                color: "#041e42",
                textAlign: "center",
              }}
            >
              Login To your Account
            </Text>
          </View>
          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
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
                marginTop: 40,
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
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me Logged in</Text>
            <Text style={{ color: "#007fff", fontWeight: "500" }}>
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
