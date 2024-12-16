import React, { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import EmptyComponent from "../../components/EmptyComponent/EmptyComponent";
import { DownloadPDF } from "../../components/DownloadPDF/DownloadPDF";
import { formatNumber } from "../../utils";

const ContractComponent = ({ contract, isDownload }) => {
  const downLoadRef = useRef();
  const [textSize, setTextSize] = useState(16);
  console.log(contract);

  if (!contract) return;
  <EmptyComponent message="Không có hợp đồng" />;

  return (
    <View>
      <View style={styles.buttonContainer}>
        {/* <Button
          mode="contained"
          onPress={increaseTextSize}
          style={styles.textButton}
          accessibilityLabel="Increase text size"
        >
          Phóng to
        </Button>
        <Button
          mode="contained"
          onPress={decreaseTextSize}
          style={styles.textButton}
          accessibilityLabel="Decrease text size"
        >
          Thu nhỏ
        </Button> */}
        {/* {isDownload && (
          <Button
            mode="contained"
            onPress={() => {
              if (downLoadRef.current) {
                downLoadRef.current.handleDownloadPdf();
              }
            }}
            style={{
              borderColor: "orange",
              backgroundColor: "white",
              borderWidth: 1,
            }}
            textColor="orange"
          >
            Tải PDF
          </Button>
        )} */}
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.subHeader}>
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          {"\n"}
          Độc lập - Tự do - Hạnh phúc
        </Text>
        <Text style={styles.date}>
          Đồng Nai,
          <Text style={styles.italic}> {new Date().toLocaleDateString()}</Text>.
        </Text>
        <View style={styles.section}>
          <Text style={styles.bold}>
            1. Người xin gia hạn sử dụng đất:{" "}
            <Text style={styles.italic}> {contract.landrenter}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.bold}>
            2. Email: <Text style={styles.italic}> {contract.email}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.bold}>
            3. Thông tin về thửa đất/khu đất đang sử dụng:
          </Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Tên mảnh đất: </Text>
            <Text style={styles.italic}> {contract.position}</Text>
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Diện tích đất (m2): </Text>
            <Text style={styles.italic}> {formatNumber(contract.area)} m2</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.bold}>
            4. Thời gian muốn gia hạn:{" "}
            <Text style={styles.italic}> {contract.totalMonth} tháng</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.bold}>5. Cam kết: </Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.listItem}>Sử dụng đất đúng mục đích.</Text>
          <Text style={styles.listItem}>
            Chấp hành đúng các quy định của pháp luật đất đai.
          </Text>
          <Text style={styles.listItem}>
            Nộp tiền sử dụng đất (nếu có) đầy đủ, đúng hạn.
          </Text>
        </View>
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text>Người làm đơn</Text>
          </View>
          <View style={styles.signature}>
            <Text>Doanh nghiệp</Text>
          </View>
        </View>
      </ScrollView>
      <DownloadPDF ref={downLoadRef} />
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
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "right",
  },
  italic: {
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
  },
  list: {
    marginTop: 10,
    marginLeft: 20,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signature: {
    alignItems: "center",
  },
  signatureLine: {
    marginTop: 50,
  },
});

export default ContractComponent;
