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
import { convertHttpToHttps, formatDate } from "../../utils";
import socket from "../../services/socket";
import { getChatDetail, sendMessageByUser } from "../../redux/slices/chatSlice";
import { Toast } from "react-native-toast-message/lib/src/Toast";

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

export default function ChatDetailScreen({ navigation, route }) {
  const { channelId, isExpired, expiredAt } = route.params;
  const { chatDetail, loading, error } = useSelector(
    (state) => state.chatSlice
  );

  console.log(
    "ChatDetail ne",
    JSON.stringify(chatDetail),
    isExpired,
    expiredAt
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(null);

  const { userInfo } = useSelector((state) => state.userSlice);

  const scrollViewRef = useRef(null);

  //variable use for set timeout
  let timeout;

  useEffect(() => {
    if (chatDetail) {
      setConversation(chatDetail);
      scrollToBottom();
    }
  }, [chatDetail]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    try {
      if (message.trim() !== "") {
        const formData = {
          message_to_id: channelId,
          content: message,
          message_type: "text",
        };
        dispatch(sendMessageByUser(formData)).then((response) => {
          Keyboard.dismiss();
          console.log("Response send message: " + JSON.stringify(response));
          if (response?.payload?.statusCode != 201) {
            Toast.show({
              type: "error",
              text1: "Gửi tin nhắn thất bại!",
            });
          }
          if (response?.payload?.statusCode == 201) {
            setMessage("");
          }
        });
      }
    } catch (error) {
      console.log("Error sending message: ", JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (socket) {
      console.log("Socket listening");
      const handleMessageReceive = (msg) => {
        console.log("message receive", JSON.stringify(msg));
        console.log(
          "channel_message",
          msg?.message?.message_to_id == channelId,
          msg?.message?.message_to_id,
          channelId,
          conversation
        );
        if (msg?.message?.message_to_id === channelId) {
          setConversation((prevConversation) => {
            console.log("prev conversation", JSON.stringify(prevConversation));
            const updatedConversation = [
              ...(prevConversation || []),
              { ...msg.message },
            ];
            return updatedConversation;
          });
          scrollToBottom();
        }
      };

      socket.on("message", handleMessageReceive);

      // Cleanup function to remove the event listener
      return () => {
        socket.off("message", handleMessageReceive);
      };
    }
  }, [channelId]);

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
                uri:
                  userInfo?.role != 3
                    ? "https://cdn.icon-icons.com/icons2/1465/PNG/512/138manfarmer2_100718.png"
                    : "https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg",
              }}
              style={{ marginRight: 10, backgroundColor: "white" }}
            />
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatBody}
          contentContainerStyle={{ paddingTop: 20 }}
          onLayout={scrollToBottom}
        >
          {conversation &&
            conversation.length > 0 &&
            conversation.slice().map((msg, index) => (
              <View
                key={channelId + index}
                style={
                  msg.message_from_id == userInfo?.user_id
                    ? [styles.message, styles.myMessage]
                    : [styles.message, styles.guestMessage]
                }
              >
                <Text
                  style={
                    msg.message_from_id == userInfo?.user_id
                      ? { color: "white" }
                      : { color: "black" }
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
        {isExpired ? (
          <Text style={styles.expiredMessage}>
            Đoạn chat sẽ được xoá vào ngày{" "}
            {expiredAt ? formatDate(expiredAt, 0) : ""}
          </Text>
        ) : (
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
        )}
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
  expiredMessage: {
    width: "100%",
    padding: 20,
    textAlign: "center",
    color: "#707070",
    fontWeight: "bold",
    fontSize: 18,
  },
});
