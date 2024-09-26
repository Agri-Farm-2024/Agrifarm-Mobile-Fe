import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar, Card, Text, Button, Divider } from "react-native-paper";
import { formatNumberToVND } from "../../utils";

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItemsCheckout } = route.params;
  const discountPrice = 50000;

  function objectToArray(obj) {
    return Object.keys(obj).map((key) => obj[key]);
  }

  const totalPrice = objectToArray(cartItemsCheckout).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Header */}
      <Appbar.Header style={{ backgroundColor: "#7fb640" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thanh Toán" color="white" />
      </Appbar.Header>

      {/* Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* Delivery Information */}
        <Text style={styles.sectionTitle}>Thông tin người đặt</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text>Người thuê: Chi Bảo</Text>
            <Text
              style={{
                marginVertical: 10,
              }}
            >
              Mãnh vườn: MD001
            </Text>
            <Text>Ngày giao: 17/11/2024</Text>
          </Card.Content>
        </Card>

        {/* Order Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đơn hàng</Text>
          {objectToArray(cartItemsCheckout).map((item) => (
            <Card key={item.id} style={styles.productCard}>
              <Card.Content style={styles.productContent}>
                <Image
                  style={{
                    borderRadius: 5,
                    width: 60,
                    height: 70,
                  }}
                  source={{
                    uri: item.image,
                  }}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>
                    Giá {item.requestType == "buy" ? "mua" : "thuê"}:{" "}
                    {formatNumberToVND(item.price)} VND
                  </Text>
                  <Text style={styles.productQuantity}>
                    Số lượng: {item.quantity}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <TouchableOpacity
            style={{
              width: 90,
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: "white",
            }}
          >
            <MaterialIcons
              name="account-balance"
              size={24}
              color="#707070"
              style={{
                marginBottom: 5,
                color: "#7fb640",
              }}
            />
            <Text>Ngân hàng</Text>
          </TouchableOpacity>
        </View>

        {/* Total Summary */}
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

        {/* Payment Button */}
        <Button
          mode="contained"
          style={styles.payButton}
          onPress={() => navigation.navigate("PaymentScreen")}
        >
          THANH TOÁN
        </Button>
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
});

export default CheckoutScreen;
