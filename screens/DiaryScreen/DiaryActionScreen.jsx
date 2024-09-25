import { SafeAreaView, Text, View } from "react-native";
import DiaryActionTabs from "./DiaryActionTab";
import { useEffect, useState } from "react";
import DiaryHistory from "./DiaryHistory";
import DiarySpecificProcess from "./DiarySpecificProcess";

const DiaryAction = ({ route, navigation }) => {
  const { diaryTitle } = route.params;

  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    if (diaryTitle) {
      navigation.setOptions({
        headerTitle: diaryTitle || "Ghi nhật ký",
      });
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <DiaryActionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "history" && <DiaryHistory />}
        {activeTab === "process" && <DiarySpecificProcess />}
      </>
    </SafeAreaView>
  );
};

export default DiaryAction;
