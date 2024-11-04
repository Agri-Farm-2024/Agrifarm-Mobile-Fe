import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ActivityIndicatorComponent = ({
  message = "ĐANG TẢI...",
  color = "#7fb640",
  size = 50,
}) => {
  return (
    <View>
      <ActivityIndicator animating={true} color={color} size={size} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "#7fb640",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default ActivityIndicatorComponent;
