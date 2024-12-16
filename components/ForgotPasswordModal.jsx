import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { resetPassword, sendOtp, verifyOtp } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const ForgotPasswordModal = ({ visible, onClose, onDismiss }) => {
  const [emailReset, setEmailReset] = useState("ninhpdse161296@fpt.edu.vn");
  const [invalidInput, setInvalidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false); // Control OTP modal visibility
  const [otp, setOtp] = useState(""); // Store OTP

  const handleCloseReset = () => {
    setEmailReset("");
    setOtp("");
    setErrorMessage(null);
    onClose();
  };

  const dispatch = useDispatch();
  const { otpLoading, otpError, verifyLoading, verifyError } = useSelector(
    (state) => state.userSlice
  );

  const handleSendEmail = () => {
    console.log("handleSendEmail");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      if (emailReset === "") {
        setErrorMessage("Vui lòng không bỏ trống!");
        setInvalidInput(true);
        return;
      }
      if (!emailRegex.test(emailReset)) {
        setErrorMessage("Vui lòng nhập email hợp lệ!");
        setInvalidInput(true);
        return;
      }
      setErrorMessage(null);
      setInvalidInput(false);
      console.log("email: " + emailReset);

      dispatch(sendOtp(emailReset))
        .then((data) => {
          console.log("OTP sent successfully:", data);
          setShowOtpModal(true);
        })
        .catch((error) => {
          console.error("Error sending OTP:", error.message);
          toast.error("Có lỗi");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = () => {
    // Handle OTP verification logic here
    console.log("OTP Submitted: ", otp);
    setErrorMessage(null);
    dispatch(verifyOtp({ email: emailReset, otp: Number(otp) }))
      .then((data) => {
        console.log("data:", data.payload.message);
        if (data.payload == "OTP is invalid") {
          setErrorMessage("Sai OTP , nhập lại nhé!");
          return;
        }

        if (data.payload.message == "OTP is invalid") {
          setErrorMessage("Sai OTP , nhập lại nhé!");
          return;
        }

        if (data.payload.message == "OTP is verified") {
          setErrorMessage("Đã xác thực!");
          return;
        }

        dispatch(resetPassword({ email: emailReset })).then((res) => {
          setShowOtpModal(false);
          handleCloseReset();
          Toast.show({
            type: "success",
            text1: "Phục hồi mật khẩu, kiểm tra gmail nhé !!!",
          });
        });
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <Portal>
      {/* Forgot Password Modal */}
      <Modal
        animationType="slide"
        visible={visible}
        onDismiss={onDismiss}
        onClose={handleCloseReset}
        style={{ height: 450, alignSelf: "center" }}
        contentContainerStyle={styles.modalContainer}
        dismissable={false}
      >
        <FontAwesome
          style={{ alignSelf: "flex-end", marginBottom: 20 }}
          name="close"
          size={28}
          color="#7FB640"
          onPress={() => handleCloseReset()}
        />
        <Text style={styles.label}>Nhập email để reset password: </Text>
        <TextInput
          textColor="black"
          style={[
            styles.input,
            { borderColor: invalidInput ? "#4878D9" : "red" },
          ]}
          mode="outlined"
          placeholder="Email"
          activeOutlineColor="#7FB640"
          onChangeText={(text) => setEmailReset(text)}
          outlineColor={errorMessage && "red"}
          value={emailReset}
        />
        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleSendEmail}
        >
          {otpLoading ? " Đang gửi" : "Gửi"}
        </Button>
      </Modal>

      {/* OTP Modal */}
      <Modal
        animationType="slide"
        visible={showOtpModal}
        onDismiss={() => {
          setShowOtpModal(false);
          setOtp("");
          setErrorMessage(null);
        }}
        onClose={() => {
          setShowOtpModal(false);
          setOtp("");
          setErrorMessage(null);
        }}
        style={{ height: 500, alignSelf: "center" }}
        contentContainerStyle={styles.modalContainer}
        dismissable={false}
      >
        <FontAwesome
          style={{ alignSelf: "flex-end", marginBottom: 20 }}
          name="close"
          size={28}
          color="#7FB640"
          onPress={() => {
            setShowOtpModal(false);
            setOtp("");
            setErrorMessage(null);
          }}
        />
        <Text style={styles.label}>Nhập mã OTP đã gửi tới email của bạn: </Text>
        <TextInput
          textColor="black"
          style={styles.input}
          mode="outlined"
          placeholder="Mã OTP"
          activeOutlineColor="#7FB640"
          onChangeText={(text) => setOtp(text)}
          value={otp}
          maxLength={6}
          keyboardType="numeric"
        />
        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleOtpSubmit}
        >
          {verifyLoading ? "Đang xác nhận" : " Xác nhận OTP"}
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    lineHeight: 30,
    backgroundColor: "white",
    marginVertical: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#7FB640",
    width: "100%",
    borderRadius: 7,
    paddingVertical: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 5,
    marginHorizontal: "5%",
    marginTop: "20%",
    marginBottom: "20%",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ForgotPasswordModal;
