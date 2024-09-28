import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ContractComponent({ textSize = 16, lineHeight = 24 }) {
  return (
    <ScrollView contentContainerStyle={styles.contractScrollView}>
      <View>
        {/* Breaking each section into separate Text components */}
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          HỢP ĐỒNG THUÊ ĐẤT
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Số: ….. {"\n"}
        </Text>
        <Text
          style={[
            styles.contractText,
            { fontSize: textSize, lineHeight, textAlign: "center" },
          ]}
        >
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Text>
        <Text
          style={[
            styles.contractText,
            { fontSize: textSize, lineHeight, textAlign: "center" },
          ]}
        >
          Độc lập - Tự do - Hạnh phúc {"\n\n"}...., ngày..... tháng .....năm
          .... {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          CHÚNG TÔI, MỘT BÊN LÀ{"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}BÊN CHO THUÊ (BÊN A){"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          Công ty:
          ...........................................................................
          {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Địa chỉ:
          ............................................................................
          {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Đại diện:
          ............................................................................
          {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}BÊN THUÊ (BÊN B){"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          Ông/Bà:
          ...........................................................................
          {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Số CMND/CCCD:
          ...................................................................
          {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Địa chỉ:
          ............................................................................
          {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Điều 1: Đối tượng của hợp đồng{"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Bên A đồng ý cho Bên B thuê mảnh đất có diện tích ..... tại
          ....................... {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Điều 2: Thời hạn thuê{"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          Thời hạn thuê đất là ............. tháng, tính từ ngày
          .................... đến ngày ............ {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Điều 3: Giá thuê{"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          Giá thuê đất là ..................... đồng/tháng. Bên B thanh toán
          theo ................... {"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {"\n"}Điều 4: Quyền và nghĩa vụ của các bên{"\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          (Nội dung đầy đủ của hợp đồng sẽ được bổ sung tại đây).{"\n\n"}
        </Text>
        <Text style={[styles.contractText, { fontSize: textSize, lineHeight }]}>
          {`... tiếp tục với các điều khoản hợp đồng chi tiết khác ...`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contractScrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contractText: {
    color: "#333",
  },
});
