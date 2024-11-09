import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getListOfBookingLand } from "../../../redux/slices/requestSlice";
import { useEffect, useState } from "react";
import ActivityIndicatorComponent from "../../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

export const ItemsRequestLandLease = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.requestSlice);

  const [requests, setRequests] = useState([
    {
      type: "land lease",
      title: "Yêu cầu thuê đất",
      desc: "Yêu cầu thuê mảnh đất có ID MD001",
      status: "processing",
    },
  ]);

  useEffect(() => {
    fetchRequestsLandLease();
  }, []);

  const fetchRequestsLandLease = async () => {
    console.log("fetchRequestsLandLease");
    dispatch(
      getListOfBookingLand({
        page_size: 100,
        page_index: 1,
      })
    ).then((res) => {
      if (res.payload.statusCode === 200) {
        console.log("res: " + JSON.stringify(res.payload.metadata.bookings));
        setRequests(res.payload.metadata.bookings);
      }
    });
  };

  if (loading) return <ActivityIndicatorComponent />;

  return (
    <View>
      {requests &&
        requests.map((request, index) => (
          <TouchableRipple
            key={index}
            rippleColor="rgba(127, 182, 64, 0.2)"
            onPress={() => {
              navigation.navigate("RequestContractDetailScreen", {
                requestID: request.booking_id,
              });
            }}
            style={styles.diaryContainer}
          >
            <>
              <View style={styles.contentWrapper}>
                <Text style={styles.title}>Yêu cầu thuê đất</Text>
                <Text style={styles.plantType}>{request?.land?.name}</Text>
                <Text
                  style={[
                    styles.status,
                    request.status === "completed" && { color: "#28a745" },
                    request.status === "pending_payment" && {
                      color: "#ff007f",
                    },
                    request.status === "pending_sign" && { color: "#00bcd4" },
                    request.status === "rejected" && { color: "#dc3545" },
                    request.status === "pending" && { color: "#007bff" },
                    request.status === "pending_contract" && {
                      color: "#fd7e14",
                    },
                    request.status === "canceled" && { color: "#6c757d" },
                    request.status === "expired" && { color: "#868e96" },
                  ]}
                >
                  {request.status === "completed" && "Đang hiệu lực"}
                  {request.status === "pending" && "Đang xử lý"}
                  {request.status === "pending_contract" && "Chờ phê duyệt"}
                  {request.status === "pending_payment" && "Chờ thanh toán"}
                  {request.status === "pending_sign" && "Chờ ký"}
                  {request.status === "canceled" && "Hủy"}
                  {request.status === "expired" && "Hết hạn"}
                  {request.status === "rejected" && "Đã từ chối"}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
    gap: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f1f1f1",
  },
  filterButton: {
    padding: 10,
  },
  filterText: {
    fontSize: 16,
    color: "gray",
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: "#7FB640",
  },
  activeFilterText: {
    color: "#7FB640",
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
    marginBottom: 20,
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
    fontWeight: "bold",
  },
});
