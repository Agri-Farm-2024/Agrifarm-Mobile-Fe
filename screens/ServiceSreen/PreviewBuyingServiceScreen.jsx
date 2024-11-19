import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTransactionByID } from "../../redux/slices/transactionSlice";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { formatDateToDDMMYYYY, formatNumber } from "../../utils";
import { Button } from "react-native-paper";
import { getUserSelector } from "../../redux/selectors";
import { buyService } from "../../redux/slices/serviceSlice";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function PreviewBuyingServiceScreen({ route }) {
  const { serviceInfo } = route.params;

  const userSelector = useSelector(getUserSelector);

  const dispatch = useDispatch();

  const handleBuyService = () => {
    try {
      const formData = {
        plant_season_id: serviceInfo.plant_season_id,
        booking_id: serviceInfo.booking_id,
        service_package_id: serviceInfo.service_package_id,
        acreage_land: serviceInfo.acreage_land,
        time_start: serviceInfo.time_start,
      };
      console.log("FormData buy service: " + formData);
      dispatch(buyService(formData)).then((response) => {
        console.log("Buy service response", JSON.stringify(response));
        if (response.payload.statusCode != 201) {
          if (
            response.payload.statusCode == 400 &&
            response.payload.message == "Acreage land is not enough"
          ) {
            Toast.show({
              type: "error",
              text1: "Diện tích mảnh đất có sẵn không đủ!",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Mua dịch vụ thất bại!",
            });
          }
        }
        if (response.payload.statusCode == 201) {
          console.log("buy service", JSON.stringify(response.payload));
          Toast.show({
            type: "success",
            text1: "Mua dịch vụ thành công!",
          });
        }
      });
    } catch (error) {
      console.log("Error buying service: " + error);
    }
  };

  return (
    <>
      {!serviceInfo && <Text>Không tìm thấy dịch vụ</Text>}
      {serviceInfo && (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
              <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Tên khách hàng</Text>
                  <Text style={styles.textValue}>
                    {userSelector?.full_name || ""}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Mảnh đất</Text>
                  <Text style={styles.textValue}>{serviceInfo.plot_name}</Text>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Gói dịch vụ</Text>
                  <Text style={styles.textValue}>
                    {serviceInfo.service_name}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Giá gói dịch vụ</Text>
                  <Text style={styles.textValue}>
                    {serviceInfo.service_price}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Mùa vụ</Text>
                  <Text style={styles.textValue}>
                    {serviceInfo.season_name}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Diện tích áp dụng</Text>
                  <Text style={styles.textValue}>
                    {serviceInfo.acreage_land} m²
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Ngày bắt đầu canh tác</Text>
                  <Text style={styles.textValue}>{serviceInfo.time_start}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Giá quy trình mùa vụ</Text>
                  <Text style={styles.textValue}>
                    {serviceInfo.seasonPrice} VND/1000 m²
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={{ color: "#313638", fontWeight: "bold" }}>
                    Tổng tiền thanh toán
                  </Text>
                  <Text style={{ color: "#313638", fontWeight: "bold" }}>
                    {formatNumber(200000)} VND
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleBuyService()}
            >
              Tiến hành thanh toán
            </Button>
          </View>
        </View>
      )}
    </>
  );
}

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
    gap: 10,
    paddingBottom: 10,
    marginBottom: 20,
    justifyContent: "space-between",
    borderColor: "#b3b3b3",
  },
  textLabel: {
    color: "#707070",
  },
  textValue: {
    color: "#707070",
    fontWeight: "bold",
    textAlign: "right",
    maxWidth: "55%",
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
