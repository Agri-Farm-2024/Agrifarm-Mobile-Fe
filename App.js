import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { persistor, store } from "./redux/store";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./stacks/StackNavigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SafeAreaProvider style={{ color: "black" }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <StatusBar barStyle="light-content" backgroundColor={"#7FB640"} />
            <NavigationContainer>
              <StackNavigator />
              <Toast />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
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
