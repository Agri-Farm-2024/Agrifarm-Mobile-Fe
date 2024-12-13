import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { Card } from "react-native-paper";
import { capitalizeFirstLetter, convertImageURL } from "../../utils";

const MaterialUsedScreen = ({ route }) => {
  const { diary } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {(!diary ||
          !diary?.process_technical_specific_stage ||
          diary?.process_technical_specific_stage.length == 0) && (
          <Text
            style={{
              width: "100%",
              color: "#707070",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Không có vật tư
          </Text>
        )}
        {diary &&
          diary?.process_technical_specific_stage &&
          diary?.process_technical_specific_stage.map((stage, stageIndex) => (
            <View key={`Stage ${stageIndex}`} style={styles.stageContainer}>
              <Text style={styles.stageTitle}>
                Giai đoạn {stageIndex + 1}: {stage?.stage_title}
              </Text>
              {(!stage?.process_technical_specific_stage_material ||
                stage?.process_technical_specific_stage_material.length ==
                  0) && (
                <Text
                  style={{
                    width: "100%",
                    color: "#707070",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Không có vật tư
                </Text>
              )}
              {stage?.process_technical_specific_stage_material &&
                stage?.process_technical_specific_stage_material.length > 0 &&
                stage?.process_technical_specific_stage_material.map(
                  (material, materialIndex) => (
                    <Card
                      key={`Material ${materialIndex} in Stage ${stageIndex}`}
                      style={styles.itemContainer}
                    >
                      <Card.Content style={styles.itemContent}>
                        <Image
                          style={styles.materialImg}
                          source={{
                            uri: convertImageURL(
                              material?.materialSpecific?.image_material
                            ),
                          }}
                        />
                        <View style={styles.materialInfoContainer}>
                          <Text style={styles.materialName}>
                            {capitalizeFirstLetter(
                              material?.materialSpecific?.name
                            )}
                          </Text>
                          <Text style={styles.materialQuantity}>
                            Số lượng: {material?.quantity}
                          </Text>
                          {stage?.is_get_material && (
                            <Text
                              style={{
                                fontWeight: "bold",
                                color: "#7fc640",
                              }}
                            >
                              Đã lấy vật tư
                            </Text>
                          )}
                        </View>
                      </Card.Content>
                    </Card>
                  )
                )}
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  stageContainer: {
    marginBottom: 20,
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7fb640",
    backgroundColor: "white",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  materialImg: {
    width: 60,
    height: 70,
    objectFit: "cover",
    resizeMode: "center",
    borderRadius: 5,
  },
  materialInfoContainer: {
    gap: 5,
  },
  materialName: {
    fontSize: 16,
    color: "#141414",
    fontWeight: "bold",
  },
  materialQuantity: {
    color: "#707070",
  },
});

export default MaterialUsedScreen;
