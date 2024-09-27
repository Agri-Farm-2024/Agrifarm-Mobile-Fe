import React, { useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon"; // Import ConfettiCannon
import { Button } from "react-native-paper";

const ThankYouScreen = ({ navigation }) => {
  const confettiRef = useRef(); // Reference to control the confetti

  return (
    <View style={styles.container}>
      {/* Fireworks Effect */}
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }} // Starting point of the confetti
        autoStart={true}
        fadeOut={true}
        explosionSpeed={350}
        fallSpeed={2500}
        ref={confettiRef}
      />

      {/* Icon at the top */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="check-circle" size={100} color="#76B947" />
      </View>

      {/* Thank You Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.title}>Thành công!</Text>
        <Text style={styles.subtitle}>
          Chúc bạn canh tác thuận lợi, vật tư sẽ được gửi đến bạn sớm thôi
        </Text>
      </View>

      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/farmer-hat-overalls-vector-illustration-cartoon-style_1142-82965.jpg",
        }}
        style={styles.qrImage}
      />

      {/* Done Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={{ backgroundColor: "#7fb640" }}
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
    color: "#76B947",
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

export default ThankYouScreen;
