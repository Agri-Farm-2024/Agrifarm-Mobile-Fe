import { FlatList, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";

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
  const [taskList, setTaskList] = useState(notStartTasks);
  const [taskIcon, setTaskIcon] = useState(
    <AntDesign name="playcircleo" size={24} color="black" />
  );

  useEffect(() => {
    if (taskType == "Chưa bắt đầu") {
      setTaskList(notStartTasks);
    } else if (taskType == "Đang làm") {
      setTaskList(doingTasks);
    } else {
      setTaskList(doneTasks);
    }
  }, [taskType]);

  const hadnleShowIconTask = (priority) => {
    const iconColor =
      priority == "Cao"
        ? "rgba(217, 21, 21, 1)"
        : priority == "Trung bình"
        ? "rgba(255, 167, 86, 1)"
        : "rgba(89, 226, 28, 0.8)";
    if (taskType == "Chưa bắt đầu") {
      return <AntDesign name="playcircleo" size={24} color={iconColor} />;
    }
    if (taskType == "Đang làm") {
      return <Entypo name="circle" size={24} color={iconColor} />;
    }
    return <AntDesign name="checkcircleo" size={24} color={iconColor} />;
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.taskWrapper,
        item.priority == "Trung bình" && {
          backgroundColor: "rgba(255, 167, 86, 0.2)",
        },
        item.priority == "Cao" && {
          backgroundColor: "rgba(217, 21, 21, 0.2)",
        },
      ]}
    >
      <Text
        style={[
          styles.taskTitle,
          item.priority == "Trung bình" && {
            color: "rgba(255, 167, 86, 1)",
          },
          item.priority == "Cao" && {
            color: "rgba(217, 21, 21, 1)",
          },
        ]}
      >
        {item.title}
      </Text>
      {hadnleShowIconTask(item.priority)}
    </View>
  );
  return (
    <FlatList
      keyExtractor={(item, index) => item.id + index}
      data={taskList}
      renderItem={renderItem}
    />
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
    color: "rgba(89, 226, 28, 0.8)",
    fontSize: 14,
  },
});

export default TaskList;
