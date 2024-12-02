import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import {
  convertImageURL,
  formatDate,
  isFutureDate,
  shortenText,
} from "../utils";
import { useEffect, useState } from "react";

const DiaryProgress = ({ diaryProgress, isDiary }) => {
  const navigation = useNavigation();
  const [diaryRender, setDiaryRender] = useState(null);
  useEffect(() => {
    console.log(
      "run useEffect",
      diaryProgress?.process_technical_specific_stage.length
    );
    try {
      console.log("diaryProgress", JSON.stringify(diaryProgress));
      if (
        diaryProgress &&
        diaryProgress?.process_technical_specific_stage &&
        diaryProgress?.process_technical_specific_stage.length > 0
      ) {
        if (isDiary) {
          //filter data to show diary
          const newArr = diaryProgress?.process_technical_specific_stage
            .map((stage) => {
              if (
                stage &&
                stage?.process_technical_specific_stage_content &&
                stage?.process_technical_specific_stage_content.length > 0
              ) {
                return stage?.process_technical_specific_stage_content.map(
                  (content) => {
                    if (content?.dinary_stage) {
                      return {
                        stageTitle: stage.stage_title,
                        dayFrom: content.time_start,
                        dayTo: content.time_end,
                        diaryDate: content?.dinary_stage?.created_at,
                        diaryNote: content?.dinary_stage?.content,
                        actionQuality: content?.dinary_stage?.quality_report,
                        actionTitle: content.title,
                        actionDescription: content.content,
                        isDone: true,
                        process_technical_specific_stage_content_id:
                          content.process_technical_specific_stage_content_id,
                        imageReport: content?.dinary_stage?.dinaries_link,
                      };
                    }
                  }
                );
              }
            })
            .flat()
            .filter((item) => item != null);
          console.log("new Diary", JSON.stringify(newArr));
          setDiaryRender([...newArr]);
        } else {
          //filter data to show specific process
          const newArr = diaryProgress?.process_technical_specific_stage
            .map((stage, stageIndex) => {
              console.log(
                "Content stage",
                JSON.stringify(stage),
                stage?.process_technical_specific_stage_content?.length
              );
              if (
                stage &&
                stage?.process_technical_specific_stage_content &&
                stage?.process_technical_specific_stage_content?.length > 0
              ) {
                return stage?.process_technical_specific_stage_content.map(
                  (content, contentIndex) => ({
                    stageTitle: stage.stage_title,
                    dayFrom: content.time_start,
                    dayTo: content.time_end,
                    actionTitle: content.title,
                    actionDescription: content.content,
                    isDone: isFutureDate(content?.time_start) ? false : true,
                    process_technical_specific_stage_content_id:
                      content.process_technical_specific_stage_content_id,
                  })
                );
              }
            })
            .flat()
            .filter((item) => item != null);
          console.log("new process", JSON.stringify(newArr));
          setDiaryRender([...newArr]);
        }
      }
    } catch (error) {
      console.log("Error render diary progress", JSON.stringify(error));
    }
  }, [diaryProgress]);

  return (
    <View style={{ flex: 1, paddingBottom: 30 }}>
      {!(diaryRender && diaryRender.length > 0) && (
        <Text
          style={{
            fontSize: 16,
            width: "100%",
            color: "#707070",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {isDiary ? "Chưa có nhật ký" : "Không tìm thấy quy trình"}
        </Text>
      )}
      {diaryRender && diaryRender.length > 0 && (
        <View style={[styles.progressItemContainer, styles.firstPoint]}>
          <View style={styles.diaryTime}></View>
          <View style={styles.progress}>
            <View style={[styles.progressPoint, styles.doneBackGrColor]}></View>
          </View>
          <View style={styles.diaryAction}></View>
        </View>
      )}
      {diaryRender &&
        Array.isArray(diaryRender) &&
        diaryRender.length > 0 &&
        diaryRender.map((progressItem, index) => (
          <View key={index} style={styles.progressItemContainer}>
            <View style={styles.diaryTime}>
              <Text style={styles.stage}>{progressItem.stageTitle}</Text>
              <Text style={styles.dayTime}>
                {formatDate(progressItem.dayFrom, 0)}
              </Text>
              {!(progressItem.dayFrom == progressItem.dayTo) && (
                <Text style={styles.dayTime}>
                  {formatDate(progressItem.dayTo, 0)}
                </Text>
              )}
            </View>
            <View style={styles.progress}>
              <View
                style={[
                  styles.progressbar,
                  progressItem.isDone && styles.doneBackGrColor,
                ]}
              ></View>
              <View
                style={[
                  styles.progressPoint,
                  progressItem.isDone && styles.doneBackGrColor,
                ]}
              ></View>
            </View>
            <View
              style={[
                styles.diaryAction,
                !progressItem.isDone && { opacity: 0.7 },
              ]}
            >
              <TouchableRipple
                style={[
                  styles.actionWrapper,
                  !progressItem.isDone && { opacity: 0.7 },
                ]}
                rippleColor="rgba(127, 182, 64, 0.2)"
                onPress={() => {
                  if (isDiary) {
                    navigation.navigate("DiaryDetailView", {
                      diaryDetail: progressItem,
                    });
                  } else {
                    navigation.navigate("SpecificProcessDetailScreen", {
                      processDetail: progressItem,
                    });
                  }
                }}
              >
                <View>
                  <Text style={[styles.actionTitle]}>
                    {progressItem.actionTitle}
                  </Text>
                  <Text style={[styles.actionDescription]}>
                    {shortenText(progressItem.actionDescription, 100)}
                  </Text>
                  {progressItem.isDone &&
                    progressItem?.imageReport &&
                    progressItem?.imageReport.length > 0 && (
                      <View style={styles.imageReport}>
                        {progressItem.imageReport.map((image, index1) => (
                          <Image
                            style={styles.imageReportItem}
                            key={`Action${index}Img${index1}`}
                            source={{ uri: convertImageURL(image?.url_link) }}
                          />
                        ))}
                      </View>
                    )}
                </View>
              </TouchableRipple>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressItemContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 40,
  },
  firstPoint: {
    marginBottom: 0,
  },
  doneBackGrColor: {
    backgroundColor: "#7fb640",
  },
  diaryTime: {
    width: "25%",
  },
  stage: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#707070",
    marginBottom: 16,
    textAlign: "right",
  },
  dayTime: {
    fontSize: 12,
    color: "#707070",
    marginBottom: 4,
    textAlign: "right",
  },
  progress: {
    width: "10%",
  },
  progressPoint: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "#c4c4c4",
    marginVertical: 4,
    alignSelf: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 1,
  },
  progressbar: {
    width: 4,
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#c4c4c4",
    marginVertical: 4,
    alignSelf: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 1,
  },
  diaryAction: {
    width: "65%",
  },
  actionWrapper: {
    borderRadius: 7,
    backgroundColor: "#f5f5f5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 5,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#707070",
    marginBottom: 8,
  },
  actionDescription: {
    width: "100%",
    fontSize: 12,
    color: "#707070",
    marginBottom: 20,
  },
  imageReport: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  imageReportItem: {
    resizeMode: "cover",
    alignSelf: "center",
    width: 50,
    height: 50,
  },
});

export default DiaryProgress;
