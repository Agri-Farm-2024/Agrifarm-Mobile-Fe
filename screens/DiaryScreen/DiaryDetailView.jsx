import { useState } from "react";
import ImageView from "react-native-image-viewing";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const actionDetail = {
  title: "Chuẩn bị nhà màng",
  description:
    "Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ/cm².Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ/cm².Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ",
  startDate: "22/02/2022",
  endDate: "23/02/2022",
  diaryAuthor: "Nguyen Van A",
  diaryDate: "23/02/2022",
  imageReport: [
    "https://greeneagle.com.my/wp-content/uploads/2019/09/seeds-2.jpg",
    "https://enhome.vn/wp-content/uploads/2021/12/gieo-hat-2-768x477-1.jpg",
    "https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg",
  ],
};

const DiaryDetailView = () => {
  const [visibleImageVIew, setVisibleImageVIew] = useState(false);
  const [imageIndexSelected, setImageIndexSelected] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{actionDetail.title}</Text>
          <Text style={styles.description}>{actionDetail.description}</Text>

          <View style={styles.diaryInfo}>
            <Text style={styles.infoTitle}>Ngày bắt đầu</Text>
            <Text style={styles.infoContent}>{actionDetail.startDate}</Text>
          </View>
          <View style={styles.diaryInfo}>
            <Text style={styles.infoTitle}>Ngày kết thúc</Text>
            <Text style={styles.infoContent}>{actionDetail.endDate}</Text>
          </View>

          <Text style={styles.header}>Ghi nhật ký</Text>
          <View style={styles.diaryInfo}>
            <Text style={styles.infoTitle}>Người ghi</Text>
            <Text style={styles.infoContent}>{actionDetail.diaryAuthor}</Text>
          </View>
          <View style={styles.diaryInfo}>
            <Text style={styles.infoTitle}>Ngày ghi</Text>
            <Text style={styles.infoContent}>{actionDetail.diaryDate}</Text>
          </View>

          <Text style={styles.header}>Hình ảnh báo cáo</Text>
          <View style={styles.imageReportContainer}>
            {actionDetail.imageReport.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setImageIndexSelected(index);
                  setVisibleImageVIew(true);
                }}
              >
                <Image
                  key={`Img-${index}`}
                  style={styles.imageReportItem}
                  source={{ uri: image }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <ImageView
            images={actionDetail.imageReport.map((image) => ({ uri: image }))}
            imageIndex={imageIndexSelected}
            visible={visibleImageVIew}
            onRequestClose={() => setVisibleImageVIew(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    paddingVertical: 10,
    marginBottom: 20,
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

export default DiaryDetailView;
