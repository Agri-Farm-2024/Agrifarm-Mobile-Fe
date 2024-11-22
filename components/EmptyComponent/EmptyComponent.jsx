import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";

export default function EmptyComponent({ message = "Không có dữ liệu" }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/empty-image.png")}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 120,
    height: 120, // Kích thước của hình ảnh
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "#7fb640",
    fontWeight: "bold",
  },
});
