import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import {
  cancelTransaction,
  getTransactionByID,
} from "../../redux/slices/transactionSlice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { clearCart } from "../../redux/slices/cartSlice";

const PaymentServiceScreen = ({ navigation, route }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const { paymentInfo } = route.params;
  const dispatch = useDispatch();
  const { payment_link, transactionID } = paymentInfo;
  console.log("paymentInfo", paymentInfo);

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
          if (paymentInfo?.isCart) {
            dispatch(clearCart());
          }
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
      handleCancelTransaction();
    }
  }, [timeLeft]);

  const handleCancelTransaction = () => {
    console.log("Cancelling transaction...");
    dispatch(cancelTransaction(paymentInfo.transactionID)).then((response) => {
      console.log("cancel transaction response", response);
      Toast.show({
        type: "error",
        text1: "Giao dịch đã huỷ!",
      });
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <Appbar.Header style={{ backgroundColor: "#76B947" }}>
        <Appbar.BackAction
          color="white"
          onPress={() => setIsOpenConfirm(true)}
        />
        <Appbar.Content title="Thanh Toán" color="white" />
      </Appbar.Header>

      <View style={styles.qrContainer}>
        <Text style={styles.title}>QUÉT ĐỂ THANH TOÁN</Text>
        <Image
          source={{
            uri: payment_link,
          }} // Replace with actual URL of the QR code image
          style={styles.qrImage}
        />
        {/* <Text style={styles.accountText}>Tên chủ TK: AgriFarm</Text>
        <Text style={styles.accountText}>
          STK: <Text style={styles.accountHighlight}>4940116348275</Text>
        </Text>
        <Text style={styles.accountText}>Ngân hàng TMCP Ngoại thương VN</Text> */}
      </View>

      <Text style={styles.countdown}>
        Thời gian còn lại: {formatTime(timeLeft)}
      </Text>

      <ConfirmationModal
        visible={isOpenConfirm}
        onDismiss={() => setIsOpenConfirm(false)}
        onConfirm={() => {
          setIsOpenConfirm(false);
          handleCancelTransaction();
        }}
        title={"Huỷ giao dịch"}
        content={"Bạn muốn huỷ giao dịch này?"}
      />
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

export default PaymentServiceScreen;
