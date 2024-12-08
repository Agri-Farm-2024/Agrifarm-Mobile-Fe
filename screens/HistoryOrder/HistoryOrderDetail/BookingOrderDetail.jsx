import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Text, Button, Divider } from "react-native-paper";
import {
  calculateDaysDifference,
  capitalizeFirstLetter,
  convertImageURL,
  formatDate,
  formatNumber,
  formatNumberToVND,
} from "../../../utils";

const BookingOrderDetail = ({ route, navigation }) => {
  const { order } = route.params;
  console.log("Booking Order", order);

  const discountPrice = 0;
  const dayDifference = calculateDaysDifference(
    order?.time_start,
    order?.time_end
  );
  const totalPrice =
    order &&
    order?.booking_material_detail.reduce(
      (total, item) =>
        total +
        item.price_per_piece_item * item.quantity * dayDifference +
        item.price_deposit_per_item * item.quantity,
      0
    );

  const totalQuantity =
    order &&
    order?.booking_material_detail.reduce(
      (total, item) => total + item?.quantity,
      0
    );

  return (
    <>
      {/* Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* Order Information */}
        {!order && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              color: "#707070",
            }}
          >
            Không tìm thấy đơn hàng
          </Text>
        )}
        {order && (
          <>
            <Card style={styles.card}>
              <Card.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "800",
                      color: "#222",
                      marginBottom: 8,
                    }}
                  >
                    Mã đơn:{" "}
                    <Text style={{ fontSize: 14 }}>
                      {order.booking_material_id}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontWeight: "800",
                      color: "#222",
                      marginBottom: 8,
                    }}
                  >
                    Số ngày thuê:{" "}
                    <Text style={{ fontSize: 14 }}>{dayDifference} ngày</Text>
                  </Text>
                  <Text
                    style={{
                      fontWeight: "800",
                      color: "#222",
                      marginBottom: 8,
                    }}
                  >
                    Trạng thái:{" "}
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
                  <Text
                    style={{
                      marginBottom: 8,
                      fontWeight: "bold",
                    }}
                  >
                    Ngày giao: <Text>{formatDate(order.created_at, 0)}</Text>
                  </Text>
                  <Text
                    style={{
                      marginBottom: 8,
                      fontWeight: "bold",
                    }}
                  >
                    Ngày hết hạn: <Text>{formatDate(order.time_end, 0)}</Text>
                  </Text>
                  <Text
                    style={{
                      marginBottom: 8,
                      fontWeight: "bold",
                    }}
                  >
                    Ngày bắt đầu thuê:{" "}
                    <Text>{formatDate(order.created_at, 0)}</Text>
                  </Text>
                  <Text
                    style={{
                      marginBottom: 8,
                      fontWeight: "bold",
                    }}
                  >
                    Số lượng: <Text>{formatNumber(totalQuantity)} vật tư</Text>
                  </Text>
                </View>
              </Card.Content>
            </Card>

            {/* Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
              {order?.booking_material_detail &&
                order?.booking_material_detail.map((item) => (
                  <Card key={item.material_id} style={styles.productCard}>
                    <Card.Content style={styles.productContent}>
                      <Image
                        style={styles.productImage}
                        source={{
                          uri: convertImageURL(item?.material.image_material),
                        }}
                      />
                      <View style={styles.productDetails}>
                        <Text style={styles.productName}>
                          {capitalizeFirstLetter(item?.material?.name)}
                        </Text>
                        <Text style={styles.productPrice}>
                          Giá thuê: {formatNumber(item?.price_per_piece_item)}{" "}
                          VND/ngày
                        </Text>
                        <Text style={styles.productPrice}>
                          Giá cọc: {formatNumber(item?.price_deposit_per_item)}{" "}
                          VND/cái
                        </Text>
                        <Text style={styles.productQuantity}>
                          Số lượng: {item?.quantity}
                        </Text>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
            </View>

            {/* Summary */}
            <View style={styles.section}>
              <View style={styles.summaryRow}>
                <Text style={styles.textLabelPrice}>Tổng đơn:</Text>
                <Text>{formatNumberToVND(totalPrice)} VND</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.textLabelPrice}>Giảm giá:</Text>
                <Text>{formatNumberToVND(discountPrice)} VND</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalText}>Tổng thanh toán:</Text>
                <Text style={styles.totalText}>
                  {formatNumberToVND(totalPrice - discountPrice)} VND
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  card: {
    marginBottom: 16,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productCard: {
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#7fb640",
    backgroundColor: "white",
  },
  productContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    borderRadius: 5,
    width: 60,
    height: 70,
  },
  productDetails: {
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  payButton: {
    marginTop: 16,
    backgroundColor: "#7fb640",
  },
  textLabelPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9B9B9B",
  },
  dateText: {
    color: "#888",
    marginBottom: 8,
  },
  status: {
    color: "green",
    marginBottom: 8,
  },
});

export default BookingOrderDetail;
