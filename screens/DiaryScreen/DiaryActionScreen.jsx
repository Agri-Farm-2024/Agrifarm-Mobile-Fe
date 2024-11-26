import { SafeAreaView, Text, View } from "react-native";
import DiaryActionTabs from "./DiaryActionTab";
import { useEffect, useState } from "react";
import DiaryHistory from "./DiaryHistory";
import DiarySpecificProcess from "./DiarySpecificProcess";
import { formatDate } from "../../utils";
import DiaryView from "./DiaryView";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProcessDetail } from "../../redux/slices/processSlice";
import {
  getSpecificProcessDetailSelector,
  processLoadingSelector,
} from "../../redux/selectors";
import { useIsFocused } from "@react-navigation/native";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

const DiaryAction = ({ route, navigation }) => {
  const { diary } = route.params;
  const processSpecificDetail = useSelector(getSpecificProcessDetailSelector);
  const loading = useSelector(processLoadingSelector);
  console.log("processSpecificDetail", JSON.stringify(processSpecificDetail));
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("process");

  useEffect(() => {
    if (isFocused) {
      try {
        if (diary?.process_technical_specific_id) {
          dispatch(
            getSpecificProcessDetail(diary?.process_technical_specific_id)
          );
        }
      } catch (error) {
        console.log("Error fetch specific process ", error);
      }
    }
  }, [isFocused]);

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
      {loading && !processSpecificDetail && <ActivityIndicatorComponent />}
      {!loading && !processSpecificDetail && (
        <Text
          style={{
            fontSize: 16,
            color: "#707070",
            fontWeight: "bold",
            width: "100%",
            textAlign: "center",
          }}
        >
          Không tìm thấy nhật ký
        </Text>
      )}
      {processSpecificDetail && (
        <>
          <DiaryActionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "process" && (
            <DiarySpecificProcess diary={processSpecificDetail} />
          )}
          {activeTab === "diary" && <DiaryView diary={processSpecificDetail} />}
        </>
      )}
    </SafeAreaView>
  );
};

export default DiaryAction;
