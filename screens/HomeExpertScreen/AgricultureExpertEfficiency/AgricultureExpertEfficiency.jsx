import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListTaskByUser } from "../../../redux/slices/taskSlice";

const AgricultureExpertEfficiency = () => {
  // const [totalTasks, setTotalTasks] = useState(0);
  // const [completedTasks, setCompletedTasks] = useState(0);
  // const [notStartedTasks, setNotStartedTasks] = useState(0);
  // const [inProgressTaks, setInProgressTaks] = useState(0);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { taskList, loading, error } = useSelector((state) => state.taskSlice);
  console.log("AgricultureExpertEfficiency: ", taskList?.length);

  useEffect(() => {
    if (isFocused) {
      console.log("Fetching tasks...");
      dispatch(
        getListTaskByUser({
          status: null,
        })
      ).then((res) => {
        // console.log("Fetch task response: " + JSON.stringify(res));
      });
    }
  }, [isFocused]);

  const totalTasks = taskList?.length;
  const completedTasks = taskList.filter(
    (task) =>
      task?.request?.status === "pending_approval" ||
      task?.request?.status === "completed"
  ).length;
  const notStartedTasks = taskList.filter(
    (task) =>
      task?.request?.status === "rejected" ||
      task?.request?.status === "assigned"
  ).length;
  const inProgressTaks = taskList.filter(
    (task) => task?.request?.status === "in_progress"
  ).length;

  return (
    <View style={styles.container}>
      {/* Circular chart imitation */}
      <View style={styles.chartWrapper}>
        <View style={styles.outerCircle}>
          {/* Segment 1: Completed */}
          <View
            style={[
              styles.segment,
              {
                backgroundColor: "#4caf50",
                height: `${(completedTasks * 100) / totalTasks}%`,
              },
            ]}
          />
          {/* Segment 2: Incomplete */}
          <View
            style={[
              styles.segment,
              {
                backgroundColor: "#ff9800",
                height: `${(inProgressTaks * 100) / totalTasks}%`,
              },
            ]}
          />
          {/* Segment 3: Not Started */}
          <View
            style={[
              styles.segment,
              {
                backgroundColor: "#f44438",
                height: `${(notStartedTasks * 100) / totalTasks}%`,
              },
            ]}
          />
        </View>
        <View style={styles.chartTextContainer}>
          <Text style={styles.chartText}>{completedTasks}</Text>
          <Text style={styles.chartText}>{inProgressTaks}</Text>
          <Text style={styles.chartText}>{notStartedTasks}</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Báo cáo hiệu suất</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#f44336" }]} />
          <Text style={styles.textLegend}>Chưa thực hiện</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#ff9800" }]} />
          <Text style={styles.textLegend}>Đang thực hiện</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#4caf50" }]} />
          <Text style={styles.textLegend}>Hoàn thành</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff", // Ensure background color is set
    borderRadius: 5,
    // Modify shadow for a softer effect
    shadowColor: "#000", // Black shadow color
    shadowOffset: { width: 0, height: 3 }, // Subtle vertical offset
    shadowOpacity: 0.1, // Lighter shadow
    shadowRadius: 8, // More blur for softness
    elevation: 3, // Slight shadow depth for Android
  },
  chartWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    height: 120,
    width: 120,
    // borderRadius: 90, // Ensure it's circular
    borderWidth: 0,
    borderColor: "#ddd",
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  segment: {
    width: "30%",
    height: "100%",
    minHeight: "1%",
  },
  chartTextContainer: {
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chartText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#324F5E",
    width: "30%",
    textAlign: "center",
  },
  chartSubText: {
    fontSize: 14,
    color: "#777",
  },
  legendContainer: {
    alignItems: "flex-start",
  },
  legendTitle: {
    fontWeight: "bold",
    fontSize: 18,
    fontWeight: "700",
    color: "#324F5E",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  textLegend: {
    fontSize: 14,
    fontWeight: "400",
    color: "#707070",
  },
  legendColor: {
    width: 20,
    height: 10,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default AgricultureExpertEfficiency;
