import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListOfTransactions } from "../../redux/slices/transactionSlice";
import { ActivityIndicator } from "react-native-paper";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { formatDateToDDMMYYYY, formatNumber } from "../../utils";

const transactions = [
  {
    id: "TXN001",
    title: "Thanh toán thuê đất",
    landName: "Mảnh đất A",
    amount: "100,000 VND",
    total_price: "200,000 VND",
    expired_at: "01/11/2024",
    status: "approved",
  },
  {
    id: "TXN002",
    title: "Thanh toán thuê đất",
    landName: "Mảnh đất B",
    amount: "50,000 VND",
    total_price: "100,000 VND",
    expired_at: "03/11/2024",
    status: "pending",
  },
  {
    id: "TXN003",
    title: "Thanh toán thuê đất",
    landName: "Mảnh đất C",
    amount: "200,000 VND",
    total_price: "300,000 VND",
    expired_at: "05/11/2024",
    status: "succeed",
  },
  {
    id: "TXN004",
    title: "Thanh toán thuê đất",
    landName: "Mảnh đất D",
    amount: "30,000 VND",
    total_price: "70,000 VND",
    expired_at: "07/11/2024",
    status: "expired",
  },
];

export default function TransactionScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { transactionList, loading, error } = useSelector(
    (state) => state.transactionSlice
  );

  console.log(JSON.stringify(transactionList.transactions));

  useEffect(() => {
    dispatch(getListOfTransactions());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicatorComponent />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {transactionList?.transactions &&
          transactionList?.transactions.map((transaction) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TransactionDetailScreen", {
                  transactionID: transaction.transaction_id,
                })
              }
              key={transaction.transaction_id}
              style={styles.transactionContainer}
            >
              <View style={styles.transactionContent}>
                <Text style={styles.transactionTitle}>
                  {transaction.purpose === "booking_land"
                    ? "Thanh toán thuê đất"
                    : "Chưa rõ"}
                </Text>
                <Text style={styles.transactionexpired_at}>
                  Hết hạn: {formatDateToDDMMYYYY(transaction.expired_at)}
                </Text>
              </View>
              <Text style={styles.landName}>
                Tên mảnh đất: {transaction.booking_land.land.name}
              </Text>
              <Text style={[styles.transactionAmount]}>
                Số tiền: {formatNumber(transaction.total_price)} VND
              </Text>

              <Text
                style={[
                  styles.transactionStatus,
                  transaction.status === "succeed" && styles.succeedStatus,
                  transaction.status === "approved" && styles.approvedStatus,
                  transaction.status === "expired" && styles.expiredStatus,
                ]}
              >
                {transaction.status === "succeed"
                  ? "Hoàn thành"
                  : transaction.status === "pending"
                  ? "Chưa tới đợt thanh toán"
                  : transaction.status === "approved"
                  ? "Có thể thanh toán"
                  : "Thất bại"}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 16,
  },
  transactionContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transactionexpired_at: {
    fontSize: 12,
    color: "#707070",
  },
  landName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#4CAF50",
  },
  negativeAmount: {
    color: "#D32F2F",
  },
  total_price: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },
  succeedStatus: {
    color: "#4CAF50",
  },
  approvedStatus: {
    color: "#FFA726",
  },
  expiredStatus: {
    color: "#D32F2F",
  },
});
