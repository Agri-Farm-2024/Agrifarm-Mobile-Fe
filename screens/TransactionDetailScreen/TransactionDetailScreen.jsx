import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTransactionByID } from "../../redux/slices/transactionSlice";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { formatDateToDDMMYYYY, formatNumber } from "../../utils";
import { Button } from "react-native-paper";

const TransactionScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { transactionID } = route.params;

  const transactionData = useSelector(
    (state) => state.transactionSlice.transaction
  );
  const transactionError = useSelector((state) => state.transactionSlice.error);
  const loading = useSelector((state) => state.transactionSlice.loading);

  console.log(JSON.stringify(transactionData));

  useEffect(() => {
    if (transactionID) {
      dispatch(getTransactionByID({ transactionID }));
    }
  }, [transactionID]);

  if (loading || !transactionData) {
    return <ActivityIndicatorComponent />;
  }

  if (transactionError) {
    return <Text style={styles.errorText}>Error: {transactionError}</Text>;
  }

  const handlePayment = (paymentLink) => {
    navigation.navigate("PaymentScreen", {
      payment_link: paymentLink,
      transactionID,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Tên khách hàng</Text>
              <Text style={styles.textValue}>
                {transactionData?.user?.full_name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Mảnh đất</Text>
              <Text style={styles.textValue}>
                {transactionData?.booking_land?.land?.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Lượt thanh toán</Text>
              <Text style={styles.textValue}>
                {transactionData?.booking_land?.payment_frequency === "single"
                  ? "Một lần"
                  : "Nhiều lần"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Thời gian thuê</Text>
              <Text style={styles.textValue}>
                {formatDateToDDMMYYYY(
                  transactionData?.booking_land?.time_start
                )}{" "}
                -{" "}
                {formatDateToDDMMYYYY(transactionData?.booking_land?.time_end)}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Loại thanh toán</Text>
              <Text style={styles.textValue}>
                {transactionData.purpose === "booking_land"
                  ? "Gia hạn thuê đất"
                  : "Chưa rõ"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Ngày hết hạn</Text>
              <Text style={styles.textValue}>
                {formatDateToDDMMYYYY(transactionData.expired_at)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Mã giao dịch</Text>
              <Text style={styles.textValue}>
                {transactionData.transaction_code}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Số tiền thanh toán</Text>
              <Text style={styles.textValue}>
                {formatNumber(transactionData.total_price)} VND
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Trạng thái</Text>
              <Text style={styles.textValue}>
                {transactionData.status === "succeed"
                  ? "Hoàn thành"
                  : transactionData.status === "pending"
                  ? "Chưa tới đợt thanh toán"
                  : transactionData.status === "approved"
                  ? "Có thể thanh toán"
                  : "Thất bại"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handlePayment(transactionData.payment_link)}
          disabled={transactionData.status !== "approved"}
        >
          Tiến hành thanh toán
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 100, // Adds space to scroll content above button
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  infoContainer: {
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    borderColor: "#b3b3b3",
  },
  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 20,
    justifyContent: "space-between",
    borderColor: "#b3b3b3",
  },
  textLabel: {
    color: "#545454",
  },
  textValue: {
    fontWeight: "bold",
    width: 200,
    textAlign: "right",
  },
  errorText: {
    color: "red",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#7fb640",
    borderRadius: 5,
  },
});

export default TransactionScreen;
