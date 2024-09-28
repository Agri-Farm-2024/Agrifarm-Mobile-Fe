// DiarySpecificProcess.js
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DiaryProgress from "../../components/DiaryProgress";
import { Button } from "react-native-paper";
import PurchaseRequestModal from "./PurchaseRequestModal/PurchaseRequestModal"; // Import the modal

const process = {
  authorProcess: "Nguyen Van A",
  plantType: "Dưa lưới Taki",
  processContent: [
    {
      stageTitle: "Giai đoạn 1: Chuẩn bị trồng",
      dayFrom: "24/03/2024",
      dayTo: "27/03/2024",
      actionTitle: "Chuẩn bị giá thể",
      actionDescription:
        "Bắt đầu xử lý mụn xơ dừa bằng cách ngâm và xả để loại bỏ tannin",
      imageReport: [
        "https://tiimg.tistatic.com/fp/1/007/500/soil-food-agriculture-vermicompost-1-kg-pack-used-in-all-types-of-crops-733.jpg",
        "https://lzd-img-global.slatic.net/g/p/0e5b66a7e2a76f41f3ee8afc149f42bf.jpg_720x720q80.jpg",
      ],
      isDone: true,
    },
    {
      stageTitle: "Giai đoạn 1: Chuẩn bị trồng",
      dayFrom: "28/03/2024",
      dayTo: "28/03/2024",
      actionTitle: "Gieo hạt",
      actionDescription:
        "Chuẩn bị bầu đất hoặc luống gieo hạt.\nGieo hạt cách nhau khoảng 5 cm trên bề mặt đất hoặc trong bầu đất, với độ sâu 1-2 cm.\nChe phủ một lớp mỏng đất hoặc rơm rạ để giữ ẩm cho hạt.",
      imageReport: [
        "https://greeneagle.com.my/wp-content/uploads/2019/09/seeds-2.jpg",
        "https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg",
        "https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg",
      ],
      isDone: true,
    },
    {
      stageTitle: "Giai đoạn 1: Chuẩn bị trồng",
      dayFrom: "29/03/2024",
      dayTo: "01/04/2024",
      actionTitle: "Tưới Nước và Chăm Sóc Gieo Hạt",
      actionDescription:
        "Tưới nước nhẹ nhàng hàng ngày để giữ ẩm cho đất.\nĐảm bảo điều kiện nhiệt độ từ 18-22°C cho hạt nảy mầm.\nKiểm tra tỷ lệ nảy mầm và xử lý cây con không đều hoặc chết.",
      imageReport: [
        "https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg",
        "https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg",
      ],
      isDone: true,
    },
    {
      stageTitle: "Giai Đoạn 2: Chăm Sóc Cây Con",
      dayFrom: "02/04/2024",
      dayTo: "04/04/2024",
      actionTitle: "Tiếp tục chăm sóc cây con",
      actionDescription:
        "Tiếp tục tưới nước đều đặn, giữ ẩm cho đất.\nLoại bỏ cỏ dại xung quanh cây con để giảm cạnh tranh dinh dưỡng",
      imageReport: [""],
      isDone: false,
    },
    {
      stageTitle: "Giai Đoạn 2: Chăm Sóc Cây Con",
      dayFrom: "05/04/2024",
      dayTo: "08/04/2024",
      actionTitle: "Làm sạch cây con",
      actionDescription:
        "Thực hiện làm sạch cây con, loại bỏ cây yếu hoặc bị bệnh.\nBón thúc lần đầu bằng phân hữu cơ hoặc phân vi sinh (10-15 kg/ha) để kích thích sự phát triển.",
      imageReport: [""],
      isDone: false,
    },
  ],
};

const DiarySpecificProcess = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.diaryInfoContainer}>
        <Text style={styles.diaryInfo}>Giống cây: {process.plantType}</Text>
        <Text style={styles.diaryInfo}>
          Người tạo quy trình: {process.authorProcess}
        </Text>
        <Button
          mode="contained"
          style={{
            width: 200,
            marginTop: 10,
            backgroundColor: "#7fb640",
            borderRadius: 5,
          }}
          onPress={handleOpenModal}
        >
          Yêu cầu thu mua
        </Button>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.progressContainer}
      >
        <DiaryProgress diaryProgress={process.processContent} />
      </ScrollView>

      {/* Use the PurchaseRequestModal */}
      <PurchaseRequestModal visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  diaryInfoContainer: {
    padding: 20,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    gap: 5,
    marginBottom: 20,
  },
  diaryInfo: {
    fontSize: 14,
  },
  progressContainer: {
    paddingHorizontal: 10,
  },
});

export default DiarySpecificProcess;
