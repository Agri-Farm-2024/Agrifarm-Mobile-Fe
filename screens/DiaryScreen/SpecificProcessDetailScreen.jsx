import { useState } from "react";
import ImageView from "react-native-image-viewing";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatDate } from "../../utils";

const actionDetail = {
  title: "Chuẩn bị nhà màng",
  description:
    "Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ/cm².Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ/cm².Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ",
  startDate: "22/02/2022",
  endDate: "23/02/2022",
};

const SpecificProcessDetailScreen = ({ route }) => {
  const [visibleImageVIew, setVisibleImageVIew] = useState(false);
  const { processDetail } = route.params;
  console.log("processDetail", JSON.stringify(processDetail));
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{processDetail.actionTitle}</Text>
          <Text style={styles.description}>
            {processDetail.actionDescription}
          </Text>

          <View style={styles.diaryInfo}>
            <Text style={styles.infoTitle}>Ngày bắt đầu</Text>
            <Text style={styles.infoContent}>
              {formatDate(processDetail.dayFrom, 0)}
            </Text>
          </View>
          <View style={styles.diaryInfo}>
            <Text style={styles.infoTitle}>Ngày kết thúc</Text>
            <Text style={styles.infoContent}>
              {formatDate(processDetail.dayTo, 0)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    borderBottomColor: "#707070",
    borderBottomWidth: 1,
  },
  description: {
    fontSize: 16,
    color: "#707070",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },
  diaryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#707070",
  },
  infoContent: {
    fontSize: 12,
    color: "#707070",
    fontWeight: "bold",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    borderBottomColor: "#707070",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  imageReportContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    alignItems: "center",
    marginTop: 20,
  },
  imageReportItem: {
    resizeMode: "cover",
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 7,
  },
});

export default SpecificProcessDetailScreen;
