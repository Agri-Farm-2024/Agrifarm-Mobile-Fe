import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Checkbox, Icon, Text } from "react-native-paper";
import LandLeaseInput from "./LandLeaseInput/LandLeaseInput";
import LandLeaseSign from "./LandLeaseSign/LandLeaseSign";
import Toast from "react-native-toast-message";
import LandLeaseReview from "./LandLeaseReview/LandLeaseReview";
import { useDispatch } from "react-redux";
import { bookingLand } from "../../redux/slices/landSlice";
import { TouchableOpacity } from "react-native";

export default function LandLeaseScreen({ navigation, route }) {
  const { land } = route.params;
  const [tourStep, setTourStep] = useState(0);
  const landLeaseInputRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    rentalMonths: "",
    purpose: "",
    startTime: new Date(),
  });

  const dispatch = useDispatch();

  console.log(land);
  const handleGetData = (data) => {
    console.log("handleGetData: ", data);
    setFormData(data); // Update form data
  };

  const handleNextStep = () => {
    if (tourStep === 0 && landLeaseInputRef.current) {
      landLeaseInputRef.current.submitForm();
    }
  };

  const handlePrevStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  const handleSubmitForm = () => {
    Toast.show({
      type: "info",
      text1: "Đang xử lí...",
      text2: "Vui lòng chờ trong giây lát",
      visibilityTime: 0,
      autoHide: false,
    });

    if (!isChecked) {
      Toast.show({
        type: "error",
        text1: "Chưa gửi được đơn",
        text2: "Vui lòng nhấn xác nhận đồng ý với điều khoản!",
      });
      return;
    }

    dispatch(
      bookingLand({
        land_id: land.land_id,
        time_start: formData.startTime,
        total_month: formData.rentalMonths,
        purpose_rental: formData.purpose,
      })
    )
      .then((response) => {
        console.log("Booking successful:", response);
        if (response.payload.statusCode === 400) {
          if (
            response.payload.message === "Wait for manager assign staff to land"
          ) {
            Toast.show({
              type: "error",
              text1: "Đơn chưa được gửi",
              text2: "Đất chưa được quản lí bởi nhân viên",
            });
            return;
          }
          Toast.show({
            type: "error",
            text1: "Đơn chưa được gửi",
            text2: `${response.payload.message}`,
          });
        }

        if (response.payload.statusCode === 500) {
          Toast.show({
            type: "error",
            text1: "Đơn chưa được gửi",
            text2: `Lỗi hệ thống !!!`,
          });
        }

        if (response.payload.statusCode === 201) {
          Toast.show({
            type: "success",
            text1: "Đơn đã được gửi",
            text2: "Hệ thống sẽ xử lí đơn thuê đất của bạn!",
          });
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        // Handle error response
        Toast.show({
          type: "error",
          text1: "Đơn chưa được gửi",
          text2: "Booking Failed",
        });
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={styles.container}
    >
      <View style={styles.stepIndicator}>
        <Icon source="circle" size={20} color="#007AFF" />
        <Icon source="minus" size={20} color="#b9b9c3" />
        <Icon source="minus" size={20} color="#b9b9c3" />
        {tourStep === 0 ? (
          <Icon source="circle-outline" size={20} color="#b9b9c3" />
        ) : (
          <Icon source="circle" size={20} color="#007AFF" />
        )}
      </View>

      {tourStep === 0 && (
        <LandLeaseInput
          onSubmitSuccess={() => setTourStep(1)}
          handleGetData={handleGetData}
          formData={formData} // Pass the state
          ref={landLeaseInputRef}
          land={land}
        />
      )}

      {tourStep === 1 && <LandLeaseReview land={land} formData={formData} />}

      <View>
        {tourStep === 1 && (
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
                onPress={() =>
                  navigation.navigate("ReviewContractScreen", {
                    land: { land },
                    formData: { formData },
                  })
                }
              >
                các điều khoản của hợp đồng
              </Text>
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            style={{
              borderRadius: 5,
              borderColor: tourStep == 0 ? null : "#7fb640",
            }}
            mode="outlined"
            onPress={handlePrevStep}
            disabled={tourStep === 0}
            textColor="#7fb640"
          >
            Quay về
          </Button>

          {tourStep === 1 ? (
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmitForm}
            >
              Gửi đơn
            </Button>
          ) : (
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleNextStep}
            >
              Tiếp tục
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  checkboxLink: {
    color: "#7fb640",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#7fb640",
  },
});
