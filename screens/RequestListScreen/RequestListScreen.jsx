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
import { useDispatch, useSelector } from "react-redux";
import { getListOfBookingLand } from "../../redux/slices/requestSlice";
import {
  ItemRequestLandLease,
  ItemsRequestLandLease,
} from "./ItemRequest/ItemRequestLandLease";
import ItemsRequestServices from "./ItemRequest/ItemsRequestServices";
import ItemsRequetsPurchase from "./ItemRequest/ItemsRequetsPurchase";

const RequestListScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("land lease");

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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          {selectedFilter === "land lease" ? (
            <ItemsRequestLandLease />
          ) : selectedFilter === "services" ? (
            <ItemsRequestServices />
          ) : (
            <ItemsRequetsPurchase />
          )}
        </ScrollView>
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

export default RequestListScreen;
