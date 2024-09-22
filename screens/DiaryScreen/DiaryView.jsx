import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import DiaryProgress from "../../components/DiaryProgress";

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

const DiaryView = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.infoContainer}>
        <Text style={styles.diaryTitle}>
          Nhật ký trồng dưa lưới 28/4 - 28/6
        </Text>
        <Text style={styles.diaryInfo}>ID: 123895711</Text>
        <Text style={styles.diaryInfo}>Người trồng: Nguyen Van A</Text>
        <Text style={styles.diaryInfo}>Giống cây: Dưa lưới Taki</Text>
        <Text style={styles.diaryInfo}>
          Loại dịch vụ sử dụng: Canh Tác VietGAP + Vật Tư
        </Text>
        <Text style={styles.diaryInfo}>Ngày tạo: 28/08/2024</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.diaryProgress}
      >
        <DiaryProgress diaryProgress={diaryContent} />
      </ScrollView>
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
  },
  diaryProgress: {
    height: "100%",
    padding: 10,
    minHeight: "max-content",
  },
});

export default DiaryView;
