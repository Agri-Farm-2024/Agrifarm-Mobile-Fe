import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

const DiaryProgress = ({ diaryProgress }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingBottom: 30 }}>
      <View style={[styles.progressItemContainer, styles.firstPoint]}>
        <View style={styles.diaryTime}></View>
        <View style={styles.progress}>
          <View style={[styles.progressPoint, styles.doneBackGrColor]}></View>
        </View>
        <View style={styles.diaryAction}></View>
      </View>
      {diaryProgress.map((progressItem, index) => (
        <View key={index} style={styles.progressItemContainer}>
          <View style={styles.diaryTime}>
            <Text style={styles.stage}>{progressItem.stageTitle}</Text>
            <Text style={styles.dayTime}>{progressItem.dayFrom}</Text>
            <Text style={styles.dayTime}>{progressItem.dayTo}</Text>
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
          <View style={styles.diaryAction}>
            <TouchableRipple
              style={styles.actionWrapper}
              rippleColor="rgba(127, 182, 64, 0.2)"
              onPress={() => navigation.navigate("DiaryDetailView")}
            >
              <View>
                <Text style={styles.actionTitle}>
                  {progressItem.actionTitle}
                </Text>
                <Text style={styles.actionDescription}>
                  {progressItem.actionDescription}
                </Text>
                {progressItem.isDone && progressItem.imageReport.length > 0 && (
                  <View style={styles.imageReport}>
                    {progressItem.imageReport.map((image, index1) => (
                      <Image
                        style={styles.imageReportItem}
                        key={`Action${index}Img${index1}`}
                        source={{ uri: image }}
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
