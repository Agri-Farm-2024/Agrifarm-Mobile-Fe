import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TaskList from "./TaskList";

const MyTaskScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Chưa bắt đầu");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topTabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab("Chưa bắt đầu")}>
          <Text
            style={[
              styles.tabLabel,
              selectedTab == "Chưa bắt đầu" && styles.activeTab,
            ]}
          >
            Chưa bắt đầu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Đang làm")}>
          <Text
            style={[
              styles.tabLabel,
              selectedTab == "Đang làm" && styles.activeTab,
            ]}
          >
            Đang làm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Đã xong")}>
          <Text
            style={[
              styles.tabLabel,
              selectedTab == "Đã xong" && styles.activeTab,
            ]}
          >
            Đã xong
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.taskContent}>
        <TaskList taskType={selectedTab} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  tabLabel: {
    fontSize: 16,
    color: "#707070",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: -2,
  },
  activeTab: {
    color: "#7FB640",
    borderBottomColor: "#7FB640",
    borderBottomWidth: 3,
  },
  taskContent: {
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
});

export default MyTaskScreen;
