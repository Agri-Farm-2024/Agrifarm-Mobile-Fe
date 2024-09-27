import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";

export default function OrderCard({
  orderId,
  date,
  orderType,
  quantity,
  total,
  status,
}) {
  const navigation = useNavigation();
  // Define border color logic based on status
  const borderColor =
    status == "prepare"
      ? "gray"
      : status == "processing"
      ? "orange"
      : status == "cancel"
      ? "red"
      : "#7fb640"; // Default border color

  const textColor =
    status == "prepare"
      ? "gray"
      : status == "processing"
      ? "orange"
      : status == "cancel"
      ? "red"
      : "#7fb640"; // Default border color

  return (
    <Card style={[styles.card, { borderColor }]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.orderId}>{orderId}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Loại đơn: </Text>
          <Text style={styles.value}>{orderType}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Số lượng: </Text>
          <Text style={styles.value}>{quantity}</Text>

          <Text style={styles.labelRight}>Tổng thanh toán: </Text>
          <Text style={styles.value}>{total}</Text>
        </View>

        <Button
          mode="outlined"
          textColor={textColor}
          style={[styles.button, { borderColor }]}
          onPress={() => navigation.navigate("HistoryOrderDetail")}
        >
          Xem chi tiết
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#9E9E9E", // Light gray color
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#9E9E9E", // Light gray color
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  labelRight: {
    fontSize: 16,
    color: "#9E9E9E",
    marginLeft: 30,
  },
  button: {
    marginTop: 8,
    borderColor: "#7fb640",
    width: 150,
  },
});
