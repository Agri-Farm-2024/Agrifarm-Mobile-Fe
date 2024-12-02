import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { formatDateToDDMMYYYY, formatTimeViewLand } from "../../utils";
import { useNavigation } from "@react-navigation/native";

const TaskModal = ({ isVisible, onClose, taskData, handleStartTask }) => {
  const navigation = useNavigation();
  console.log(JSON.stringify(taskData));

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
            Yêu cầu lúc: {formatTimeViewLand(taskData?.created_at)}
          </Text>

          <Text style={styles.modalText}>
            Mô tả:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {taskData?.request?.type === "create_process_standard"
                ? "Tạo quy trình kĩ thuật canh tác"
                : taskData?.request?.type === "cultivate_process_content"
                ? "Canh tác và ghi nhật ký"
                : taskData?.request?.type === "report_land"
                ? "Báo cáo mảnh đất"
                : taskData?.request?.type === "technical_support"
                ? "Hỗ trợ kĩ thuật"
                : taskData?.request?.type === "product_purchase"
                ? "Kiểm định thu mua"
                : taskData?.request?.type === "product_puchase_harvest"
                ? "Yêu cầu thu hoạch"
                : taskData?.request?.type}
            </Text>
          </Text>
          <Text style={styles.modalText}>
            Phân công lúc: {formatTimeViewLand(taskData?.assigned_at)}
          </Text>
          <Text style={styles.modalText}>
            Mảnh đất:{" "}
            {taskData?.request?.service_specific
              ? taskData?.request?.service_specific?.booking_land?.land?.name
              : taskData?.request?.process_technical_specific_stage_content
              ? taskData?.request?.process_technical_specific_stage_content
                  ?.process_technical_specific_stage?.process_technical_specific
                  ?.service_specific?.booking_land?.land?.name
              : taskData?.request?.booking_land
              ? taskData?.request?.booking_land?.land?.name
              : "Không có"}
          </Text>
          <Text style={styles.modalText}>
            Bắt đầu lúc:{" "}
            {taskData?.request?.time_start
              ? formatTimeViewLand(taskData?.request?.time_start)
              : "Ngay bây giờ"}
          </Text>
          <Text style={styles.modalText}>
            Trạng thái: {filterStatus(taskData?.request?.status)}
          </Text>
          <Text style={styles.modalText}>
            Phân công bởi: {taskData?.assign_by?.full_name || "Hệ thống"}
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
                  if (taskData?.request?.type === "product_purchase") {
                    navigation.navigate("ReportTaskPurchaseScreen", {
                      taskInfo: taskData,
                    });
                  } else if (
                    taskData?.request?.type === "product_puchase_harvest"
                  ) {
                    navigation.navigate("ReportTaskPurchaseHarvestScreen", {
                      taskInfo: taskData,
                    });
                  } else if (taskData?.request?.type === "report_land") {
                    navigation.navigate("ReportTaskLandScreen", {
                      taskInfo: taskData,
                    });
                  } else {
                    navigation.navigate("ReportTaskScreen", {
                      taskInfo: taskData,
                    });
                  }
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
