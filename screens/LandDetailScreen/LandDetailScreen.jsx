import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Appbar, Button } from "react-native-paper";

const data = {
  landID: "MD001",
  nameLand: "Mảnh đất số 1",
  area: "1000 m2",
  position: "Khu vực A, lô số 1",
  status: "Đã thuê",
  description: {
    title: "Mảnh đất nông nghiệp tại AgriFarm",
    desc: "Chào mừng bạn đến với AgriFarm",
    sub: [
      {
        sub_title: "Vị trí và diện tích",
        sub_desc:
          "Mảnh đất số 1 nằm ở khu vực trung tâm của trang trại AgriFarm, với diện tích 500 mét vuông. Vị trí này rất thuận lợi, chỉ cách nhà kho và nguồn nước chính của trang trại khoảng 100 mét, giúp bạn dễ dàng tiếp cận và quản lý các hoạt động canh tác.",
      },
      {
        sub_title: "Điều kiện đất đai",
        sub_desc:
          "Mảnh đất số 1 có lớp đất phù sa màu mỡ, giàu dinh dưỡng, rất phù hợp để trồng các loại rau xanh và cây ăn quả như cà chua, xà lách, và dưa leo. Đất đã được cải tạo kỹ lưỡng, đảm bảo độ tơi xốp và khả năng thoát nước tốt, giúp cây trồng phát triển nhanh chóng và khỏe mạnh.",
      },
      {
        sub_title: "Các dịch vụ hỗ trợ",
        sub_desc:
          "Khi thuê mảnh đất số 1 đồng thời sử dụng dịch vụ chăm sóc của AgriFarm, bạn sẽ được hưởng lợi từ các dịch vụ hỗ trợ chuyên nghiệp của AgriFarm, bao gồm tư vấn kỹ thuật trồng trọt, cung cấp phân bón hữu cơ và hỗ trợ kiểm soát sâu bệnh từ đội ngũ chuyên gia nông nghiệp của chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn để đảm bảo mùa vụ đạt năng suất cao nhất.",
      },
    ],
  },
  images: [
    "https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg",
    "https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg",
    "https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg",
  ],
};

export default function LandDetailScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <Appbar.Header style={{ backgroundColor: "#7fb640" }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content color="#fff" title={`${data.nameLand}`} />
      </Appbar.Header>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Image Slider */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageSlider}
        >
          {data.images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => openModal(image)}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Land Details */}
        <View style={styles.section}>
          <Text style={styles.titleName}>{data.nameLand}</Text>
          <Text style={styles.text}>{`${data.position} -  ${data.area}`}</Text>
          <Text
            style={[
              styles.textStatus,
              data.status === "Đã thuê" ? styles.textStatusSold : null,
            ]}
          >
            {data.status}
          </Text>
        </View>

        {/* Descriptions */}
        <View style={styles.section}>
          <Text style={styles.title}>{data.description.title}</Text>
          <Text style={styles.text}>{data.description.desc}</Text>
          {data.description.sub.map((item, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>{item.sub_title}</Text>
              <Text style={styles.text}>{item.sub_desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Footer with Buttons */}
      <View style={styles.footer}>
        <Button
          icon="file-document-outline"
          mode="contained"
          style={[
            styles.button,
            {
              backgroundColor: "#7fb640",
            },
          ]}
          onPress={() => navigation.navigate("LandLeaseScreen")}
        >
          Thuê đất
        </Button>
        <Button
          mode="outlined"
          style={[
            styles.button,
            {
              borderColor: "#7fb640",
            },
          ]}
          textColor="#7fb640"
          onPress={() => console.log("Pressed")}
        >
          Gợi ý dịch vụ
        </Button>
      </View>

      {/* Modal for Image Focus */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
    padding: 10,
    marginBottom: 70, // Space for the fixed footer
  },
  imageSlider: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 10,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  textStatus: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7fb640",
    marginBottom: 5,
  },
  textStatusSold: {
    color: "red",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 8,
  },
});
