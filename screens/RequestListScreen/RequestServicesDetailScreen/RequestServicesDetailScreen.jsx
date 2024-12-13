import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Text, Checkbox, Button, Divider } from "react-native-paper";
import {
  capitalizeFirstLetter,
  convertImageURL,
  formatDateToDDMMYYYY,
  formatNumber,
} from "../../../utils";
import ContractComponent from "../RequestServicesDetailScreen/ContractComponent";

export default function RequestServicesDetailScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { requestService } = route.params;
  console.log("RequestServicesDetailScreen: " + JSON.stringify(requestService));

  const contract = {
    createAt: requestService?.created_at,
    farmOwner: "Trang trại AgriFarm - quản lí trang trại: bà Trịnh Gia Hân",
    landrenter: requestService?.land_renter,
    productName: requestService?.plant_season?.plant?.name,
    price: requestService?.price_purchase_per_kg,
    area: requestService?.acreage_land,
    timeStart: requestService?.time_start,
    timeEnd: requestService?.time_end,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Request details */}

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
          <Text style={styles.value}>
            {" "}
            {formatDateToDDMMYYYY(requestService?.created_at)}
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Gói dịch vụ:</Text>
          <Text style={styles.value}>
            {requestService?.service_package?.name}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Giống cây:</Text>
          <Text style={styles.value}>
            {capitalizeFirstLetter(requestService?.plant_season?.plant?.name)}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Diện tích sử dụng:</Text>
          <Text style={styles.value}>
            {formatNumber(requestService?.acreage_land)} m2
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ngày bắt đầu:</Text>
          <Text style={styles.value}>
            {" "}
            {formatDateToDDMMYYYY(requestService?.time_start)}
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Mảnh đất sử dụng:</Text>
          <Text style={styles.value}>
            {capitalizeFirstLetter(requestService?.booking_land?.land?.name)}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text style={styles.value}>
            {" "}
            {requestService.status == "used" && "Đang sử dụng"}
            {requestService.status == "canceled" && "Đã huỷ"}
            {requestService.status == "expired" && "Đã hoàn thành"}
            {requestService.status == "pending_payment" && "Đợi thanh toán"}
            {requestService.status == "pending_sign" && "Đợi ký"}
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Section title */}
        <Text style={styles.sectionTitle}>Thông tin dịch vụ</Text>
        <View style={styles.serviceInfoContainer}>
          {/* Service Title */}
          <Text style={styles.serviceTitle}>
            {requestService?.service_package?.name}
          </Text>

          {/* Service Description */}
          <Text style={styles.serviceDescription}>
            {requestService?.service_package?.description}
          </Text>
          <Text style={styles.servicePackagePrice}>
            Giá thu mua sản phẩm:{" "}
            {formatNumber(requestService?.price_purchase_per_kg)} VND/KG
          </Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>

          <ContractComponent contract={contract} isDownload={true} />
        </View>
        <Divider style={styles.divider} />
        {requestService?.contract_image ? (
          <View>
            <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
              Hình ảnh hợp đồng
            </Text>
            <Button onPress={() => setModalVisible(true)} mode="contained">
              Xem hình ảnh đã ký
            </Button>
          </View>
        ) : (
          <Text style={styles.sectionTitle}>Chưa có hình ảnh hợp đồng</Text>
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
                uri: convertImageURL(requestService?.contract_image),
              }}
              style={styles.modalImage}
            />
          </View>
        </Modal>
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
    flexWrap: "wrap", // This ensures the content wraps to the next line
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    width: 150, // Fixed width to ensure label is aligned
  },
  value: {
    flex: 1,
    color: "#666",
    flexWrap: "wrap", // Allows text to wrap when it gets too long
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
  serviceInfoContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  serviceTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  serviceDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  servicePackagePrice: {
    fontSize: 16,
    color: "#7fb640",
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxLabelContainer: {
    flex: 1, // Makes sure text takes the remaining space and wraps
  },
  checkboxLabel: {
    flexWrap: "wrap", // Ensures long text will wrap to the next line
    color: "#666",
  },
  link: {
    color: "#7fb640",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#7fb640",
    marginBottom: 30, // Margin for button at the bottom
  },
  contractImage: {
    width: "100%",
    height: 700,
    resizeMode: "cover",
    marginTop: 10,
    objectFit: "cover",
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
  buttonAdd: {
    position: "absolute",
    right: 15,
    bottom: 15,
    borderRadius: 60,
    width: 60,
    height: 60,
    backgroundColor: "#7fb640",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textAdd: {
    width: 25,
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});
