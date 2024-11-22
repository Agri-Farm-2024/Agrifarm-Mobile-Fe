import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { getTransactionByID } from "../../redux/slices/transactionSlice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const PaymentScreen = ({ navigation, route }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const { payment_link, transactionID } = route.params;
  const dispatch = useDispatch();

  if (!payment_link || !transactionID) {
    return <ActivityIndicatorComponent />;
  }

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft % 5 === 0) {
      dispatch(getTransactionByID({ transactionID })).then((res) => {
        console.log(res.payload.status);
        if (res.payload.status === "succeed") {
          navigation.navigate("ThankYouScreen", {
            msg: "Thanh toán thành công, chúc bạn canh tác thuận lợi",
          });
        }
      });
    }

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      Toast.show({
        type: "info",
        text1: "Hãy thanh toán sớm nhé !!!",
      });
      navigation.navigate("HomeScreen");
    }
  }, [timeLeft]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <Appbar.Header style={{ backgroundColor: "#76B947" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thanh Toán" color="white" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.qrContainer}>
          <Text style={styles.title}>QUÉT ĐỂ THANH TOÁN</Text>
          <Image
            source={{
              uri: payment_link,
            }}
            style={styles.qrImage}
          />
          {/* <Text style={styles.accountText}>Tên chủ TK: AgriFarm</Text>
        <Text style={styles.accountText}>
          STK: <Text style={styles.accountHighlight}>4940116348275</Text>
        </Text>
        <Text style={styles.accountText}>Ngân hàng TMCP Ngoại thương VN</Text> */}
        </View>
      </ScrollView>

      {/* <Text style={styles.countdown}>
        Thời gian còn lại: {formatTime(timeLeft)}
      </Text> */}
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
    width: 300,
    height: 500,
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
