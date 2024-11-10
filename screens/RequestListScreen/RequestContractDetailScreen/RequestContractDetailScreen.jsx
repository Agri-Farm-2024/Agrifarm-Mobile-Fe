import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Text, Checkbox, Button, Divider } from "react-native-paper";
import { getBookingByID } from "../../../redux/slices/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import ActivityIndicatorComponent from "../../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import {
  convertImageURL,
  formatDateToDDMMYYYY,
  formatNumber,
} from "../../../utils";

export default function RequestContractDetailScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);

  const { requestID } = route.params;
  const dispatch = useDispatch();

  const { booking, loading, error } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    if (requestID) {
      dispatch(getBookingByID({ booking_id: requestID }));
    }
  }, [requestID]);

  console.log(requestID + "- booking:" + JSON.stringify(booking));

  if (loading || !booking) return <ActivityIndicatorComponent />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Request details */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Mảnh đất:</Text>
          <Text style={styles.value}>{booking?.land?.name}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
          <Text style={styles.value}>
            {formatDateToDDMMYYYY(booking?.created_at)}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Thời gian:</Text>
          <Text style={styles.value}>
            {formatDateToDDMMYYYY(booking?.time_start)} -{" "}
            {formatDateToDDMMYYYY(booking?.time_end)}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Giá trị hợp đồng:</Text>
          <Text style={styles.value}>
            {formatNumber(booking?.total_price)} VND
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text style={styles.value}>
            {" "}
            {booking?.status === "completed" && "Đang hiệu lực"}
            {booking?.status === "pending" && "Đang xử lý"}
            {booking?.status === "pending_contract" && "Chờ phê duyệt"}
            {booking?.status === "pending_payment" && "Chờ thanh toán"}
            {booking?.status === "pending_sign" && "Chờ ký"}
            {booking?.status === "canceled" && "Hủy"}
            {booking?.status === "expired" && "Hết hạn"}
            {booking?.status === "rejected" && "Đã từ chối"}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Nội dung yêu cầu:</Text>
          <Text style={styles.value}>Yêu cầu thuê mảnh đất MD001</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Mục đích thuê:</Text>
          <Text style={styles.value}>{booking?.purpose_rental}</Text>
        </View>

        <Divider style={styles.divider} />

        {/* Section title */}
        {booking?.contract_image ? (
          <View>
            <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={{
                  uri: convertImageURL(booking?.contract_image),
                }}
                style={styles.contractImage}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.sectionTitle}>Chưa có hợp đồng</Text>
        )}

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Đóng</Text>
            </TouchableOpacity>
            <Image
              source={{
                uri: convertImageURL(booking?.contract_image),
              }}
              style={styles.modalImage}
            />
          </View>
        </Modal>

        {/* <View style={styles.checkboxContainer}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color="#7fb640"
          />
          <View style={styles.checkboxLabelContainer}>
            <Text style={styles.checkboxLabel}>
              Tôi đã đọc và{" "}
              <Text style={styles.link}>
                đồng ý với các điều khoản của hợp đồng
              </Text>
            </Text>
          </View>
        </View> */}

        {/* <Button
          mode="contained"
          style={styles.button}
          disabled={!checked}
          onPress={() => {
            navigation.navigate("PaymentScreen");
          }}
        >
          Tiến hành thanh toán
        </Button> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  detailContainer: {
    flexDirection: "row",
    marginVertical: 8,
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    width: 150,
  },
  value: {
    flex: 1,
    color: "#666",
    flexWrap: "wrap",
  },
  divider: {
    marginVertical: 10,
  },
  sectionTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: "#666",
  },
  contractImage: {
    width: "100%",
    height: 700,
    resizeMode: "cover",
    marginTop: 10,
    objectFit: "cover",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxLabelContainer: {
    flex: 1,
  },
  checkboxLabel: {
    flexWrap: "wrap",
    color: "#666",
  },
  link: {
    color: "#7fb640",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#7fb640",
    marginBottom: 30,
  },
});
