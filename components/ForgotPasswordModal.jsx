import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ForgotPasswordModal = ({ visible, onClose, onDismiss }) => {
  const [emailReset, setEmailReset] = useState("");
  const [invalidInput, setInvalidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [counter, setCounter] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let timer;

    if (isButtonDisabled && counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0) {
      setIsButtonDisabled(false); // Re-enable button after countdown
    }

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [counter, isButtonDisabled]);

  useEffect(() => {
    if (visible) {
      setIsButtonDisabled(false);
    }
  }, [visible]);

  const handleSendEmail = () => {
    console.log("handleLogin");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      if (emailReset === "") {
        setErrorMessage("Vui lòng không bỏ trống!");
        setInvalidInput(true);
        return;
      }
      if (!emailRegex.test(emailReset)) {
        setErrorMessage("Vui lòng không bỏ trống!");
        setInvalidInput(true);
        return;
      }
      setErrorMessage(null);
      setInvalidInput(false);
      setIsButtonDisabled(true); // Disable the button
      setCounter(60); // Reset the counter to 60 seconds
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Portal>
      <Modal
        animationType="slide"
        visible={visible}
        onDismiss={onDismiss}
        onClose={onClose}
        style={{ height: 500, alignSelf: "center" }}
        contentContainerStyle={styles.modalContainer}
      >
        <FontAwesome
          style={{ alignSelf: "flex-end", marginBottom: 20 }}
          name="close"
          size={28}
          color="#7FB640"
          onPress={() => onClose()}
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
          onChangeText={(text) => {
            setEmailReset(text);
          }}
          outlineColor={errorMessage && "red"}
          value={emailReset}
        />
        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleSendEmail}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? `Đợi ${counter}s` : "Gửi"}
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
