import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingMaterialHistory,
  getOrderHistory,
} from "../../redux/slices/materialSlice";
import {
  getBookingMaterialSelector,
  getOrderSelector,
  materialLoadingSelector,
} from "../../redux/selectors";
import { calculateDaysDifference, formatDate, formatNumber } from "../../utils";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PAGE_SIZE = 30;

export default function BookingOrderCard() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bookingOrderHistory = useSelector(getBookingMaterialSelector);
  const loading = useSelector(materialLoadingSelector);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchBookingOrder = () => {
    try {
      const params = {
        page_size: PAGE_SIZE,
        page_index: currentPage,
      };
      dispatch(getBookingMaterialHistory(params));
    } catch (error) {
      console.log("Error fetching order history", JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchBookingOrder();
  }, []);

  const calculateTotalPrice = (itemList, time_start, time_end) => {
    if (!itemList || itemList.length == 0) {
      return 0;
    } else {
      const dayDifference = calculateDaysDifference(time_start, time_end);
      const total = itemList.reduce(
        (total, item) =>
          total +
          item?.price_per_piece_item * item?.quantity * dayDifference +
          item?.price_deposit_per_item * item?.quantity,
        0
      );
      return formatNumber(total);
    }
  };

  const calculateTotalQuantity = (itemList) => {
    if (!itemList || itemList.length == 0) {
      return 0;
    } else {
      const total = itemList.reduce((total, item) => total + item?.quantity, 0);
      return formatNumber(total);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
      {loading && <ActivityIndicatorComponent />}
      {!loading &&
        bookingOrderHistory &&
        bookingOrderHistory?.booking_materials &&
        bookingOrderHistory?.booking_materials.length > 0 &&
        bookingOrderHistory?.booking_materials.map((order, index) => (
          <Card
            style={[styles.card, { borderColor: "#7fb640" }]}
            key={index + order?.booking_material_id}
          >
            <Card.Content>
              <View style={styles.header}>
                <Text style={styles.orderId}>
                  <MaterialCommunityIcons
                    name="truck-fast-outline"
                    size={24}
                    color="#7fb640"
                  />{" "}
                  Đơn thuê ngày: {formatDate(order?.created_at, 0)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Mã đơn: </Text>
                <Text style={styles.value}>{order?.booking_material_id}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Ngày hết hạn: </Text>
                <Text style={styles.value}>
                  {formatDate(order?.time_end, 0)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Trạng thái: </Text>
                <Text style={styles.value}>
                  {order?.status == "pending_payment" && (
                    <Text style={{ color: "#ff007f" }}>Chờ thanh toán</Text>
                  )}
                  {order?.status == "pending_sign" && (
                    <Text style={{ color: "#00bcd4" }}>Chờ ký</Text>
                  )}
                  {order?.status == "completed" && (
                    <Text style={{ color: "#28a745" }}>Đang sử dụng</Text>
                  )}
                  {order?.status == "expired" && (
                    <Text style={{ color: "#dc3545" }}>Hết hạn</Text>
                  )}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Số lượng: </Text>
                <Text style={styles.value}>
                  {calculateTotalQuantity(order?.booking_material_detail)} vật
                  tư
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Tổng thanh toán: </Text>
                <Text style={styles.value}>
                  {calculateTotalPrice(
                    order?.booking_material_detail,
                    order?.time_start,
                    order?.time_end
                  )}{" "}
                  VND
                </Text>
              </View>

              <Button
                mode="outlined"
                textColor={"#7fb640"}
                style={[styles.button, { borderColor: "#7fb640" }]}
                onPress={() =>
                  navigation.navigate("BookingOrderDetail", { order: order })
                }
              >
                Xem chi tiết
              </Button>
            </Card.Content>
          </Card>
        ))}
    </ScrollView>
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
