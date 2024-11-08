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
    const [activeComponent, setActiveComponent] = useState("prepare"); // Default is 'request'
    const filteredOrders = orders.filter(
      (order) => order.status === activeComponent
    );

    const renderContent = () => {
      switch (activeComponent) {
        case "prepare":
          return (
            <ScrollView style={{ width: "100%" }}>
              {filteredOrders.map((order, index) => (
                <OrderCard
                  key={index}
                  orderId={order.orderId}
                  date={order.date}
                  orderType={order.orderType}
                  quantity={order.quantity}
                  total={order.total}
                  status={order.status}
                />
              ))}
            </ScrollView>
          );
        case "processing":
          return (
            <ScrollView style={{ width: "100%" }}>
              {filteredOrders.map((order, index) => (
                <OrderCard
                  key={index}
                  orderId={order.orderId}
                  date={order.date}
                  orderType={order.orderType}
                  quantity={order.quantity}
                  total={order.total}
                  status={order.status}
                />
              ))}
            </ScrollView>
          );
        case "done":
          return (
            <ScrollView style={{ width: "100%" }}>
              {filteredOrders.map((order, index) => (
                <OrderCard
                  key={index}
                  orderId={order.orderId}
                  date={order.date}
                  orderType={order.orderType}
                  quantity={order.quantity}
                  total={order.total}
                  status={order.status}
                />
              ))}
            </ScrollView>
          );
        case "cancel":
          return (
            <ScrollView style={{ width: "100%" }}>
              {filteredOrders.map((order, index) => (
                <OrderCard
                  key={index}
                  orderId={order.orderId}
                  date={order.date}
                  orderType={order.orderType}
                  quantity={order.quantity}
                  total={order.total}
                  status={order.status}
                />
              ))}
            </ScrollView>
          );
        default:
          return (
            <ScrollView style={{ width: "100%" }}>
              {filteredOrders.map((order, index) => (
                <OrderCard
                  key={index}
                  orderId={order.orderId}
                  date={order.date}
                  orderType={order.orderType}
                  quantity={order.quantity}
                  total={order.total}
                  status={order.status}
                />
              ))}
            </ScrollView>
          );
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        {/* Filter Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeComponent === "prepare" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveComponent("prepare")}
          >
            <Text
              style={[
                styles.textButton,
                activeComponent === "prepare" ? styles.textButtonActive : null,
              ]}
            >
              Chuẩn bị
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeComponent === "processing" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveComponent("processing")}
          >
            <Text
              style={[
                styles.textButton,
                activeComponent === "processing" ? styles.textButtonActive : null,
              ]}
            >
              Đang giao
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeComponent === "done" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveComponent("done")}
          >
            <Text
              style={[
                styles.textButton,
                activeComponent === "done" ? styles.textButtonActive : null,
              ]}
            >
              Đã giao
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeComponent === "cancel" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveComponent("cancel")}
          >
            <Text
              style={[
                styles.textButton,
                activeComponent === "cancel" ? styles.textButtonActive : null,
              ]}
            >
              Đã hủy
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
