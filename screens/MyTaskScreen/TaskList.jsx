import { FlatList, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListTaskByUser, startTaskByID } from "../../redux/slices/taskSlice";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { TouchableOpacity } from "react-native";
import TaskModal from "./TaskModal";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

const notStartTasks = [
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Thấp",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Cao",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Trung bình",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Tư vấn",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Trung bình",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
];
const doingTasks = [
  {
    id: "T001",
    title: "Chuẩn bị đất",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Thấp",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Cao",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Trung bình",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Tư vấn",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Trung bình",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
];

const doneTasks = [
  {
    id: "T001",
    title: "Chuẩn bị đất",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Thấp",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Cao",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Canh tác",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Trung bình",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
  {
    id: "T001",
    title: "Lên kế hoạch canh tác",
    type: "Tư vấn",
    dateRequest: "25/09/2020",
    landName: "Mảnh đất số 1",
    priority: "Trung bình",
    status: "Đang làm",
    idService: "DV001",
    customerName: "Nguyen Van A",
    customerPhone: "0989989799",
    taskDescription: "Lên kế hoạch canh tác",
    note: "",
  },
];

const TaskList = ({ taskType }) => {
  const [taskListData, setTaskList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const { taskList, loading, error } = useSelector((state) => state.taskSlice);

  useEffect(() => {
    if (taskType == "Chưa bắt đầu") {
      const newData = taskList.filter(
        (task) =>
          task?.request?.status === "rejected" ||
          task?.request?.status === "assigned"
      );
      setTaskList(newData);
    } else if (taskType == "Đang làm") {
      const newData = taskList.filter(
        (task) => task?.request?.status === "in_progress"
      );
      setTaskList(newData);
    } else {
      const newData = taskList.filter(
        (task) =>
          task?.request?.status === "pending_approval" ||
          task?.request?.status === "completed"
      );
      setTaskList(newData);
    }
  }, [taskType]);

  useEffect(() => {
    if (isFocused) {
      console.log("Fetching tasks...");
      dispatch(
        getListTaskByUser({
          status: taskType,
        })
      );
    }
  }, [taskType, isFocused]);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleStartTask = () => {
    console.log("selected: " + JSON.stringify(selectedTask.task_id));
    dispatch(
      startTaskByID({
        task_id: selectedTask.task_id,
      })
    ).then((res) => {
      console.log("res: " + JSON.stringify(res.payload.statusCode === 200)); // Fixed `JSON.string` to `JSON.stringify`
      if (res.payload.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: "Bắt đầu công việc!",
        });
        dispatch(
          getListTaskByUser({
            status: taskType,
          })
        ).then((response) => {
          console.log("response: " + JSON.stringify(response.payload.metadata));
          const newTaskList = response.payload.metadata;
          const newData = newTaskList.filter(
            (task) =>
              task?.request?.status === "rejected" ||
              task?.request?.status === "assigned"
          );
          setTaskList(newData);
          closeModal();
        });
        return;
      }

      if (res.payload.statusCode === 400) {
        Toast.show({
          type: "error",
          text1: "chưa bắt đầu công việc!",
        });
        return;
      }
    });
  };

  const hadnleShowIconTask = (priority) => {
    const iconColor =
      priority == "assigned" || priority == "rejected"
        ? "#0087ff"
        : priority == "in_progress"
        ? "#ff7d53"
        : "#5f33e1";
    if (priority == "assigned" || priority == "rejected") {
      return <AntDesign name="playcircleo" size={24} color={iconColor} />;
    }
    if (priority == "in_progress") {
      return <Entypo name="circle" size={24} color={iconColor} />;
    }
    return <AntDesign name="checkcircleo" size={24} color={iconColor} />;
  };
  ("white");
  if (loading && !taskList) return <ActivityIndicatorComponent />;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openModal(item)}
      style={[
        styles.taskWrapper,
        item?.request?.status == "assigned" && {
          backgroundColor: "rgb(227, 242, 255)",
        },
        item?.request?.status == "rejected" && {
          backgroundColor: "rgb(227, 242, 255)",
        },
        item?.request?.status == "in_progress" && {
          backgroundColor: "rgb(255, 233, 225)",
        },
        item?.request?.status == "pending_approval" && {
          backgroundColor: "rgb(237, 232, 255)",
        },
        item?.request?.status == "completed" && {
          backgroundColor: "rgb(237, 232, 255)",
        },
      ]}
    >
      <Text
        style={[
          styles.taskTitle,
          item?.request?.status == "assigned" && {
            color: "#0087ff",
          },
          item?.request?.status == "rejected" && {
            color: "#0087ff",
          },
          item?.request?.status == "in_progress" && {
            color: "#ff7d53",
          },
          item?.request?.status == "pending_approval" && {
            color: "#5f33e1",
          },
          item?.request?.status == "completed" && {
            color: "#5f33e1",
          },
        ]}
      >
        {item?.request?.type === "create_process_standard"
          ? "Tạo quy trình kĩ thuật canh tác"
          : "Hỗ trợ kĩ thuật"}
      </Text>
      {hadnleShowIconTask(item?.request?.status)}
    </TouchableOpacity>
  );

  return (
    <View>
      {taskListData.length > 0 ? (
        <FlatList
          keyExtractor={(item, index) => item.task_id + index}
          data={taskListData}
          renderItem={renderItem}
        />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          Không có nhiệm vụ
        </Text>
      )}
      <TaskModal
        isVisible={isModalVisible}
        onClose={closeModal}
        taskData={selectedTask}
        handleStartTask={handleStartTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgba(89, 226, 28, 0.2)",
    marginBottom: 10,
    borderRadius: 7,
  },
  taskTitle: {
    color: "white",
    fontSize: 14,
  },
});

export default TaskList;
