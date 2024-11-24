import { SafeAreaView, Text, View } from "react-native";
import DiaryActionTabs from "./DiaryActionTab";
import { useEffect, useState } from "react";
import DiaryHistory from "./DiaryHistory";
import DiarySpecificProcess from "./DiarySpecificProcess";
import { formatDate } from "../../utils";
import DiaryView from "./DiaryView";

const DiaryAction = ({ route, navigation }) => {
  const { diary } = route.params;

  const [activeTab, setActiveTab] = useState("process");

  useEffect(() => {
    if (diary) {
      const diaryTitle = `${
        diary?.process_technical_standard?.plant_season?.plant?.name || ""
      } ${formatDate(
        diary?.process_technical_specific_stage[0].time_start,
        2
      )} - ${formatDate(
        diary?.process_technical_specific_stage[
          diary?.process_technical_specific_stage?.length - 1
        ].time_end,
        2
      )}`;
      navigation.setOptions({
        headerTitle: diaryTitle || "Ghi nhật ký",
      });
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <DiaryActionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "process" && <DiarySpecificProcess diary={diary} />}
        {activeTab === "diary" && <DiaryView diary={diary} />}
      </>
    </SafeAreaView>
  );
};

export default DiaryAction;
