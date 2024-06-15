import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./screens/Navigation/AppNavigation";
import { Provider } from "react-redux";
import Store from "./redux/store";

export default function App() {
  Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
  Platform.OS === "android" && StatusBar.setTranslucent(true);

  return (
    <Provider store={Store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
