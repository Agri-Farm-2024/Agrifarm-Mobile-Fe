import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Text, Checkbox, Button, Divider } from "react-native-paper";
import ContractComponent from "./ContractComponent"; // Import the contract component
import Toast from "react-native-toast-message";

export default function RequestContractDetailScreen({ navigation }) {
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

        {/* Image contract - Click to open modal display contract */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.FKkP-bE7nQTjz6oMT_DD6QHaKk?rs=1&pid=ImgDetMain",
            }} // Replace with actual image URL
            style={styles.contractImage}
          />
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Đóng</Text>
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIP.FKkP-bE7nQTjz6oMT_DD6QHaKk?rs=1&pid=ImgDetMain",
              }} // Replace with actual image URL
              style={styles.modalImage}
            />
          </View>
        </Modal>

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
          onPress={() => {
            navigation.navigate("PaymentScreen");
          }}
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
  contractImage: {
    width: "100%",
    height: 700,
    resizeMode: "cover",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
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
