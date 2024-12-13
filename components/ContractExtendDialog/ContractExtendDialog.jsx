import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { formatDateToVN, formatNumber } from "../../utils";

export default function ContractExtendDialog({
  isVisible,
  onDismiss,
  contract,
}) {
  const textSize = 14;
  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onDismiss}
        style={{
          backgroundColor: "white",
        }}
      >
        <Dialog.Title
          style={{ textAlign: "center", color: "#7FB640", fontWeight: "bold" }}
        >
          Hợp đồng gia hạn
        </Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView
            style={{ height: "85%", borderColor: "white" }}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <Text style={styles.subHeader}>
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                {"\n"}
                Độc lập - Tự do - Hạnh phúc
              </Text>
              <Text style={styles.date}>
                Đồng Nai,
                <Text style={styles.italic}>
                  {" "}
                  {new Date().toLocaleDateString()}
                </Text>
                .
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
                  <Text style={styles.italic}>
                    {" "}
                    {formatNumber(contract.area)} m2
                  </Text>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.bold}>
                  4. Thời gian muốn gia hạn:{" "}
                  <Text style={styles.italic}>
                    {" "}
                    {contract.totalMonth} tháng
                  </Text>
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
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Xong</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
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
