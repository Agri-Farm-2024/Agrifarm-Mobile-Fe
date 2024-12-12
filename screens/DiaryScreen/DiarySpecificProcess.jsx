// DiarySpecificProcess.js
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DiaryProgress from "../../components/DiaryProgress";
import { Button } from "react-native-paper";
import PurchaseRequestModal from "./PurchaseRequestModal/PurchaseRequestModal"; // Import the modal
import { capitalizeFirstLetter } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DiarySpecificProcess = ({ diary }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {diary && (
        <>
          <View style={styles.diaryInfoContainer}>
            <Text style={styles.diaryInfo}>
              <Text
                style={{
                  color: "#707070",
                  fontWeight: "bold",
                }}
              >
                Giống cây:
              </Text>{" "}
              {capitalizeFirstLetter(
                diary?.service_specific?.plant_season?.plant?.name
              )}
            </Text>
            <Text style={styles.diaryInfo}>
              <Text style={{ color: "#707070", fontWeight: "bold" }}>
                Mùa vụ:
              </Text>{" "}
              {diary?.service_specific?.plant_season?.type == "in_season"
                ? "Mùa thuận"
                : "Mùa nghịch"}
            </Text>
            <Button
              mode="contained"
              style={{
                width: 200,
                marginTop: 10,
                backgroundColor: "#7fb640",
                borderRadius: 5,
              }}
              onPress={() => {
                navigation.navigate("MaterialUsedScreen", { diary: diary });
              }}
            >
              <MaterialCommunityIcons name="tools" size={16} color="white" />{" "}
              Vật tư
            </Button>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.progressContainer}
          >
            <DiaryProgress diaryProgress={diary} />
          </ScrollView>

          {/* Use the PurchaseRequestModal */}
          <PurchaseRequestModal
            visible={modalVisible}
            onClose={handleCloseModal}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  diaryInfoContainer: {
    padding: 20,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    gap: 10,
    marginBottom: 20,
  },
  diaryInfo: {
    fontSize: 14,
    color: "#707070",
  },
  progressContainer: {
    paddingHorizontal: 10,
  },
});

export default DiarySpecificProcess;
