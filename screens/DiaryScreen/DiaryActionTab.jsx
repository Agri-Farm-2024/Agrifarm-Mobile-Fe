import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";

const diaryTabs = [
  {
    key: "history",
    label: "Lịch sử canh tác",
  },
  {
    key: "process",
    label: "Quy trình",
  },
];

const DiaryActionTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabView}>
      <FlatList
        data={diaryTabs}
        horizontal
        contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 50,
          gap: 50,
          width: "100%",
        }}
        style={{ paddingHorizontal: 5, flex: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.textWrapper,
              activeTab == item.key && styles.activeTextWrapper,
            ]}
            onPress={() => {
              setActiveTab(item.key);
            }}
          >
            <Text
              style={[
                styles.boldText,
                activeTab == item.key && styles.activeText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flexDirection: "row",

    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#C4C4C4",
    borderBottomColor: "#C4C4C4",
  },
  textWrapper: {
    padding: 10,
    marginHorizontal: 5,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#707070",
  },
  activeText: {
    color: "#7FB640",
  },
  activeTextWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: "#7FB640",
  },
});

export default DiaryActionTabs;
