import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Modal,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import SpecificProcessInputs from "./SpecificProcessInputs";
import PlanToSpecificFarmingInput from "./PlanToSpecificFarmingInput";

export default function SpecificProcessComponent({ navigation }) {
  const inputPlanRef = useRef();
  const [processes, setProcesses] = useState([
    {
      id: 1,
      title: "Chuẩn bị đất",
      description:
        "Mô tả: Làm sạch cỏ dại, cày xới đất và trộn đều phân bón hữu cơ. Kiểm tra độ pH của đất để đảm bảo đất có độ pH từ 5.5 đến 6.5",
    },
  ]);
  const [plantStages, setPlantStages] = useState([
    {
      id: Date.now(),
      title: "Giai đoạn 1: Chuẩn bị đất:",
      inputs: [
        {
          from: "0",
          to: "2",
          single: "Chuẩn bị đất",
          multiline: "Xới đất sâu 20-30 cm để làm tơi xốp",
        },
      ],
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
          console.log("plantStages submitted", plantStages);
          setHasUnsavedChanges(false);
          Toast.show({
            type: "success",
            text1: "Gửi thành công",
          });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Các giai đoạn chính</Text>
      <View>
        <Text style={styles.sub_header}>Chuẩn bị trước khi trồng:</Text>
        <SpecificProcessInputs
          processes={processes}
          setProcesses={setProcesses}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
        <PlanToSpecificFarmingInput
          setPlantStages={setPlantStages}
          plantStages={plantStages}
          ref={inputPlanRef}
        />
        <TouchableOpacity style={styles.submit_button} onPress={handleSubmit}>
          <Text style={styles.submit_text}>Submit</Text>
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
