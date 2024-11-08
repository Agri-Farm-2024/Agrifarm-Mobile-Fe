import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

const fetchRequestsByType = async (type) => {
  // Replace this with actual API calls, e.g., `fetch("https://api.example.com/requests?type=" + type)`
  switch (type) {
    case "land lease":
      return [
        {
          type: "land lease",
          title: "Yêu cầu thuê đất",
          desc: "Yêu cầu thuê mảnh đất có ID MD001",
          status: "processing",
        },
      ];
    case "services":
      return [
        {
          type: "services",
          title: "Yêu cầu gói dịch vụ",
          desc: "Yêu cầu sử dụng gói dịch vụ VietGap",
          status: "accept",
        },
      ];
    case "purchasing":
      return [
        {
          type: "purchasing",
          title: "Yêu cầu thu mua",
          desc: "Yêu cầu thu mua cho dịch vụ DV001",
          status: "reject",
        },
      ];
    default:
      return [];
  }
};

const RequestListScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("land lease");
  const [requests, setRequests] = useState([
    {
      type: "land lease",
      title: "Yêu cầu thuê đất",
      desc: "Yêu cầu thuê mảnh đất có ID MD001",
      status: "processing",
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFilter === "land lease") {
      fetchRequestsLandLease();
    }
    if (selectedFilter === "services") {
      fetchRequestsServices();
    }
    if (selectedFilter === "purchasing") {
      fetchRequestsPurchase();
    }
  }, [selectedFilter]);

  const fetchRequestsLandLease = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("fetchRequestsLandLease");
  };

  const fetchRequestsServices = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("fetchRequestsServices");
  };

  const fetchRequestsPurchase = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("fetchRequestsPurchase");
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setSelectedFilter("land lease")}
          style={[
            styles.filterButton,
            selectedFilter === "land lease" && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "land lease" && styles.activeFilterText,
            ]}
          >
            Thuê đất
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFilter("services")}
          style={[
            styles.filterButton,
            selectedFilter === "services" && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "services" && styles.activeFilterText,
            ]}
          >
            Dịch vụ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFilter("purchasing")}
          style={[
            styles.filterButton,
            selectedFilter === "purchasing" && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "purchasing" && styles.activeFilterText,
            ]}
          >
            Thu mua
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {loading ? (
          <ActivityIndicatorComponent />
        ) : (
          <View>
            {requests.map((request, index) => (
              <TouchableRipple
                key={index}
                rippleColor="rgba(127, 182, 64, 0.2)"
                onPress={() => {
                  if (request.type === "land lease") {
                    navigation.navigate("RequestContractDetailScreen");
                  } else if (request.type === "services") {
                    navigation.navigate("RequestServicesDetailScreen");
                  } else {
                    navigation.navigate("RequestPurchaseScreen");
                  }
                }}
                style={styles.diaryContainer}
              >
                <>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.title}>{request.title}</Text>
                    <Text style={styles.plantType}>{request.desc}</Text>
                    <Text
                      style={[
                        styles.status,
                        request.status === "processing" && { color: "#FFA756" },
                        request.status === "reject" && { color: "red" },
                      ]}
                    >
                      {request.status === "processing" && "Đang xử lí"}
                      {request.status === "accept" && "Đã hoàn thành"}
                      {request.status === "reject" && "Đã từ chối"}
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
        )}
      </View>
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

export default RequestListScreen;
