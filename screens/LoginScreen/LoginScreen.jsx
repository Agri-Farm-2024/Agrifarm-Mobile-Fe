import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { login } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    username: "landrenter@gmail.com",
    password: "123",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [invalidInput, setInvalidInput] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleLogin = () => {
    console.log("handleLogin");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (loginForm.username === "" || loginForm.password === "") {
      setErrorMessage("Vui lòng không bỏ trống!");
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại!",
        text2: "Vui lòng không bỏ trống!",
      });
      setInvalidInput(true);
      return;
    }

    if (!emailRegex.test(loginForm.username)) {
      setErrorMessage("Email không hợp lệ!");
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại!",
        text2: "Email không hợp lệ❗️",
      });
      setInvalidInput(true);
      return;
    }

    // Clear error and invalid input states
    setInvalidInput(false);
    setErrorMessage(null);

    // Show loading toast
    Toast.show({
      type: "info",
      text1: "Đang đăng nhập...",
      text2: "Vui lòng chờ trong giây lát",
      visibilityTime: 0, // Keeps the toast visible until manually hidden
      autoHide: false,
    });

    // Dispatch the login action
    dispatch(login({ email: loginForm.username, password: loginForm.password }))
      .unwrap()
      .then((res) => {
        console.log(res);
        Toast.hide();
        if (res.statusCode === 201 && res.metadata.user.role >= 3) {
          Toast.show({
            type: "success",
            text1: "Đăng nhập thành công!",
          });

          if (res.metadata.user.role === 3) {
            navigation.navigate("BottomTabNavigatorExpert");
          } else if (res.metadata.user.role === 4) {
            navigation.navigate("BottomTabs");
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Đăng nhập thất bại!",
            text2: "Không có tài khoản này",
          });
        }
      })
      .catch((error) => {
        Toast.hide(); // Hide the loading toast
        console.log(error.message);
        if (error.message === "Invalid password") {
          Toast.show({
            type: "error",
            text1: "Đăng nhập thất bại!",
            text2: "Sai email hoặc mật khẩu !!!",
          });
          return;
        }

        if (error.message === "User is not active") {
          Toast.show({
            type: "error",
            text1: "Đăng nhập thất bại!",
            text2: "Tài khoản chưa được kích hoạt",
          });
          return;
        }
      });
  };

  // FAKE DATA TO LOGIN
  // const handleLogin = () => {
  //   if (loginForm.username === "expert") {
  //     navigation.navigate("BottomTabNavigatorExpert");
  //   } else {
  //     navigation.navigate("BottomTabs");
  //   }
  // };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("./../../assets/agrifarm-logo.png")}
          ></Image>
          <Text style={styles.title}>Chào mừng quay lại!</Text>
          <Text style={styles.secondaryText}>
            Để đăng nhập hãy nhập thông tin bên dưới
          </Text>
          <Text style={styles.label}>Tên đăng nhập:</Text>
          <TextInput
            textColor="black"
            style={[
              styles.input,
              { borderColor: invalidInput ? "#4878D9" : "red" },
            ]}
            mode="outlined"
            placeholder="Tên đăng nhập"
            activeOutlineColor="#7FB640"
            onChangeText={(text) => {
              setLoginForm((prevState) => ({ ...prevState, username: text }));
              setInvalidInput(false);
            }}
            outlineColor={errorMessage && "red"}
            value={loginForm.username}
          />
          <Text style={styles.label}>Mật khẩu:</Text>
          <TextInput
            textColor="black"
            mode="outlined"
            activeOutlineColor="#7FB640"
            style={[
              styles.input,
              { borderColor: invalidInput ? "#4878D9" : "red" },
            ]}
            placeholder="Mật khẩu"
            onChangeText={(text) => {
              setLoginForm((prevState) => ({ ...prevState, password: text }));
              setInvalidInput(false);
            }}
            right={
              <TextInput.Icon
                color="#7FB640"
                forceTextInputFocus={false}
                icon={isHidePassword ? "eye-off" : "eye"}
                onPress={() => setIsHidePassword(!isHidePassword)}
              />
            }
            value={loginForm.password}
            secureTextEntry={isHidePassword}
            outlineColor={errorMessage && "red"}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#7FB640",
              marginBottom: 10,
              paddingVertical: 5,
            }}
            mode="outlined"
            onPress={() => setIsOpenModal(true)}
          >
            Quên mật khẩu?
          </Text>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={handleLogin}
          >
            Đăng nhập
          </Button>

          <ForgotPasswordModal
            visible={isOpenModal}
            onDismiss={() => setIsOpenModal(false)}
            onClose={() => setIsOpenModal(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    height: 150,
    width: 150,
    marginVertical: 50,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7FB640",
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  secondaryText: {
    color: "#797979",
    marginBottom: 30,
    fontSize: 16,
  },
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
});

export default LoginScreen;
