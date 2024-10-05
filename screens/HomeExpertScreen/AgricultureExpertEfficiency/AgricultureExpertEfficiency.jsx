import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AgricultureExpertEfficiency = () => {
  // Task data
  const totalTasks = 20;
  const completedTasks = 15;
  const notStartedTasks = 5;
  const incompleteTasks = 0;

  return (
    <View style={styles.container}>
      {/* Circular chart imitation */}
      <View style={styles.chartWrapper}>
        <View style={styles.outerCircle}>
          {/* Segment 1: Completed */}
          <View
            style={[
              styles.segment,
              { backgroundColor: "#4caf50", flex: completedTasks },
            ]}
          />
          {/* Segment 2: Incomplete */}
          <View
            style={[
              styles.segment,
              { backgroundColor: "#f44336", flex: incompleteTasks },
            ]}
          />
          {/* Segment 3: Not Started */}
          <View
            style={[
              styles.segment,
              { backgroundColor: "#ff9800", flex: notStartedTasks },
            ]}
          />
        </View>
        <View style={styles.chartTextContainer}>
          <Text style={styles.chartText}>{totalTasks} công việc</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Báo cáo hiệu suất</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#ff9800" }]} />
          <Text style={styles.textLegend}>Chưa thực hiện</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#f44336" }]} />
          <Text style={styles.textLegend}>Không hoàn thành</Text>
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
    borderRadius: 90, // Ensure it's circular
    borderWidth: 3,
    borderColor: "#ddd",
    overflow: "hidden",
    flexDirection: "row",
  },
  segment: {
    height: "100%",
  },
  chartTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chartText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#324F5E",
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
