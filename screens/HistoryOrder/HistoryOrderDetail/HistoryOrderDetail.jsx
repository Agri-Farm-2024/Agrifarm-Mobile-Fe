import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Text, Button, Divider } from "react-native-paper";
import { formatNumberToVND } from "../../../utils";

const HistoryOrderDetail = ({ route, navigation }) => {
  const orderDate = "05-12-2019";
  const orderType = "Yêu cầu vật tư";
  const orderStatus = "Chuẩn bị";
  const items = [
    {
      id: 1,
      name: "Ớt Chuông",
      price: 16000,
      quantity: 1,
      image:
        "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    },
    {
      id: 2,
      name: "Ớt Chuông",
      price: 16000,
      quantity: 1,
      image:
        "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    },
    {
      id: 3,
      name: "Ớt Chuông",
      price: 16000,
      quantity: 1,
      image:
        "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    },
  ];

  const discountPrice = 2000;
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
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
        <Card style={styles.card}>
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: "#222",
                  marginBottom: 8,
                }}
              >
                Mã đơn: DO001
              </Text>
              <Text
                style={{
                  marginBottom: 8,
                }}
              >
                Loại đơn: {orderType}
              </Text>
              <Text>Số lượng: {items.length}</Text>
            </View>

            <View>
              <Text style={styles.dateText}>{orderDate}</Text>
              <Text style={styles.status}>{orderStatus}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
          {items.map((item) => (
            <Card key={item.id} style={styles.productCard}>
              <Card.Content style={styles.productContent}>
                <Image
                  style={styles.productImage}
                  source={{ uri: item.image }}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>
                    Giá mua: {item.price} VND
                  </Text>
                  <Text style={styles.productQuantity}>
                    Số lượng: {item.quantity}
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

export default HistoryOrderDetail;
