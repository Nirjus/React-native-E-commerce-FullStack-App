import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axiso from "axios";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import Loader from "../components/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const hamdleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("Plase add all fields");
      setLoading(false);
    }
    await axiso
      .post(
        "/user/register",
        { name, email, password },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        Alert.alert(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Login");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.response.data.message);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <Logo height={40} width={40} />
        </View>
        <KeyboardAvoidingView>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                marginTop: 30,
                color: "#041e42",
                textAlign: "center",
              }}
            >
              Register To your Account
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
              <FontAwesome
                style={{ marginLeft: 8 }}
                name="user"
                size={24}
                color="grey"
              />
              <TextInput
                style={{
                  color: "#000",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={name}
                onChangeText={(txt) => setName(txt)}
                placeholderTextColor={"grey"}
                placeholder="Enter your Name"
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

          <View style={{ marginTop: 80 }} />
          <Pressable
            onPress={() => hamdleSubmit()}
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
              Sign Up
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
              Alrady have an account? Signin
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
        <Loader visible={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
