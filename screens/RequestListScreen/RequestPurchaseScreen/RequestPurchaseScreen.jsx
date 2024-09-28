import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Text, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Material Icons

export default function RequestPurchaseScreen() {
  const [textSize, setTextSize] = useState(16); // Default text size

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Request details */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Yêu cầu:</Text>
          <Text
            style={[
              styles.value,
              { fontSize: textSize, lineHeight: textSize * 1.5 },
            ]}
          >
            Yêu cầu thu mua
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
          <Text
            style={[
              styles.value,
              { fontSize: textSize, lineHeight: textSize * 1.5 },
            ]}
          >
            25/09/2020
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text
            style={[
              styles.value,
              { fontSize: textSize, lineHeight: textSize * 1.5 },
            ]}
          >
            Chấp nhận
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Nội dung yêu cầu:</Text>
          <Text
            style={[
              styles.value,
              { fontSize: textSize, lineHeight: textSize * 1.5 },
            ]}
          >
            Yêu cầu thu mua theo gói
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Ghi chú:</Text>
          <Text
            style={[
              styles.value,
              { fontSize: textSize, lineHeight: textSize * 1.5 },
            ]}
          >
            Đây là ghi chú dài, và nó cũng có thể cần hiển thị trên nhiều dòng
            tùy thuộc vào kích thước màn hình và nội dung.
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Section title */}
        <Text style={styles.sectionTitle}>Lịch sử trạng thái thu mua</Text>

        {/* Purchasing status section */}
        <View style={styles.historyInfoContainer}>
          {/* Step 1 */}
          <View style={styles.statusContainer}>
            <Icon
              name="check-circle"
              size={24}
              color="#7fb640"
              style={styles.icon}
            />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>1. Chấp nhận</Text>
              <Text style={styles.statusDesc}>
                Mua hàng đã được chấp thuận bởi nhân viên.
              </Text>
              <Text style={styles.statusQuantity}>Số lượng: 10</Text>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.statusContainer}>
            <Icon
              name="check-circle"
              size={24}
              color="#7fb640"
              style={styles.icon}
            />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>2. Đã kiểm tra</Text>
              <Text style={styles.statusDesc}>
                Chuyên gia nông nghiệp đã kiểm tra sản lượng dự kiến
              </Text>
              <Text style={styles.statusQuantity}>Số lượng: 100kg</Text>
            </View>
          </View>

          {/* Step 3 */}
          <View style={styles.statusContainer}>
            <Icon
              name="check-circle"
              size={24}
              color="#7fb640"
              style={styles.icon}
            />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>3. Đơn hàng</Text>
              <Text style={styles.statusDesc}>
                Quản lý gửi bạn đơn hàng cho thu mua.
              </Text>
            </View>
          </View>

          {/* Step 4 */}
          <View style={styles.statusContainer}>
            <Icon
              name="check-circle"
              size={24}
              color="#7fb640"
              style={styles.icon}
            />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>4. Chấp nhận đơn hàng</Text>
              <Text style={styles.statusDesc}>
                Bạn đồng ý với đơn hàng. Chuyên viên sẽ xuống thu hoạch
              </Text>
              <Text style={styles.statusQuantity}>Số lượng: 100kg</Text>
            </View>
          </View>

          {/* Step 5 */}
          <View style={styles.statusContainer}>
            <Icon
              name="check-circle"
              size={24}
              color="#7fb640"
              style={styles.icon}
            />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>5. Đã thu hoạch</Text>
              <Text style={styles.statusDesc}>
                Chuyên viên đã thu hoạch và báo cáo sản lượng sau thu hoạch
              </Text>
              <Text style={styles.statusQuantity}>Số lượng: 100kg</Text>
            </View>
          </View>

          {/* Step 6 */}
          <View style={styles.statusContainer}>
            <Icon
              name="check-circle"
              size={24}
              color="#7fb640"
              style={styles.icon}
            />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>6. Thanh toán</Text>
              <Text style={styles.statusDesc}>
                Thanh toán đã được thực hiện.
              </Text>
              <Text style={styles.statusQuantity}>Số lượng: 10</Text>
            </View>
          </View>
        </View>
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
  historyInfoContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  historyTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  statusContainer: {
    borderWidth: 1, // Add border width
    borderColor: "#7fb640", // Set the border color
    padding: 10, // Add padding inside the container
    borderRadius: 5, // Optional: Rounded corners
    marginBottom: 15, // Space between each status entry
    flexDirection: "row", // Align icon and text in a row
    alignItems: "flex-start", // Align items vertically
  },
  icon: {
    marginRight: 10, // Space between the icon and the text
  },
  statusTextContainer: {
    flex: 1, // Allow text container to take the remaining space
  },
  statusTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  statusDesc: {
    color: "#666",
  },
  statusQuantity: {
    color: "#7fb640",
    fontWeight: "bold",
  },
});
