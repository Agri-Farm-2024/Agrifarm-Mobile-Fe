import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import Toast from "react-native-toast-message";
import { formatDate, formatDateToDDMMYYYY } from "../../utils";
import { bookingExtendLand } from "../../redux/slices/landSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ExtendFormScreen({ route }) {
  const [totalMonth, setTotalMonth] = useState("");
  const [totalMoney, setTotalMoney] = useState(0);
  const [isAgreed, setIsAgreed] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { booking } = route.params;
  console.log(booking);

  useEffect(() => {
    calculateTotalMoney();
  }, [totalMonth]);

  const calculateTotalMoney = () => {
    const pricePerMonth = parseInt(booking?.price_per_month);
    const months = parseInt(totalMonth, 10) || 0;
    setTotalMoney(pricePerMonth * months);
  };

  const handleSubmit = () => {
    Toast.show({
      type: "info",
      text1: "Đang xử lí...",
      text2: "Vui lòng chờ trong giây lát",
      visibilityTime: 0,
      autoHide: false,
    });
    if (!isAgreed) {
      Toast.show({
        type: "info",
        text1: "Vui lòng đồng ý với các điều khoản.",
      });
      return;
    }

    if (!totalMonth) {
      Toast.show({
        type: "info",
        text1: "Vui lòng nhập số tháng.",
      });
      return;
    }

    dispatch(
      bookingExtendLand({
        booking_land_id: booking?.booking_id,
        total_month: parseInt(totalMonth),
      })
    )
      .then((response) => {
        console.log("Booking successful:", response.payload);
        if (response.payload.statusCode === 400) {
          if (response.payload.message === "Booking is not paid yet") {
            Toast.show({
              type: "error",
              text1: "Đơn chưa được gửi",
              text2: "Hãy thanh toán hết tiền thuê cũ",
            });
            return;
          }
          if (
            response.payload.message ===
            "Extend is already exist please handle this extend first"
          ) {
            Toast.show({
              type: "error",
              text1: "Đơn chưa được gửi",
              text2: "Hãy xử lí đơn gia hạn trước đó",
            });
            return;
          }
          if (response.payload.message.includes("Land is already booked")) {
            Toast.show({
              type: "error",
              text1: "Đơn chưa được gửi",
              text2: "Mảnh đất không còn trống trong thời gian này",
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
            text2: "Hệ thống sẽ xử lí đơn gia hạn của bạn!",
          });
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        // Handle error response
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Đơn chưa được gửi",
          text2: "Booking Failed",
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Họ và Tên:</Text>
          <TextInput
            value={booking?.land_renter?.full_name}
            disabled
            style={styles.input}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={booking?.land_renter?.email}
            disabled
            style={styles.input}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tên mảnh đất:</Text>
          <TextInput
            value={booking?.land?.name}
            disabled
            style={styles.input}
          />
        </View>
        <Text style={styles.title}>Thông tin gia hạn</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Thời gian bắt đầu:</Text>
          <TextInput
            value={formatDateToDDMMYYYY(booking?.time_end)}
            disabled
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Số tháng muốn gia hạn:</Text>
        <TextInput
          label="Nhập số tháng"
          value={totalMonth}
          onChangeText={(text) => {
            setTotalMonth(text);
            calculateTotalMoney();
          }}
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.resultContainer}>
          <Text style={styles.label}>Tổng số tiền:</Text>
          <Text style={styles.value}>{totalMoney.toLocaleString()} VNĐ</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isAgreed ? "checked" : "unchecked"}
            onPress={() => setIsAgreed(!isAgreed)}
          />
          <Text style={styles.checkboxText}>
            Tôi đã đọc và đồng ý với{" "}
            <Text
              style={styles.checkboxLink}
              onPress={() =>
                // navigation.navigate("ReviewContractScreen", {
                //   land: { land },
                //   formData: { formData },
                // })
                console.log("press")
              }
            >
              các điều khoản của hợp đồng
            </Text>
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          icon="send-outline"
        >
          GIA HẠN
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#7FB640",
  },
  infoContainer: {
    flexDirection: "column",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 25,
    color: "#7FB640",
    fontWeight: "700",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  resultContainer: {
    flexDirection: "column",
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    marginTop: 16,
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
