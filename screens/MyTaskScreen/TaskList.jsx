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
      setTaskIcon(<AntDesign name="playcircleo" size={24} color="black" />);
    } else if (taskType == "Đang làm") {
      setTaskList(doingTasks);
      setTaskIcon(<Entypo name="circle" size={24} color="black" />);
    } else {
      setTaskList(doneTasks);
      setTaskIcon(<AntDesign name="checkcircleo" size={24} color="black" />);
    }
  }, [taskType]);

  const renderItem = ({ item }) => (
    <View style={styles.taskWrapper}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      {taskIcon}
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
    backgroundColor: "#7FB640",
    marginBottom: 10,
    borderRadius: 7,
  },
});

export default TaskList;
