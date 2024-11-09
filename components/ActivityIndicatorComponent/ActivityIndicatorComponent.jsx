import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ActivityIndicatorComponent = ({
  imageSource = require("./../../assets/agrifarm-logo.png"),
  size = 60,
  imageSize = 40,
  color = "#7fb640",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={color}
          size={size}
          style={styles.spinner}
        />
        <Image
          source={imageSource}
          style={[styles.image, { width: imageSize, height: imageSize }]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    position: "absolute",
    zIndex: 1,
  },
  image: {
    borderRadius: 50,
  },
  message: {
    fontSize: 16,
    color: "#7fb640",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default ActivityIndicatorComponent;
