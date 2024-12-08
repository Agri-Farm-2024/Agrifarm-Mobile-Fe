import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { capitalizeFirstLetter, convertImageURL } from "../../utils";
import { StyleSheet } from "react-native";

const StandardProcessDetail = ({ route, navigation }) => {
  const { standardProcess } = route.params;
  console.log("standardProcessDetail", JSON.stringify(standardProcess));
  const [processDetail, setProcessDetail] = useState(null);

  useEffect(() => {
    if (standardProcess) {
      const sortStageArr = {
        ...standardProcess,
        process_standard_stage: [
          ...standardProcess?.process_standard_stage,
        ].sort((a, b) => a.stage_numberic_order - b.stage_numberic_order),
      };
      const sortStageContent = {
        ...sortStageArr,
        process_standard_stage: [...sortStageArr.process_standard_stage].map(
          (stage, index) => {
            return {
              ...stage,
              process_standard_stage_content: [
                ...stage?.process_standard_stage_content,
              ].sort(
                (a, b) => a.content_numberic_order - b.content_numberic_order
              ),
            };
          }
        ),
      };
      setProcessDetail(sortStageContent);
      console.log("setProcessDetail", JSON.stringify(sortStageContent));
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 10 }}>
          {standardProcess && (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.processName}>
                  {capitalizeFirstLetter(standardProcess?.name)}
                </Text>
                <Text style={styles.infoLabel}>
                  Loại cây:{" "}
                  <Text style={styles.infoContent}>
                    {capitalizeFirstLetter(
                      standardProcess?.plant_season?.plant?.name
                    )}
                  </Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Mùa vụ:{" "}
                  <Text style={styles.infoContent}>
                    {standardProcess?.plant_season?.type == "in_season"
                      ? "Mùa thuận"
                      : "Mùa nghịch"}
                  </Text>
                </Text>
              </View>
              <View style={styles.processWrapper}>
                {standardProcess &&
                  standardProcess?.process_standard_stage &&
                  standardProcess?.process_standard_stage.map(
                    (stage, index) => (
                      <View
                        key={`Stage ${index}`}
                        style={styles.processContainer}
                      >
                        <Text style={styles.stageDate}>
                          Giai đoạn {index + 1}: {stage?.stage_title} - Ngày{" "}
                          {stage?.time_start} - {stage?.time_end}
                        </Text>
                        <View style={styles.stageContainer}>
                          {stage?.process_standard_stage_content.map(
                            (step, stepIndex) => (
                              <View
                                key={`Step ${stepIndex} in Stage ${index}`}
                                style={styles.stepContainer}
                              >
                                <Text style={styles.stepDate}>
                                  {step?.time_start != step?.time_end
                                    ? `Ngày ${step?.time_start} - ngày ${step?.time_end}`
                                    : `Ngày ${step?.time_start}`}
                                  : {step?.title}
                                </Text>
                                <Text style={styles.stepContent}>
                                  {step?.content}
                                </Text>
                              </View>
                            )
                          )}
                        </View>
                        <Text style={styles.materialTitle}>
                          Vật tư sử dụng trong giai đoạn:{" "}
                        </Text>
                        <View style={styles.materialContainer}>
                          {stage?.process_standard_stage_material &&
                            stage?.process_standard_stage_material.length ==
                              0 && (
                              <Text style={styles.emptyText}>
                                Không có vật tư
                              </Text>
                            )}
                          {stage?.process_standard_stage_material &&
                            stage?.process_standard_stage_material.length > 0 &&
                            stage?.process_standard_stage_material?.map(
                              (material, materialIndex) => (
                                <View
                                  style={styles.materialContent}
                                  key={`mateirial ${materialIndex} in Stage ${index}`}
                                >
                                  <Image
                                    style={styles.materialImg}
                                    source={{
                                      uri: convertImageURL(
                                        material?.material?.image_material
                                      ),
                                    }}
                                  />
                                  <Text style={styles.materialInfo}>
                                    {capitalizeFirstLetter(
                                      material?.material?.name
                                    )}{" "}
                                    - Số lượng: {material?.quantity}
                                  </Text>
                                </View>
                              )
                            )}
                        </View>
                      </View>
                    )
                  )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    gap: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
    borderRadius: 7,
    marginBottom: 10,
  },
  processName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7FB640",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContent: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#707070",
  },
  processWrapper: {
    width: "100%",
    fontSize: 14,
    padding: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
    borderRadius: 7,
  },
  stageDate: {
    fontWeight: "bold",
    color: "#7FB640",
    fontSize: 16,
    marginTop: 10,
  },
  stepContainer: {
    padding: 10,
  },
  materialContent: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  materialImg: {
    width: 50,
    height: 50,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: 7,
  },
  stepDate: {
    fontWeight: "bold",
    fontSize: 14,
  },
  materialContainer: {
    padding: 10,
  },
  materialTitle: {
    fontWeight: "bold",
    fontSize: 14,
    padding: 10,
  },
  emptyText: {
    fontWeight: "bold",
    color: "#707070",
  },
});

export default StandardProcessDetail;
