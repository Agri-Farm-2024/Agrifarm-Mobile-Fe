import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import OrderCard from "./OrderCard";
import BookingOrderCard from "./BookingOrder";

// Components for each section

const orders = [
  {
    orderId: "Đơn D001",
    date: "05/12/2024",
    status: "processing",
    quantity: 3,
    total: "0 VND",
    orderType: "Yêu cầu vật tư",
  },
  {
    orderId: "Đơn D002",
    date: "07/12/2024",
    status: "prepare",
    quantity: 5,
    total: "200,000 VND",
    orderType: "Yêu cầu vật tư",
  },
  {
    orderId: "Đơn D003",
    date: "10/12/2024",
    status: "prepare",
    quantity: 2,
    total: "150,000 VND",
    orderType: "Thanh toán",
  },
  {
    orderId: "Đơn D004",
    date: "11/12/2024",
    status: "done",
    quantity: 10,
    total: "1,000,000 VND",
    orderType: "Thanh toán",
  },
  {
    orderId: "Đơn D004",
    date: "11/12/2024",
    status: "done",
    quantity: 10,
    total: "1,000,000 VND",
    orderType: "Thanh toán",
  },
  {
    orderId: "Đơn D004",
    date: "11/12/2024",
    status: "done",
    quantity: 10,
    total: "1,000,000 VND",
    orderType: "Thanh toán",
  },
  {
    orderId: "Đơn D004",
    date: "11/12/2024",
    status: "done",
    quantity: 10,
    total: "1,000,000 VND",
    orderType: "Thanh toán",
  },
  {
    orderId: "Đơn D004",
    date: "11/12/2024",
    status: "done",
    quantity: 10,
    total: "1,000,000 VND",
    orderType: "Thanh toán",
  },
  {
    orderId: "Đơn D005",
    date: "15/12/2024",
    status: "cancel",
    quantity: 1,
    total: "50,000 VND",
    orderType: "Thanh toán",
  },
];

export default function RequestMaterialsScreen() {
  const [activeComponent, setActiveComponent] = useState("buy"); // Default is 'request'

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Navigation */}
      <View style={styles.tabContainer}>
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
            Vật tư mua
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
            Vật tư thuê
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active filter */}
      <View style={styles.contentContainer}>
        {activeComponent == "buy" && <OrderCard />}
        {activeComponent == "rent" && <BookingOrderCard />}
      </View>
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
    color: "#7fb640",
    fontWeight: "bold",
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#7fb640",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
