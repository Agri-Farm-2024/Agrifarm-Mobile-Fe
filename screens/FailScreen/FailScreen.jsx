import React, { useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon"; // Import ConfettiCannon
import { Button } from "react-native-paper";

const FailScreen = ({ navigation }) => {
  const confettiRef = useRef(); // Reference to control the confetti

  return (
    <View style={styles.container}>
      {/* Icon at the top */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="error-outline" size={100} color="#D9534F" />
      </View>

      {/* Failure Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.title}>Thanh toán thất bại!</Text>
        <Text style={styles.subtitle}>
          Rất tiếc, thanh toán của bạn không thành công. Vui lòng thử lại.
        </Text>
      </View>

      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/farmer-frowning-face-vector-illustration_1142-82965.jpg",
        }}
        style={styles.qrImage}
      />

      {/* Retry Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={{ backgroundColor: "#D9534F" }}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          Trở về trang chủ
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D9534F",
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  qrImage: {
    width: 400,
    height: 300,
    marginBottom: 20,
  },
});

export default FailScreen;
