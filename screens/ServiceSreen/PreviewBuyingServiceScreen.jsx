import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatNumber } from "../../utils";
import { Button, Checkbox } from "react-native-paper";
import { getUserSelector } from "../../redux/selectors";
import { buyService } from "../../redux/slices/serviceSlice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ContractServicesDialog from "../../components/ContractServicesDialog/ContractServicesDialog";

export default function PreviewBuyingServiceScreen({ route, navigation }) {
  const { serviceInfo } = route.params;
  console.log("serviceInfo: " + JSON.stringify(serviceInfo));
  const [visibleContract, setVisibleContract] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const userSelector = useSelector(getUserSelector);

  const dispatch = useDispatch();

  const totalPrice =
    (serviceInfo.service_price / 1000) * serviceInfo.acreage_land +
    (serviceInfo.seasonPrice / 1000) * serviceInfo.acreage_land;

  const handleBuyService = () => {
    try {
      const formData = {
        plant_season_id: serviceInfo.plant_season_id,
        booking_id: serviceInfo.booking_id,
        service_package_id: serviceInfo.service_package_id,
        acreage_land: serviceInfo.acreage_land,
        time_start: formatDate(serviceInfo.time_start, 1),
      };
      if (!isChecked) {
        Toast.show({
          type: "error",
          text1: "Hãy đồng ý với điều khoản!",
        });
        return;
      }
      console.log("FormData buy service: " + formData);
      dispatch(buyService(formData)).then((response) => {
        console.log("Buy service response", JSON.stringify(response));
        if (response.payload.statusCode != 201) {
          if (
            response.payload.statusCode == 400 &&
            response.payload.message.includes("Acreage land is not enough")
          ) {
            Toast.show({
              type: "error",
              text1: "Diện tích mảnh đất có sẵn không đủ!",
            });
          } else if (
            response.payload.statusCode == 400 &&
            response.payload.message.includes("Time is not valid")
          ) {
            const timeStr = response.payload.message.split(" ").pop();
            const [month, day, year] = timeStr.split("/");
            const convertedDate = `${day}/${month}/${year}`;
            Toast.show({
              type: "error",
              text1: "Không đủ thời hạn thuê đất!",
              text2: `Thời gian thuê đất sẽ hết hạn vào ${convertedDate}`,
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
          // Toast.show({
          //   type: "success",
          //   text1: "Mua dịch vụ thành công!",
          // });

          navigation.navigate("PaymentServiceScreen", {
            paymentInfo: {
              transactionID: response?.payload?.metadata?.transaction_id,
              payment_link: response?.payload?.metadata?.payment_link,
            },
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
                    {formatNumber(serviceInfo.service_price)} VND
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
                  <Text style={styles.textValue}>
                    {formatDate(serviceInfo.time_start, 0)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.textLabel}>Giá quy trình mùa vụ</Text>
                  <Text style={styles.textValue}>
                    {formatNumber(serviceInfo.seasonPrice)} VND/1000 m²
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={{ color: "#313638", fontWeight: "bold" }}>
                    Tổng tiền thanh toán
                  </Text>
                  <Text style={{ color: "#313638", fontWeight: "bold" }}>
                    {totalPrice && formatNumber(totalPrice)} VND
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => setIsChecked(!isChecked)}
                color="#7fb640"
              />
              <Text style={styles.checkboxText}>
                Tôi đã đọc và đồng ý với{" "}
                <Text
                  style={styles.checkboxLink}
                  onPress={() => setVisibleContract(true)}
                >
                  các điều khoản của hợp đồng
                </Text>
              </Text>
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
          <ContractServicesDialog
            isVisible={visibleContract}
            onDismiss={() => setVisibleContract(false)}
          />
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

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  checkboxLink: {
    color: "#7fb640",
    fontWeight: "bold",
  },
});
