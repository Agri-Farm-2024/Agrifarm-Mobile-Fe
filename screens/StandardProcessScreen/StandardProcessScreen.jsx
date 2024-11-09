import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { FAB, TouchableRipple } from "react-native-paper";

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

const StandardProcessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {diaryList.map((diary, index) => (
            <TouchableRipple
              key={index}
              rippleColor="rgba(127, 182, 64, 0.2)"
              onPress={() =>
                // navigation.navigate("DiaryActionScreen", {
                //   diaryTitle: diary.title,
                // })
                console.log("Press")
              }
              style={styles.diaryContainer}
            >
              <>
                <View style={styles.contentWrapper}>
                  <Text style={styles.title}>{diary.title}</Text>
                  <Text style={styles.plantType}>{diary.plantType}</Text>
                  <Text
                    style={[
                      styles.status,
                      diary.status == "ongoing" && { color: "#FFA756" },
                      diary.status == "cancel" && { color: "#D91515" },
                    ]}
                  >
                    {diary.status == "ongoing" && "Đang thực hiện"}
                    {diary.status == "cancel" && "Đã huỷ"}
                    {diary.status == "done" && "Đã hoàn thành"}
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