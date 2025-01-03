import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Divider } from "react-native-paper";
import { convertImageURL, formatDateToDDMMYYYY } from "../../utils";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import ContractComponent from "./ContractComponent";

export default function ExtendItemScreen({ route }) {
  const navigation = useNavigation();
  const { booking, extend } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(`ExtendItemScreen: ` + JSON.stringify(extend));
  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  //   FIX CONTACT RENDER
  const contract = {
    farmOwner: "Trang trại AgriFarm - quản lí trang trại: bà Trịnh Gia Hân",
    landrenter: booking?.land_renter?.full_name,
    email: booking?.land_renter?.email,
    totalMonth: extend?.total_month,
    area: booking?.land?.acreage_land,
    position: booking?.land?.name,
    pricePerMonth: booking?.price_per_month,
  };

  if (!extend) return <ActivityIndicatorComponent />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Mảnh đất:</Text>
          <Text style={styles.value}>{booking?.land?.name}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
          <Text style={styles.value}>
            {formatDateToDDMMYYYY(extend?.created_at)}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ngày bắt đầu gia hạn:</Text>
          <Text style={styles.value}>
            {formatDateToDDMMYYYY(extend?.time_start)}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text style={styles.value}>
            {extend?.status === "completed" && "Đang hiệu lực"}
            {extend?.status === "pending" && "Chờ xác nhận"}
            {extend?.status === "pending_contract" && "Chờ phê duyệt"}
            {extend?.status === "pending_payment" && "Chờ thanh toán"}
            {extend?.status === "pending_sign" && "Chờ ký"}
            {extend?.status === "canceled" && "Hủy"}
            {extend?.status === "expired" && "Hết hạn"}
            {extend?.status === "rejected" && "Đã từ chối"}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Tổng tháng gia hạn:</Text>
          <Text style={styles.value}>{extend?.total_month} tháng</Text>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>
          <ContractComponent contract={contract} isDownload={true} />
        </View>

        <Divider style={styles.divider} />
        {extend?.contract_image ? (
          <View>
            <Text style={styles.sectionTitle}>Hình ảnh hợp đồng</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageSlider}
            >
              {extend?.contract_image
                ?.replace(/[\[\]\n]/g, "")
                .trim()
                .split(",").length >= 0 &&
                extend?.contract_image
                  ?.replace(/[\[\]\n]/g, "")
                  .trim()
                  .split(",")
                  ?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openModal(item)}
                    >
                      <Image
                        source={{
                          uri: convertImageURL(item),
                        }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  ))}
            </ScrollView>
          </View>
        ) : (
          <Text style={styles.sectionTitle}>Chưa có hình ảnh hợp đồng</Text>
        )}
      </ScrollView>
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
              uri: convertImageURL(extend?.contract_image),
            }}
            style={styles.modalImage}
          />
        </View>
      </Modal>
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeModal}
          >
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: convertImageURL(selectedImage),
            }}
            style={styles.modalImage}
          />
        </View>
      </Modal>
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
    marginBottom: 10,
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
  image: {
    width: 400,
    height: 400,
    marginRight: 10,
  },
});
