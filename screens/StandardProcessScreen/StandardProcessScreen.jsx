import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { FAB, TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getStandardProcessSelector,
  processLoadingSelector,
} from "../../redux/selectors";
import { useEffect } from "react";
import { useState } from "react";
import { getStandardProcess } from "../../redux/slices/processSlice";
import { useIsFocused } from "@react-navigation/native";
import { capitalizeFirstLetter } from "../../utils";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

const diaryList = [
  {
    title: "Quy trình trồng dưa lưới 28/4 - 28/6",
    plantType: "Dưa lưới",
    status: "ongoing",
  },
  {
    title: "Quy trình trồng dưa leo 28/1 - 28/3",
    plantType: "Dưa leo",
    status: "done",
  },
  {
    title: "Quy trình trồng dưa hấu 28/09 - 28/11",
    plantType: "Dưa hấu",
    status: "done",
  },
  {
    title: "Quy trình trồng khoai mì 28/01 - 28/06",
    plantType: "Khoai mì",
    status: "done",
  },
];

const PAGE_SIZE = 30;

const StandardProcessScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const isFocused = useIsFocused();
  const standardProcessList = useSelector(getStandardProcessSelector);
  const loading = useSelector(processLoadingSelector);

  // console.log("Standard Process", JSON.stringify(standardProcessList));

  const fetchStandardprocess = () => {
    try {
      const params = {
        page_size: PAGE_SIZE,
        page_index: currentPage,
      };
      dispatch(getStandardProcess(params));
    } catch (error) {
      console.log("Error fetch standard process list", JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchStandardprocess();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {loading && <ActivityIndicatorComponent />}
          {!loading &&
            standardProcessList &&
            standardProcessList?.process_technical_standard &&
            standardProcessList?.process_technical_standard.map(
              (diary, index) => (
                <TouchableRipple
                  key={index}
                  rippleColor="rgba(127, 182, 64, 0.2)"
                  onPress={
                    () => {
                      if (diary.status === "rejected") {
                        if (diary?.can_edit == true) {
                          navigation.navigate("UpdateStandardProcessScreen", {
                            standardProcess: diary,
                          });
                        } else {
                          Toast.show({
                            type: "error",
                            text1: "Hãy bắt đầu nhiệm vụ!",
                          });
                        }
                      } else {
                        navigation.navigate("StandardProcessDetail", {
                          standardProcess: diary,
                        });
                      }
                    }
                    // console.log("Press")
                  }
                  style={styles.diaryContainer}
                >
                  <>
                    <View style={styles.contentWrapper}>
                      <Text style={styles.title}>
                        {capitalizeFirstLetter(diary?.name)}
                      </Text>
                      <Text style={styles.plantType}>
                        {capitalizeFirstLetter(
                          diary?.plant_season?.plant?.name
                        )}{" "}
                        -{" "}
                        {diary?.plant_season?.type == "in_season"
                          ? "Mùa thuận"
                          : "Mùa nghịch"}
                      </Text>
                      <Text
                        style={[
                          styles.status,
                          diary.status == "pending" && { color: "#FFA756" },
                          diary.status == "rejected" && { color: "#D91515" },
                          diary.status == "in_active" && { color: "#6c757d" },
                        ]}
                      >
                        {diary.status == "pending" && "Đợi duyệt"}
                        {diary.status == "rejected" && "Không đạt yêu cầu"}
                        {diary.status == "in_active " && "Ngừng sử dụng"}
                        {diary.status == "accepted" && "Đang sử dụng"}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={24}
                      color="#707070"
                    />
                  </>
                </TouchableRipple>
              )
            )}
        </View>
      </ScrollView>
      <FAB
        color="#fff"
        icon="plus"
        style={styles.fab}
        onPress={() => {
          navigation.navigate("CreateStandardProcessScreen");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
    gap: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#7FB640",
    borderRadius: 50,
  },
  diaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#f5f5f5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  contentWrapper: {
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  plantType: {
    fontSize: 12,
    color: "#707070",
  },
  status: {
    fontSize: 14,
    color: "#7FB640",
  },
});

export default StandardProcessScreen;
