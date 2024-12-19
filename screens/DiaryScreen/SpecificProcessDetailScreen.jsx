import { useLayoutEffect, useState } from "react";
import ImageView from "react-native-image-viewing";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { formatDate, isFutureDate, isTodayInRange } from "../../utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../redux/selectors";
import RenderHTML from "react-native-render-html";

const actionDetail = {
  title: "Chuẩn bị nhà màng",
  description:
    "Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ/cm².Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ/cm².Thiết lập nhà màng với chiều cao đến máng nước 4 m, vách lưới chắn côn trùng 64 lỗ",
  startDate: "22/02/2022",
  endDate: "23/02/2022",
};

const SpecificProcessDetailScreen = ({ route, navigation }) => {
  const [visibleImageVIew, setVisibleImageVIew] = useState(false);
  const { processDetail } = route.params;
  const userInfo = useSelector(getUserSelector);
  console.log("userInfo", JSON.stringify(userInfo));
  console.log("processDetail", JSON.stringify(processDetail));
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={[{ padding: 10 }, userInfo?.role != 3 && { display: "none" }]}
          onPress={() => {
            if (isTodayInRange(processDetail?.dayFrom, processDetail?.dayTo)) {
              if (
                processDetail?.isLogged == false &&
                processDetail.canWriteDiary == true
              ) {
                navigation.navigate("WriteDiaryScreen", {
                  diary: processDetail,
                });
              } else {
                if (processDetail?.isLogged == false) {
                  Toast.show({
                    type: "error",
                    text1: "Hãy bắt đầu task để ghi nhật ký!",
                  });
                }
              }
            }
          }}
        >
          <MaterialCommunityIcons
            name="pencil-plus"
            size={24}
            color={
              isTodayInRange(processDetail?.dayFrom, processDetail?.dayTo) &&
              processDetail?.isLogged == false
                ? "#fff"
                : "#707070"
            }
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{processDetail.actionTitle}</Text>

          <RenderHTML
            baseStyle={styles.description}
            contentWidth={width}
            source={{ html: processDetail.actionDescription }}
          />

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
