import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { FAB, TouchableRipple } from "react-native-paper";

const requestList = [
  {
    type: "land lease",
    title: "Yêu cầu thuê đất",
    desc: "Yêu cầu thuê mảnh đất có ID MD001",
    status: "processing",
  },
  {
    type: "services",
    title: "Yêu cầu gói dịch vụ",
    desc: "Yêu cầu sử dụng gói dịch vụ VietGap",
    status: "accept",
  },
  {
    type: "purchasing",
    title: "Yêu cầu thu mua",
    desc: "Yêu cầu thu mua cho dịch vụ DV001",
    status: "accept",
  },
  {
    type: "purchasing",
    title: "Yêu cầu thu mua",
    desc: "Yêu cầu thu mua cho dịch vụ DV001",
    status: "reject",
  },
];

const RequestListScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {requestList.map((request, index) => (
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
                      request.status == "processing" && { color: "#FFA756" },
                      request.status == "cancel" && { color: "#D91515" },
                      request.status == "reject" && { color: "red" },
                    ]}
                  >
                    {request.status == "processing" && "Đang xử lí"}
                    {request.status == "accept" && "Đã hoàn thành"}
                    {request.status == "reject" && "Đã từ chối"}
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

export default RequestListScreen;
