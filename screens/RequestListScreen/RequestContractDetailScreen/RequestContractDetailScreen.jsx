// RequestContractDetailScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Text, Checkbox, Button, Divider } from "react-native-paper";
import ContractComponent from "./ContractComponent"; // Import the contract component
import Toast from "react-native-toast-message";

export default function RequestContractDetailScreen() {
  const [checked, setChecked] = useState(false);
  const [textSize, setTextSize] = useState(16); // State for adjusting text size
  const [lineHeight, setLineHeight] = useState(24); // State for adjusting text size

  const increaseTextSize = () => {
    if (textSize >= 20) {
      Toast.show({
        type: "error",
        text1: "Đã phóng to chữ tối đa",
      });
    } else {
      setTextSize((prevSize) => prevSize + 2); // Increase text size
      setLineHeight(textSize * 1.4);
    }
  };

  const decreaseTextSize = () => {
    if (textSize <= 12) {
      Toast.show({
        type: "error",
        text1: "Đã thu nhỏ chữ tối đa",
      });
    } else {
      setTextSize((prevSize) => prevSize - 2); // Decrease text size with minimum limit
      setLineHeight(textSize * 1.4);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={styles.container}>
        {/* Request details */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Yêu cầu:</Text>
          <Text style={styles.value}>Yêu cầu thuê đất</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
          <Text style={styles.value}>25/09/2020</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text style={styles.value}>Chấp nhận</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Nội dung yêu cầu:</Text>
          <Text style={styles.value}>Yêu cầu thuê mảnh đất MD001</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ghi chú:</Text>
          <Text style={styles.value}>
            Đây là ghi chú dài, và nó cũng có thể cần hiển thị trên nhiều dòng
            tùy thuộc vào kích thước màn hình và nội dung.
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Section title */}
        <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>

        {/* Contract info with scrollable content */}
        <View style={styles.contractInfoContainer}>
          <ContractComponent textSize={textSize} lineHeight={lineHeight} />
        </View>

        {/* Buttons to adjust text size */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={increaseTextSize}
            style={styles.textButton}
          >
            Phóng to
          </Button>
          <Button
            mode="contained"
            onPress={decreaseTextSize}
            style={styles.textButton}
          >
            Thu nhỏ
          </Button>
        </View>

        {/* Checkbox with text */}
        <View style={styles.checkboxContainer}>
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
        </View>

        {/* Button */}
        <Button
          mode="contained"
          style={styles.button}
          disabled={!checked}
          onPress={() => console.log("Proceeding to payment")}
        >
          Tiến hành thanh toán
        </Button>
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
  contractInfoContainer: {
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textButton: {
    backgroundColor: "#7fb640",
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
