import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper"; // Import Appbar from React Native Paper

const PaymentScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(5); // 300 seconds = 5 minutes

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      navigation.navigate("ThankYouScreen", {
        msg: "Chúc bạn canh tác thuận lợi, vật tư sẽ được gửi đến bạn sớm thôi",
      });
      // navigation.navigate("FailScreen");
    }
  }, [timeLeft]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <Appbar.Header style={{ backgroundColor: "#76B947" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thanh Toán" color="white" />
      </Appbar.Header>

      <View style={styles.qrContainer}>
        <Text style={styles.title}>QUÉT ĐỂ THANH TOÁN</Text>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/R.dcf4b6e228aef80dd1a58f4c76f07128?rik=Qj2LybacmBALtA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fqr_code%2fqr_code_PNG25.png&ehk=eKH2pdoegouCUxO1rt6BJXt4avVYywmyOS8biIPp5zc%3d&risl=&pid=ImgRaw&r=0",
          }} // Replace with actual URL of the QR code image
          style={styles.qrImage}
        />
        <Text style={styles.accountText}>Tên chủ TK: AgriFarm</Text>
        <Text style={styles.accountText}>
          STK: <Text style={styles.accountHighlight}>4940116348275</Text>
        </Text>
        <Text style={styles.accountText}>Ngân hàng TMCP Ngoại thương VN</Text>
      </View>

      <Text style={styles.countdown}>
        Thời gian còn lại: {formatTime(timeLeft)}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#76B947",
    justifyContent: "center",
    alignItems: "center",
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  accountText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  accountHighlight: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  countdown: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
  },
});

export default PaymentScreen;
