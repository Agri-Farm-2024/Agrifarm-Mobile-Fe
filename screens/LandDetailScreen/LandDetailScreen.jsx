import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Appbar, Button, FAB, Icon, IconButton } from "react-native-paper";
import {
  capitalizeFirstLetter,
  convertImageURL,
  formatNumber,
} from "../../utils";
import { MaterialIcons } from "@expo/vector-icons";
import RenderHTML from "react-native-render-html";
import { useDispatch, useSelector } from "react-redux";
import { getPlantListByLandType } from "../../redux/slices/plantSlice";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

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

export default function LandDetailScreen({ navigation, route }) {
  const { land } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const plants = useSelector((state) => state?.plantSlice?.plantList?.plants);
  const loading = useSelector((state) => state?.plantSlice?.loading);

  console.log(`Plants ${JSON.stringify(plants)}`);

  const { width } = useWindowDimensions();

  const openModal = (image) => {
    setSelectedImage(convertImageURL(image?.string_url));
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  useEffect(() => {
    console.log("featch plants");
    dispatch(
      getPlantListByLandType({
        land_type_id: "a0b1d402-1c74-4401-a1be-393c58915119",
        page_siz: 100,
        page_index: 1,
      })
    );
  }, [land]);

  if (loading) return <ActivityIndicatorComponent />;

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <Appbar.Header style={{ backgroundColor: "#7fb640" }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          color="#fff"
          title={`${capitalizeFirstLetter(land.name)}`}
        />
      </Appbar.Header>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Image Slider */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageSlider}
        >
          {land.url
            .filter((item) => item.type === "image")
            .map((item, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(item)}>
                <Image
                  source={{ uri: convertImageURL(item.string_url) }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>

        {/* Land Details */}
        <View style={styles.section}>
          <Text style={styles.titleName}>
            {capitalizeFirstLetter(land.name)}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons name="landscape" size={15} color="#555" />
            <Text style={styles.text}>
              Diện tích: {`${formatNumber(land.acreage_land)} m2`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons name="attach-money" size={15} color="#555" />
            <Text style={styles.text}>
              Tiền thuê:{" "}
              {`${formatNumber(land.price_booking_per_month)} / tháng`}
            </Text>
          </View>

          <Text
            style={[
              styles.textStatus,
              land.status === "booked" ? styles.textStatusSold : null,
            ]}
          >
            {land.status === "booked" ? "Đã thuê" : "Chưa thuê"}
          </Text>
        </View>
        <Text style={styles.titleName}>Loại cây phù hợp</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10 }}
        >
          {plants?.map((plant, index) => (
            <View
              key={index}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 30,
                borderColor: "#7FB640",
                borderWidth: 1,
                marginRight: 10,
              }}
            >
              <Text>{capitalizeFirstLetter(plant?.name)}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Descriptions */}
        <View style={styles.section}>
          <Text style={styles.title}>{land.title}</Text>
          <RenderHTML
            contentWidth={width}
            source={{ html: land.description }}
          />
        </View>
      </ScrollView>

      {/* Fixed Footer with Buttons */}
      <View style={styles.footer}>
        <Button
          disabled={land.status === "booked"}
          icon="file-document-outline"
          mode="contained"
          style={[
            styles.button,
            {
              backgroundColor: "#7fb640",
            },
          ]}
          onPress={() => navigation.navigate("LandLeaseScreen", { land })}
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
    width: 400,
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
    marginLeft: 5,
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
