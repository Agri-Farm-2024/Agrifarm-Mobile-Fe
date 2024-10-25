import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import StandardProcessInputs from "./StandardProcessInputs";
import PlanToStandardFarmingInput from "./PlanToStandardFarmingInput";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function StandardProcessComponent({ navigation, onSubmit }) {
  const inputPlanRef = useRef();
  const [processes, setProcesses] = useState([
    {
      id: 1,
      title: "",
      description: "",
    },
  ]);
  const [plantStages, setPlantStages] = useState([
    {
      id: Date.now(),
      title: "",
      inputs: [
        {
          from: "",
          to: "",
          single: "",
          multiline: "",
        },
      ],
      materials: [
        {
          id: "",
          materialName: "",
          materialQuantity: "",
        },
      ],
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleImport = async () => {
    try {
      console.log("Importing...");
      // Use expo-document-picker to pick the Excel file
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      console.log("result", result);
      if (result.assets) {
        const fileUri = result.assets[0].uri;

        // Read the file into a buffer using expo-file-system
        const fileContents = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Convert Base64 string to binary string before passing to XLSX
        const binaryString = atob(fileContents);
        const workbook = XLSX.read(binaryString, { type: "binary" });

        // Read the first worksheet from the Excel file
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        let processData = [];
        let stepOfStageData = [];
        let materialData = [];

        jsonData.forEach((row, index) => {
          //Skip the header
          if (index > 1) {
            // Handle read the Process Block
            if (row[0]) {
              console.log("row[0]:", row[0]);
              processData.push({
                id: row[0] || "",
                title: row[1] || "",
                description: row[2] || "",
              });
            }

            // Handle read the Stage Block
            if (row[4]) {
              stepOfStageData.push({
                stageId: row[4],
                stageTitle: row[5],
                stepDateStart: row[6],
                stepDateEnd: row[7],
                stepTitle: row[8],
                stepDescription: row[9],
              });

              // Handle read Material Block
              if (row[11]) {
                materialData.push({
                  materialId: row[11] || "",
                  stageId: row[12] || "",
                  materialName: row[13] || "",
                  materialQuantity: row[14] || "",
                });
              }
            }
          }
        });

        console.log("Steps", stepOfStageData);

        //Get different stages in steps
        const stageItems = stepOfStageData.reduce((stages, currentItem) => {
          //Check stage id whether exists in stages or not
          if (!stages.some((item) => item.stageId === currentItem.stageId)) {
            stages.push({
              stageId: currentItem.stageId,
              stageTitle: currentItem.stageTitle,
            });
          }
          return stages;
        }, []);

        //Create Stage Data
        const stageData = stageItems.map((item) => ({
          id: item.stageId,
          title: item.stageTitle,
          inputs: stepOfStageData.reduce((acc, step) => {
            if (step.stageId == item.stageId) {
              acc.push({
                from: step.stepDateStart + "", //convert to string to suitable with text input components
                to: step.stepDateEnd + "",
                single: step.stepTitle,
                multiline: step.stepDescription,
              });
            }
            return acc;
          }, []),
          materials: materialData.reduce((acc, material) => {
            if (material.stageId == item.stageId) {
              acc.push({
                id: material.materialId,
                materialName: material.materialName,
                materialQuantity: material.materialQuantity + "", //convert to string to suitable with text input components
              });
            }
            return acc;
          }, []),
        }));

        console.log("Stage list", stageItems);
        console.log("Stage data", JSON.stringify(stageData));

        //Set data to stage
        setProcesses(processData);
        setPlantStages(stageData);
      }
    } catch (error) {
      if (error.code === "DOCUMENT_PICKER_CANCELED") {
        console.log("User cancelled the picker");
      } else {
        console.error("Error importing file:", error);
      }
    }
  };

  const handleBackButton = () => {
    if (hasUnsavedChanges) {
      setModalVisible(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => backHandler.remove();
  }, [hasUnsavedChanges]);

  const validateProcesses = () => {
    for (let i = 0; i < processes.length; i++) {
      if (!processes[i].title) {
        Toast.show({
          type: "error",
          text1: `Bước ${i + 1}: Tiêu đề chuẩn bị là bắt buộc`,
        });
        return false;
      }
      if (!processes[i].description) {
        Toast.show({
          type: "error",
          text1: `Bước ${i + 1}: Mô tả chuẩn bị là bắt buộc`,
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateProcesses()) {
      if (inputPlanRef.current) {
        const isInvalid = inputPlanRef.current.handleCheckValidateDate();
        if (!isInvalid) {
          console.log("processes submitted", processes);
          console.log("plantStages submitted", JSON.stringify(plantStages));
          setHasUnsavedChanges(false);
          onSubmit();
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.header}>Các giai đoạn chính</Text>
        <IconButton
          mode="contained"
          icon={() => (
            <FontAwesome6 name="file-excel" size={24} color="#7FB640" />
          )}
          iconColor={"white"}
          size={28}
          onPress={handleImport}
          style={{
            borderRadius: 7,
            backgroundColor: "rgba(127, 182, 64, 0.2)",
          }}
        />
      </View>
      <View>
        <Text style={styles.sub_header}>Chuẩn bị trước khi trồng:</Text>
        <StandardProcessInputs
          processes={processes}
          setProcesses={setProcesses}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
        <PlanToStandardFarmingInput
          setPlantStages={setPlantStages}
          plantStages={plantStages}
          ref={inputPlanRef}
        />
        <TouchableOpacity style={styles.submit_button} onPress={handleSubmit}>
          <Text style={styles.submit_text}>Tạo quy trình</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for unsaved changes */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Bạn có chắc chắn muốn rời khỏi trang này?
            </Text>
            <Text style={styles.modalMessage}>
              Bạn sẽ mất tất cả các thay đổi chưa lưu.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.modalButtonText}>Rời khỏi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sub_header: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  submit_button: {
    backgroundColor: "#7fb640",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submit_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#7fb640",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
