import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

export default function LandLeaseReview({ formData }) {
  console.log(formData);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kiểm tra yêu cầu thuê đất</Text>

      {/* Displaying each property from the formData object */}
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Họ và tên: </Text>
        <Text style={styles.text}>{formData.name}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Số điện thoại: </Text>
        <Text style={styles.text}>{formData.phoneNumber}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Số tháng cần thuê: </Text>
        <Text style={styles.text}>{formData.rentalMonths} tháng</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Thời gian bắt đầu: </Text>
        <Text style={styles.text}>
          {new Date(formData.startTime).toLocaleDateString("vi-VN")}
        </Text>
      </View>

      <Text style={styles.label}>Mục đích thuê đất: </Text>
      <Text style={styles.text}>{formData.purpose}</Text>

      <Text style={styles.label}>Tổng tiền thanh toán:</Text>
      <Text style={styles.price}>20,000,000 VND</Text>

      <Text style={styles.label}>Bao gồm:</Text>
      <Text style={styles.text}>Tiền thuê đất: 15,000,000 VND</Text>
      <Text style={styles.text}>Tiền cọc: 5,000,000 VND</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4e6a5d",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginVertical: 5,
  },
  text: {
    marginVertical: 5,
    fontSize: 16,
    color: "#2b2bff",
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff0505",
    marginVertical: 5,
  },
});
