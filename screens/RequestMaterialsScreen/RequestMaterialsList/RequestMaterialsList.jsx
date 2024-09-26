import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import RequestMaterialsItem from "./RequestMaterialsItem";

export default function RequestMaterialsList() {
  // Fake data for the list
  const materialsData = [
    {
      id: 1,
      title: "Gói dịch vụ số 1",
      status: "Đang sử dụng",
      description:
        "Gói quy trình canh tác theo chuẩn VietGap cùa giống cây + vật tư",
      price: "2.000.000 VND",
    },
    {
      id: 2,
      title: "Gói dịch vụ số 2",
      status: "Hoàn thành",
      description: "Dịch vụ chăm sóc cây trồng và vật tư theo mùa vụ",
      price: "1.500.000 VND",
    },
    {
      id: 3,
      title: "Gói dịch vụ số 3",
      status: "Chưa bắt đầu",
      description: "Cung cấp vật tư nông nghiệp và hướng dẫn VietGap",
      price: "3.000.000 VND",
    },
    {
      id: 4,
      title: "Gói dịch vụ số 4",
      status: "Đang sử dụng",
      description: "Hỗ trợ kỹ thuật và vật tư trồng cây đặc biệt",
      price: "2.500.000 VND",
    },
    // Add more items as necessary
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {materialsData.map((item) => (
          <RequestMaterialsItem
            key={item.id}
            title={item.title}
            status={item.status}
            description={item.description}
            price={item.price}
            
          />
        ))}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20, // Prevent data from being cut off at the bottom
  },
});
