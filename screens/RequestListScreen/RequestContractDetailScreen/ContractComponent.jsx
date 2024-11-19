import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  formatDateToDDMMYYYY,
  formatDateToVN,
  formatNumber,
} from "../../../utils";

const ContractComponent = ({ contract, isDownload }) => {
  const [textSize, setTextSize] = useState(16);
  console.log(contract);

  const increaseTextSize = () => {
    if (textSize >= 20) {
      Toast.show({
        type: "error",
        text1: "Đã phóng to chữ tối đa",
      });
    } else {
      setTextSize((prevSize) => prevSize + 2);
    }
  };

  const decreaseTextSize = () => {
    if (textSize <= 12) {
      Toast.show({
        type: "error",
        text1: "Đã thu nhỏ chữ tối đa",
      });
    } else {
      setTextSize((prevSize) => prevSize - 2);
    }
  };

  if (!contract) return <Text>Khong co hop dong</Text>;

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={increaseTextSize}
          style={styles.textButton}
          accessibilityLabel="Increase text size"
        >
          Phóng to
        </Button>
        {isDownload && (
          <Button
            mode="contained"
            onPress={() => console.log("press")}
            style={{
              backgroundColor: "orange",
            }}
          >
            Tải PDF
          </Button>
        )}
        <Button
          mode="contained"
          onPress={decreaseTextSize}
          style={styles.textButton}
          accessibilityLabel="Decrease text size"
        >
          Thu nhỏ
        </Button>
      </View>
      <ScrollView style={styles.container}>
        <Text style={[styles.header, { fontSize: textSize + 8 }]}>
          HỢP ĐỒNG THUÊ ĐẤT
        </Text>
        <Text style={[styles.subtitle, { fontSize: textSize }]}>Số: …..</Text>

        <Text style={[styles.centerText, { fontSize: textSize }]}>
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Text>
        <Text style={[styles.centerText, { fontSize: textSize }]}>
          Độc lập - Tự do - Hạnh phúc
        </Text>
        <Text style={[styles.date, { fontSize: textSize }]}>
          Đồng Nai, {formatDateToVN(contract.createAt)}
        </Text>

        <Text style={[styles.sectionTitle, { fontSize: textSize + 4 }]}>
          HỢP ĐỒNG THUÊ ĐẤT
        </Text>

        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          Căn cứ Luật Đất đai ngày 29 tháng 11 năm 2013;{"\n"}
          Căn cứ Nghị định số 43/2014/NĐ-CP ngày 15 tháng 5 năm 2014 của Chính
          phủ quy định chi tiết thi hành một số điều của Luật Đất đai;{"\n"}
          Căn cứ Thông tư số 30/2014/TT-BTNMT ngày 02 tháng 6 năm 2014 của Bộ
          trưởng Bộ Tài nguyên và Môi trường quy định về hồ sơ giao đất, cho
          thuê đất, chuyển mục đích sử dụng đất, thu hồi đất;
        </Text>

        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          Hôm nay, {formatDateToVN(contract.createAt)}, chúng tôi gồm:
        </Text>

        <Text style={[styles.sectionHeader, { fontSize: textSize + 2 }]}>
          I. Bên cho thuê đất:
        </Text>
        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          {contract.farmOwner}
        </Text>

        <Text style={[styles.sectionHeader, { fontSize: textSize + 2 }]}>
          II. Bên thuê đất:
        </Text>
        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          {contract.landrenter}
        </Text>

        <Text style={[styles.sectionHeader, { fontSize: textSize + 2 }]}>
          III. Điều khoản hợp đồng:
        </Text>

        <Text style={[styles.sectionSubheader, { fontSize: textSize + 1 }]}>
          Điều 1. Thông tin khu đất thuê:
        </Text>
        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          1. Diện tích đất: {formatNumber(contract.pricePerMonth)} m2{"\n"}
          2. Vị trí: {contract.position} của trang trại AgriFarm - Tại 268 Ấp
          Trung Tâm, Thanh Bình Trảng Bom Đồng Nai {"\n"}
          3. Thời hạn thuê đất: {contract.totalMonth} {"\n"}
          4. Mục đất thuê đất: {contract.purpose}
        </Text>

        <Text style={[styles.sectionSubheader, { fontSize: textSize + 1 }]}>
          Điều 2. Trách nhiệm thanh toán:
        </Text>
        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          1. Giá thuê đất: 60,000,000 đồng/m2/năm{"\n"}
          2. Phương thức thanh toán: Chuyển khoản qua MB Bank
        </Text>

        <Text style={[styles.sectionSubheader, { fontSize: textSize + 1 }]}>
          Điều 3. Quyền và nghĩa vụ của các bên:
        </Text>
        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          1. Bên cho thuê bảo đảm quyền sử dụng đất của bên thuê trong thời hạn
          hợp đồng.{"\n"}
          2. Bên thuê không được chuyển nhượng quyền thuê đất cho bên thứ ba.
        </Text>

        <Text style={[styles.sectionSubheader, { fontSize: textSize + 1 }]}>
          Điều 4. Thời hạn và điều kiện chấm dứt hợp đồng:
        </Text>
        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          Hợp đồng này sẽ chấm dứt khi hết thời hạn hoặc khi bên thuê bị phá
          sản, không gia hạn hợp đồng, hoặc do yêu cầu từ cơ quan có thẩm quyền.
        </Text>

        <Text style={[styles.sectionSubheader, { fontSize: textSize + 1 }]}>
          Điều 5. Cam kết của các bên:
        </Text>
        <Text style={[styles.paragraph, { fontSize: textSize }]}>
          Các bên cam kết thực hiện đúng quy định trong hợp đồng, nếu vi phạm sẽ
          phải bồi thường thiệt hại phát sinh.
        </Text>

        <Text style={[styles.signOff, { fontSize: textSize }]}>
          Bên thuê đất{"\n"}(Ký, ghi rõ họ tên, đóng dấu nếu có)
        </Text>
        <Text style={[styles.signOff, { fontSize: textSize }]}>
          Bên cho thuê đất{"\n"}(Ký, ghi rõ họ tên, đóng dấu nếu có)
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textButton: {
    backgroundColor: "#7fb640",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  centerText: {
    textAlign: "center",
  },
  date: {
    textAlign: "right",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  paragraph: {
    lineHeight: 24,
    marginBottom: 10,
  },
  sectionHeader: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
  sectionSubheader: {
    fontWeight: "600",
    marginBottom: 5,
  },
  signOff: {
    textAlign: "center",
    marginTop: 30,
  },
});

export default ContractComponent;
