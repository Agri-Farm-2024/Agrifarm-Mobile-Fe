import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ChatListItem from "./ChatListItem";
import { useDispatch, useSelector } from "react-redux";
//   import {
//     getListMessage,
//     searchListMessage,
//   } from "../../redux/slices/messageSlice";
//   import { getListMessageSelector } from "../../redux/selectors";
//   import { io } from "socket.io-client";
//   import socket from "../../services/socket";
import { useIsFocused } from "@react-navigation/native";
import { getChatList } from "../../redux/slices/chatSlice";
import socket from "../../services/socket";
import EmptyComponent from "../../components/EmptyComponent/EmptyComponent";

// const chatList = [
//   {
//     group_message_id: "MSG001",
//     group_message_thumnail:
//       "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
//     group_message_name: "Tieu Bao Bao",
//     is_seen: true,
//     last_active_time: "2024-06-09T03:11:56.622Z",
//     last_message: "Ra sân đá bóng lẹ nào",
//   },
//   {
//     group_message_id: "MSG002",
//     group_message_thumnail:
//       "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
//     group_message_name: "Le Ninh",
//     is_seen: false,
//     last_active_time: "2024-06-09T03:11:56.622Z",
//     last_message: "Tôi yêu đá bóng còn bạn thì sao?? Liên hệ tôi nhá",
//   },
// ];

export default function ChatListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { chatList, loading, error } = useSelector((state) => state.chatSlice);
  const { userInfo } = useSelector((state) => state.userSlice);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getChatList());
      socket.emit("online-user", userInfo.user_id);
    }
  }, [isFocused]);

  // useEffect(() => {
  //   if (socket) {
  //     const handleMessageReceive = (msg) => {
  //       dispatch(getListMessage());
  //     };

  //     socket.on("receive-message", handleMessageReceive);

  //     // Cleanup function to remove the event listener
  //     return () => {
  //       socket.off("receive-message", handleMessageReceive);
  //     };
  //   }
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.chatBody}>
        <ScrollView>
          {chatList && chatList?.length != 0 ? (
            chatList?.map((chatItem, index) => (
              <ChatListItem
                key={chatItem?.channel_id}
                seen={false}
                chatItem={chatItem}
                navigation={navigation}
              />
            ))
          ) : (
            // <Text style={styles.chatEmpty}>Không có đoạn chat nào</Text>
            <EmptyComponent message="Không có đoạn chat nào" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    backgroundColor: "#1646A9",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 70,
  },
  titleHeader: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 30,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  searchInput: {
    borderRadius: 5,
    backgroundColor: "white",
  },
  textInput: {
    fontSize: 16,
  },
  chatBody: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    // borderRadius: 40,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  chatEmpty: {
    color: "#707070",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
