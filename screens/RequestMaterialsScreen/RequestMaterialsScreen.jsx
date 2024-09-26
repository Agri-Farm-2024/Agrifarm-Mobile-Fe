import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RequestMaterialsList from "./RequestMaterialsList/RequestMaterialsList";
import BuyMaterials from "./BuyMaterials/BuyMaterials";
import RentMaterials from "./RentMaterials/RentMaterials";

// Components for each section

export default function RequestMaterialsScreen() {
  const [activeComponent, setActiveComponent] = useState("request"); // Default is 'request'

  const renderContent = () => {
    switch (activeComponent) {
      case "request":
        return <RequestMaterialsList />;
      case "buy":
        return <BuyMaterials />;
      case "rent":
        return <RentMaterials />;
      default:
        return <RequestMaterialsList />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeComponent === "request" ? styles.activeTab : null,
          ]}
          onPress={() => setActiveComponent("request")}
        >
          <Text
            style={[
              styles.textButton,
              activeComponent === "request" ? styles.textButtonActive : null,
            ]}
          >
            Yêu cầu vật tư
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeComponent === "buy" ? styles.activeTab : null,
          ]}
          onPress={() => setActiveComponent("buy")}
        >
          <Text
            style={[
              styles.textButton,
              activeComponent === "buy" ? styles.textButtonActive : null,
            ]}
          >
            Mua vật tư
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeComponent === "rent" ? styles.activeTab : null,
          ]}
          onPress={() => setActiveComponent("rent")}
        >
          <Text
            style={[
              styles.textButton,
              activeComponent === "rent" ? styles.textButtonActive : null,
            ]}
          >
            Thuê thiết bị
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active filter */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  textButton: {
    color: "black",
    fontSize: 16,
  },
  textButtonActive: {
    color: "white",
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#7fb640",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});