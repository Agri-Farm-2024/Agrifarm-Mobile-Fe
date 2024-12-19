import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../redux/slices/materialSlice";
import {
  getOrderSelector,
  materialLoadingSelector,
} from "../../redux/selectors";
import { formatDate, formatNumber } from "../../utils";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyComponent from "../../components/EmptyComponent/EmptyComponent";

const PAGE_SIZE = 100;

export default function OrderCard() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orderHistory = useSelector(getOrderSelector);
  const loading = useSelector(materialLoadingSelector);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrder = () => {
    try {
      const params = {
        page_size: PAGE_SIZE,
        page_index: currentPage,
      };
      dispatch(getOrderHistory(params));
    } catch (error) {
      console.log("Error fetching order history", JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const calculateTotalPrice = (itemList) => {
    if (!itemList || itemList.length == 0) {
      return 0;
    } else {
      const total = itemList.reduce(
        (total, item) => total + item?.price_per_iteam * item?.quantity,
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

  if (orderHistory.length <= 0)
    return <EmptyComponent message="Không có đơn hàng" />;
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
      {loading && <ActivityIndicatorComponent />}
      {!loading && !orderHistory && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: "#707070",
          }}
        >
          Không có đơn hàng
        </Text>
      )}
      {!loading &&
        orderHistory &&
        orderHistory.length > 0 &&
        orderHistory.map((order, index) => (
          <Card
            key={index + order?.order_id}
            style={[styles.card, { borderColor: "#7fb640" }]}
          >
            <Card.Content>
              <View style={styles.header}>
                <Text style={styles.orderId}>
                  <MaterialCommunityIcons
                    name="truck-fast-outline"
                    size={24}
                    color="#7fb640"
                  />{" "}
                  Đơn ngày: {formatDate(order?.created_at, 0)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Mã đơn: </Text>
                <Text style={styles.value}>{order?.order_id}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Số lượng: </Text>
                <Text style={styles.value}>
                  {calculateTotalQuantity(order?.orders_detail)} vật tư
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Tổng thanh toán: </Text>
                <Text style={styles.value}>
                  {calculateTotalPrice(order?.orders_detail)} VND
                </Text>
              </View>

              <Button
                mode="outlined"
                textColor={"#7fb640"}
                style={[styles.button, { borderColor: "#7fb640" }]}
                onPress={() =>
                  navigation.navigate("HistoryOrderDetail", { order: order })
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
