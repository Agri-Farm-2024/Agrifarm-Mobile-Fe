import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { formatDateToDDMMYYYY } from "../../utils";
import { useNavigation } from "@react-navigation/native";

const TaskModal = ({ isVisible, onClose, taskData, handleStartTask }) => {
  const navigation = useNavigation();

  const filterStatus = (status) => {
    if (status === "assigned") {
      return "Chờ bắt đầu";
    }

    if (status === "rejected") {
      return "Cần hoàn thiện";
    }

    if (status === "in_progress") {
      return "Đang thực hiện";
    }

    if (status === "completed") {
      return "Hoàn thành";
    }

    if (status === "pending_approval") {
      return "Chờ phê duyệt";
    }

    return "Chưa rõ";
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* Overlay sẽ đóng modal khi nhấn ra ngoài */}
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <Text style={styles.modalTitle}>Chi tiết công việc</Text>
          <Text style={styles.modalText}>
            Ngày tạo: {formatDateToDDMMYYYY(taskData?.created_at)}
          </Text>
          <Text style={styles.modalText}>
            Mô tả:{" "}
            {taskData?.request?.type === "create_process_standard"
              ? "Tạo quy trình kĩ thuật canh tác"
              : "Hỗ trợ kĩ thuật"}{" "}
            trên {taskData?.request?.plant_season?.plant?.name}
          </Text>

          <Text style={styles.modalText}>
            Trạng thái: {filterStatus(taskData?.request?.status)}
          </Text>
          <Text style={styles.modalText}>
            Phân công bởi: {taskData?.assign_by?.full_name || "Không có"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                borderColor: "black",
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                shadowColor: "#FF6347",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "#707070",
                  },
                ]}
              >
                Đóng
              </Text>
            </TouchableOpacity>
            {taskData?.request?.status === "rejected" ||
            taskData?.request?.status === "assigned" ? (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleStartTask}
              >
                <Text style={styles.buttonText}>Bắt đầu</Text>
              </TouchableOpacity>
            ) : taskData?.request?.status === "in_progress" ? (
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  navigation.navigate("ReportTaskScreen", {
                    taskInfo: taskData,
                  });
                }}
                style={styles.closeButton}
              >
                <Text style={styles.buttonText}>Báo cáo</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "90%",
    padding: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginTop: 12,
    color: "#666",
    lineHeight: 24,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#7fb640",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default TaskModal;
