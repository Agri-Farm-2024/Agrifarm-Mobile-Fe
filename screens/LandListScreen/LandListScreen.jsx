import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import LandItem from "./LandItem"; // Import LandItem component
import { FontAwesome } from "@expo/vector-icons";

export default function LandListScreen() {
  // Sample data for the list
  const landData = [
    {
      id: "1",
      name: "Mảnh đất số 1",
      area: 100000,
      description: "Phù hợp để trồng cây ăn quả với nguồn nước gần kề.",
      status: "Chưa thuê",
      image:
        "https://th.bing.com/th/id/R.b4162ca3b8c344b4aa04152586b08bf7?rik=l1dx17OpW4y9sA&riu=http%3a%2f%2fimg2.chinadaily.com.cn%2fimages%2f201906%2f10%2f5cfd8f17a3101765669e0f97.jpeg&ehk=plJIaJ0YbyWBC21exwu2AJVo2QdcwY8fFl9Hotqxm78%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: "2",
      name: "Mảnh đất số 2",
      area: 100000,
      description: "Phù hợp để trồng cây ăn quả với nguồn nước gần kề.",
      status: "Đã thuê",
      image: "https://live.staticflickr.com/7452/9401123221_3c820bf90d_b.jpg",
    },
    {
      id: "3",
      name: "Mảnh đất số 3",
      area: 100000,
      description: "Đất rộng, thích hợp để trồng rau.",
      status: "Đã thuê",
      image:
        "https://img.freepik.com/premium-photo/modern-agriculture-tractor-working-fields-sunrise_462685-36292.jpg",
    },
    {
      id: "4",
      name: "Mảnh đất số 4",
      area: 100000,
      description: "Đất rộng, thích hợp để trồng rau.",
      status: "Đã thuê",
      image:
        "https://th.bing.com/th/id/R.b4162ca3b8c344b4aa04152586b08bf7?rik=l1dx17OpW4y9sA&riu=http%3a%2f%2fimg2.chinadaily.com.cn%2fimages%2f201906%2f10%2f5cfd8f17a3101765669e0f97.jpeg&ehk=plJIaJ0YbyWBC21exwu2AJVo2QdcwY8fFl9Hotqxm78%3d&risl=&pid=ImgRaw&r=0",
    },
  ];

  // Filter status state and filtered data
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [modalVisible, setModalVisible] = useState(false);

  // Filtered data based on status
  const filteredData =
    selectedStatus === "Tất cả"
      ? landData
      : landData.filter((item) => item.status === selectedStatus);

  // Function to render each item
  const renderItem = ({ item }) => <LandItem item={item} />;

  // Function to handle status selection
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Button to select status */}
      <View style={{ alignItems: "flex-end" }}>
        <Button
          mode="outlined"
          onPress={() => setModalVisible(true)}
          style={styles.button}
          icon="filter-outline"
          textColor="black"
        >
          Lọc
        </Button>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View
              style={{
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 15,
              }}
            >
              <Text style={styles.optionTitle}>Chọn trạng thái</Text>
            </View>
            {["Tất cả", "Chưa thuê", "Đã thuê"].map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => handleStatusSelect(status)}
                style={styles.option}
              >
                <Text style={styles.optionText}>{status}</Text>
                <FontAwesome
                  name={
                    status === selectedStatus ? "dot-circle-o" : "circle-thin"
                  }
                  size={28}
                  color="#7FB640"
                />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  button: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    width: 80,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 14,
    textAlign: "center",
  },
  optionTitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
