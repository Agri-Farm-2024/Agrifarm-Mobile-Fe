import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { FAB, TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProcess } from "../../redux/slices/processSlice";
import { useEffect } from "react";
import { useState } from "react";
import { getSpecificProcessSelector } from "../../redux/selectors";
import { capitalizeFirstLetter, formatDate } from "../../utils";
import { useIsFocused } from "@react-navigation/core";

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

const SpecificProcessListScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const specificProcessSelector = useSelector(getSpecificProcessSelector);

  useEffect(() => {
    try {
      if (isFocused == true) {
        const formData = {
          page_index: 1,
          page_size: PAGE_SIZE,
        };
        dispatch(getSpecificProcess(formData)).then((response) =>
          console.log("response: " + JSON.stringify(response))
        );
      }
    } catch (error) {
      console.log("Error getting specific process", error);
    }
  }, [isFocused]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      !isLoading
    ) {
      //don't load more if the page number is equal to the total page
      if (
        specificProcessSelector?.pagination?.total_page &&
        pageNumber == specificProcessSelector?.pagination?.total_page
      ) {
        return;
      }
      loadMorePosts();
    }
  };

  const loadMorePosts = () => {
    try {
      setIsLoading(true);
      setPageNumber((prevState) => prevState + 1);
      console.log("Load more process...");
      const formData = {
        page_index: pageNumber + 1,
        page_size: PAGE_SIZE,
      };
      dispatch(getSpecificProcess(formData)).then((response) => {
        console.log("load more process", JSON.stringify(response));
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log("Error load more specific process", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {(!specificProcessSelector?.process_technical_specific ||
            specificProcessSelector?.process_technical_specific.length ==
              0) && (
            <Text
              style={{
                color: "#707070",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Không có quy trình cụ thể
            </Text>
          )}
          {specificProcessSelector?.process_technical_specific &&
            specificProcessSelector?.process_technical_specific?.map(
              (diary, index) => (
                <TouchableRipple
                  key={index}
                  rippleColor="rgba(127, 182, 64, 0.2)"
                  onPress={() => {
                    if (diary.status == "pending") {
                      navigation.navigate("UpdateSpecificProcessScreen", {
                        specificProcess: diary,
                      });
                    }
                  }}
                  style={styles.diaryContainer}
                >
                  <>
                    <View style={styles.contentWrapper}>
                      <Text style={styles.title}>{`${
                        capitalizeFirstLetter(
                          diary?.process_technical_standard?.plant_season?.plant
                            ?.name
                        ) || ""
                      } ${formatDate(diary?.time_start, 2)} - ${formatDate(
                        diary?.time_end,
                        2
                      )}`}</Text>
                      <Text style={styles.plantType}>
                        Hiển thị: {diary.is_public ? "Công khai" : "Riêng tư"}
                      </Text>
                      <Text style={styles.plantType}>
                        {capitalizeFirstLetter(
                          diary?.service_specific?.booking_land?.land?.name
                        )}
                      </Text>
                      <Text
                        style={[
                          styles.status,
                          diary.status == "pending" && { color: "#FFA756" },
                          diary.status == "active" &&
                            diary.service_specific.status == "expired" && {
                              color: "#74483F",
                            },
                          diary.status == "active" &&
                            diary.service_specific.status == "pending_sign" && {
                              color: "#00bcd4",
                            },
                        ]}
                      >
                        {diary.status == "pending" && "Chờ duyệt"}
                        {diary.status == "active" &&
                          diary.service_specific.status == "used" &&
                          "Đang sử dụng"}
                        {diary.status == "active" &&
                          diary.service_specific.status == "expired" &&
                          "Đã hoàn thành"}
                        {diary.status == "active" &&
                          diary.service_specific.status == "pending_sign" &&
                          "Đợi ký"}
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

export default SpecificProcessListScreen;
