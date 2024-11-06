import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { convertHttpToHttps } from "../../utils";
// import {
//   getMessageDetail,
//   sendMessageByUser,
// } from "../../redux/slices/messageSlice";
// import socket from "../../services/socket";

const chatDetail = {
  group_message_detail: {
    group_message_thumnail:
      "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
  },
  messages: [
    {
      message_id: "MSG001",
      is_me: false,
      content: "Chào bạn mình là kỹ thuật viên sẽ hỗ trợ cho bạn",
    },
    {
      message_id: "MSG002",
      is_me: false,
      content: "Không biết bạn đang gặp vấn đề gì cần hỗ trợ?",
    },
    {
      message_id: "MSG003",
      is_me: true,
      content: "Chào bạn, cây của mình đang bị loại côn trùng lạ phá hoại.",
    },
  ],
};

export default function ChatDetailScreen({ navigation }) {
  //   const { chatDetail, group_message_id, loading, error } = useSelector(
  //     (state) => state.messageSlice
  //   );
  //   const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  //   const { userInfo } = useSelector((state) => state.userSlice);

  const scrollViewRef = useRef(null);

  //variable use for set timeout
  let timeout;

  useEffect(() => {
    scrollToBottom();
  }, [chatDetail]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      //   dispatch(
      //     sendMessageByUser({
      //       group_message_id: group_message_id,
      //       content: message,
      //     })
      //   ).then((res) => {
      //     socket.emit("send-message", {
      //       group_message_id: group_message_id,
      //       content: message,
      //       user_id: userInfo.id,
      //       message: res,
      //     });
      //     setMessage("");
      //     console.log("send-message ", group_message_id);
      //     dispatch(getMessageDetail(group_message_id));
      //     Keyboard.dismiss();
      //   });
    }
  };

  //   useEffect(() => {
  //     if (socket) {
  //       const handleMessageReceive = (msg) => {
  //         console.log("receive-message ", group_message_id);
  //         dispatch(getMessageDetail(group_message_id));
  //       };

  //       socket.on("receive-message", handleMessageReceive);

  //       // Cleanup function to remove the event listener
  //       return () => {
  //         socket.off("receive-message", handleMessageReceive);
  //       };
  //     }
  //   }, [group_message_id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.btnBack}>Quay về</Text>
          </TouchableOpacity>
          <View style={styles.avatarWrap}>
            <Avatar.Image
              size={60}
              source={{
                uri: convertHttpToHttps(
                  chatDetail.group_message_detail.group_message_thumnail
                ),
              }}
              style={{ marginRight: 10 }}
            />
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatBody}
          contentContainerStyle={{ paddingTop: 20 }}
          onLayout={scrollToBottom}
        >
          {chatDetail.messages.slice().map((msg, index) => (
            <View
              key={msg.message_id}
              style={
                msg.is_me === true
                  ? [styles.message, styles.myMessage]
                  : [styles.message, styles.guestMessage]
              }
            >
              <Text
                style={
                  msg.is_me === true ? { color: "white" } : { color: "black" }
                }
              >
                {msg.content}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.inputContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Gõ tin nhắn ở đây..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />

          <FAB
            icon="send"
            size="small"
            style={styles.btnSend}
            onPress={() => {
              if (timeout) {
                clearTimeout(timeout);
              }
              timeout = setTimeout(() => {
                sendMessage();
              }, 300);
            }}
            color="white"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    backgroundColor: "#7FB640",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 60,
  },
  btnBack: {
    fontSize: 14,
    color: "#ffff",
    fontWeight: "600",
  },
  avatarWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  userActive: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
  },
  chatBody: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    // borderRadius: 40,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    paddingHorizontal: 10,
    marginTop: -40,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#7FB640",
    alignSelf: "flex-end",
  },
  guestMessage: {
    backgroundColor: "#F6F6F6",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btnSend: {
    backgroundColor: "#7FB640",
    borderRadius: 50,
  },
});
