import React, { useEffect, useRef, useState } from "react";
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
import ContractComponent from "./ContractComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { DownloadPDF } from "../../../components/DownloadPDF/DownloadPDF";

export default function RequestContractDetailScreen({ navigation, route }) {
  const downLoadRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { requestID } = route.params;
  const dispatch = useDispatch();

  const { booking, loading, error } = useSelector(
    (state) => state.requestSlice
  );

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  useEffect(() => {
    if (requestID) {
      dispatch(getBookingByID({ booking_id: requestID }));
    }
  }, [requestID]);

  console.log(requestID + "- booking:" + JSON.stringify(booking));
  console.log(
    "Test: " +
      JSON.stringify(
        booking?.extends
          ?.filter((item) => item.status === "completed")
          ?.map((item) => {
            const timeStart = new Date(item.time_start);
            const timeEnd = new Date(timeStart);
            timeEnd.setMonth(timeEnd.getMonth() + item.total_month); // Add total_month to timeStart

            return { ...item, time_end: timeEnd.toISOString() }; // Add time_end to the item
          })
          ?.reduce(
            (latest, current) => {
              return new Date(current.time_end) > new Date(latest.time_end)
                ? current
                : latest;
            },
            booking?.extends
              ?.filter((item) => item.status === "completed")
              ?.map((item) => {
                const timeStart = new Date(item.time_start);
                const timeEnd = new Date(timeStart);
                timeEnd.setMonth(timeEnd.getMonth() + item.total_month); // Add total_month to timeStart

                return { ...item, time_end: timeEnd.toISOString() }; // Add time_end to the item
              })[0]
          )?.time_end
      )
  );
  const timeEndBooking =
    booking?.extends?.length <= 0
      ? booking?.time_end
      : booking?.extends
          ?.filter((item) => item.status === "completed")
          ?.map((item) => {
            const timeStart = new Date(item.time_start);
            const timeEnd = new Date(timeStart);
            timeEnd.setMonth(timeEnd.getMonth() + item.total_month); // Add total_month to timeStart

            return { ...item, time_end: timeEnd.toISOString() }; // Add time_end to the item
          })
          ?.reduce(
            (latest, current) => {
              return new Date(current.time_end) > new Date(latest.time_end)
                ? current
                : latest;
            },
            booking?.extends
              ?.filter((item) => item.status === "completed")
              ?.map((item) => {
                const timeStart = new Date(item.time_start);
                const timeEnd = new Date(timeStart);
                timeEnd.setMonth(timeEnd.getMonth() + item.total_month); // Add total_month to timeStart

                return { ...item, time_end: timeEnd.toISOString() }; // Add time_end to the item
              })[0]
          )?.time_end;

  if (loading || !booking) return <ActivityIndicatorComponent />;

  const contract = {
    createAt: booking?.created_at,
    farmOwner: "Trang trại AgriFarm - quản lí trang trại: Trịnh Gia Hân",
    landrenter: booking?.land_renter?.full_name,
    totalMonth: booking?.total_month,
    purpose: booking?.purpose_rental,
    area: booking?.land?.acreage_land,
    position: booking?.land?.name,
    pricePerMonth: booking?.land?.price_booking_per_month,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
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
            {/* {formatDateToDDMMYYYY(booking?.time_end)} - */}
            {formatDateToDDMMYYYY(timeEndBooking)}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Giá trị hợp đồng:</Text>
          <Text style={styles.value}>
            {formatNumber(
              booking?.total_month * booking?.price_per_month +
                booking?.price_deposit
            )}{" "}
            VND
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Tiền mỗi tháng:</Text>
          <Text style={styles.value}>
            {formatNumber(booking?.price_per_month)} VND
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Tiền cọc:</Text>
          <Text style={styles.value}>
            {formatNumber(booking?.price_deposit)} VND
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text style={styles.value}>
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
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Gia hạn:</Text>
          <Text style={styles.value}>
            <Button
              mode="outlined"
              loading={
                booking?.extends?.filter((item) => item.status === "pending")
                  .length >= 1
              }
              onPress={() =>
                navigation.navigate("ExtendListScreen", {
                  booking: booking,
                })
              }
              style={{ borderColor: "#7FB640", borderRaidus: 0 }}
            >
              Lịch sử gia hạn
            </Button>
          </Text>
        </View>

        <Divider style={styles.divider} />
        <View>
          <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>
          <ContractComponent contract={contract} isDownload={true} />
        </View>

        <Divider style={styles.divider} />
        {booking?.contract_image ? (
          <View>
            <Text style={styles.sectionTitle}>Hình ảnh hợp đồng</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageSlider}
            >
              {booking?.contract_image
                ?.replace(/[\[\]\n]/g, "")
                .trim()
                .split(",").length >= 0 &&
                booking?.contract_image
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
      </ScrollView>
      {booking?.status === "completed" && (
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() =>
            navigation.navigate("ExtendFormScreen", { booking: booking })
          }
        >
          <MaterialIcons name="add" size={28} color="white" />
        </TouchableOpacity>
      )}
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
