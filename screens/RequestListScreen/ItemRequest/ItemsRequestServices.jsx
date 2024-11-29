import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getListServiceSpecific } from "../../../redux/slices/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { getServiceSpecificSelector } from "../../../redux/selectors";
import { TouchableRipple } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const PAGE_SIZE = 30;
export default function ItemsRequestServices({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const serviceInUseSelector = useSelector(getServiceSpecificSelector);
  useEffect(() => {
    try {
      if (isFocused == true) {
        const formData = {
          page_index: 1,
          page_size: PAGE_SIZE,
        };
        dispatch(getListServiceSpecific(formData)).then((response) =>
          console.log("response: " + JSON.stringify(response))
        );
      }
    } catch (error) {
      console.log("Error getting service specific", error);
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
        serviceInUseSelector?.pagination?.total_page &&
        pageNumber == serviceInUseSelector?.pagination?.total_page
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
      dispatch(getListServiceSpecific(formData)).then((response) => {
        console.log("load more service", JSON.stringify(response));
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log("Error load more specific process", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll}>
        <View style={styles.container}>
          {serviceInUseSelector?.services &&
            serviceInUseSelector?.services?.map((service, index) => (
              <TouchableRipple
                key={index}
                rippleColor="rgba(127, 182, 64, 0.2)"
                onPress={() => {
                  console.log("Press");
                }}
                style={styles.diaryContainer}
              >
                <>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.title}>{`${
                      service?.service_package?.name || ""
                    }`}</Text>
                    <Text style={styles.plantType}>
                      {`${service?.plant_season?.plant?.name} tháng ${service?.plant_season?.month_start}`}
                    </Text>
                    <Text
                      style={[
                        styles.status,
                        service.status == "canceled" && {
                          color: "#74483F",
                        },
                        service.status === "pending_payment" && {
                          color: "#ff007f",
                        },
                        service.status === "pending_sign" && {
                          color: "#00bcd4",
                        },
                        service.status === "canceled" && { color: "#6c757d" },
                        service.status === "expired" && { color: "#868e96" },
                      ]}
                    >
                      {service.status == "used" && "Đang sử dụng"}
                      {service.status == "canceled" && "Đã huỷ"}
                      {service.status == "expired" && "Đã hoàn thành"}
                      {service.status == "pending_payment" && "Đợi thanh toán"}
                      {service.status == "pending_sign" && "Đợi ký"}
                    </Text>
                  </View>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={24}
                    color="#707070"
                  />
                </>
              </TouchableRipple>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingBottom: 80,
    gap: 20,
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
