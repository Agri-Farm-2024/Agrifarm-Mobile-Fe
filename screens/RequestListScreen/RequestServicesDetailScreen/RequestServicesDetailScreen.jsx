import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Text, Checkbox, Button, Divider } from "react-native-paper";

export default function RequestServicesDetailScreen() {
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Request details */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Yêu cầu:</Text>
          <Text style={styles.value}>Yêu cầu gói dịch vụ số 1</Text>
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
          <Text style={styles.value}>
            Yêu cầu sử dụng gói dịch vụ DV001 với nội dung rất dài và có thể
            chiếm nhiều dòng để hiển thị đúng nội dung.
          </Text>
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
        <Text style={styles.sectionTitle}>Thông tin dịch vụ</Text>
        <View style={styles.serviceInfoContainer}>
          {/* Service Title */}
          <Text style={styles.serviceTitle}>Gói dịch vụ Trồng trọt Cơ Bản</Text>

          {/* Service Description */}
          <Text style={styles.serviceDescription}>
            Gói dịch vụ này cung cấp hỗ trợ toàn diện cho việc trồng trọt theo
            tiêu chuẩn VietGAP, bao gồm cung cấp vật tư, kỹ thuật canh tác và
            quản lý chất lượng.
          </Text>

          {/* Package Price */}
          <Text style={styles.servicePackagePrice}>
            Giá thu mua sản phẩm(VND): 50.000/KG
          </Text>
          <Text style={styles.servicePackagePrice}>
            Giá trọn gói dịch vụ: 5,000,000 VND
          </Text>
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
                đồng ý với các điều khoản của dịch vụ
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
});
