import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import DiaryProgress from "../../components/DiaryProgress";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { useDispatch } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { publicDiary } from "../../redux/slices/processSlice";
import QRModal from "./QRModal";
import { capitalizeFirstLetter } from "../../utils";

const diaryContent = [
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
];

const DiaryView = ({ diary }) => {
  console.log("Diary View", JSON.stringify(diary));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handlePublicDiary = () => {
    console.log("public diary", diary?.process_technical_specific_id);
    try {
      if (diary?.process_technical_specific_id) {
        dispatch(publicDiary(diary?.process_technical_specific_id)).then(
          (response) => {
            console.log("public diary response", JSON.stringify(response));
            if (response.payload.statusCode == 200) {
              Toast.show({
                type: "success",
                text1: "Đã công khai nhật ký",
              });
              setIsModalOpen(false);
            } else {
              Toast.show({
                type: "error",
                text1: "Công khai nhật ký thất bại",
              });
            }
          }
        );
      } else {
        Toast.show({
          type: "error",
          text1: "Không tìm thấy nhật ký",
        });
      }
    } catch (error) {
      console.log("Error public diary: " + JSON.stringify(error));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.infoContainer}>
        <Text style={styles.diaryInfo}>
          <Text
            style={{
              color: "#707070",
              fontWeight: "bold",
            }}
          >
            Giống cây:
          </Text>{" "}
          {capitalizeFirstLetter(
            diary?.service_specific?.plant_season?.plant?.name
          )}
        </Text>
        <Text style={styles.diaryInfo}>
          <Text style={{ color: "#707070", fontWeight: "bold" }}>Mùa vụ:</Text>{" "}
          {diary?.service_specific?.plant_season?.type == "in_season"
            ? "Mùa thuận"
            : "Mùa nghịch"}
        </Text>
        <Text style={styles.diaryInfo}>
          <Text style={{ color: "#707070", fontWeight: "bold" }}>
            Phạm vi hiển thị:
          </Text>{" "}
          {diary.is_public ? "Công khai" : "Riêng tư"}
        </Text>
        {!diary.is_public && (
          <Button
            mode="contained"
            style={{
              width: 200,
              marginTop: 10,
              backgroundColor: "#7fb640",
              borderRadius: 5,
            }}
            onPress={() => {
              setIsModalOpen(true);
            }}
          >
            Công khai nhật ký
          </Button>
        )}
        {diary.is_public && (
          <Button
            mode="contained"
            style={{
              width: 200,
              marginTop: 10,
              backgroundColor: "#7fb640",
              borderRadius: 5,
            }}
            onPress={() => {
              setIsQRModalOpen(true);
            }}
          >
            Xem QR Code
          </Button>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.diaryProgress}
      >
        <DiaryProgress isDiary={true} diaryProgress={diary} />
      </ScrollView>
      <QRModal
        visible={isQRModalOpen}
        onDismiss={() => setIsQRModalOpen(false)}
        onCancel={() => setIsQRModalOpen(false)}
        diaryId={diary?.process_technical_specific_id}
      />
      <ConfirmationModal
        title="Xác nhận"
        content="Bạn muốn công khai nhật ký của mình cho mọi người thấy?"
        visible={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        onConfirm={() => handlePublicDiary()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 2,
    gap: 5,
  },
  diaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7FB640",
    marginBottom: 10,
  },
  diaryInfo: {
    fontSize: 14,
    color: "#707070",
  },
  diaryProgress: {
    height: "100%",
    padding: 10,
    minHeight: "max-content",
  },
});

export default DiaryView;
