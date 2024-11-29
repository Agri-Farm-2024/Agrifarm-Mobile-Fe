import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import {
  convertHttpToHttps,
  convertTo12HourFormat,
  formatDate,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getChatDetail } from "../../redux/slices/chatSlice";
// import messageSlice, {
//   getMessageDetail,
// } from "../../redux/slices/messageSlice";

export default function ChatListItem({ seen, navigation, chatItem }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSlice);
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("chatItem", JSON.stringify(chatItem));
        dispatch(getChatDetail(chatItem?.channel_id)).then((res) => {
          navigation.navigate("ChatDetailScreen", {
            channelId: chatItem?.channel_id,
          });
        });
      }}
    >
      <View style={styles.chatItem}>
        <Avatar.Image
          size={45}
          source={{
            uri: "https://cdn.icon-icons.com/icons2/1465/PNG/512/138manfarmer2_100718.png",
          }}
          style={{ marginRight: 10 }}
        />
        <View>
          <View style={styles.chatTop}>
            <Text style={styles.userName}>
              Hỗ trợ kỹ thuật {formatDate(chatItem?.created_at, 2)}
            </Text>
            <Text
              style={
                chatItem?.is_seen
                  ? [
                      styles.textContent,
                      {
                        width: "25%",
                        textAlign: "right",
                      },
                    ]
                  : [
                      styles.textContent,
                      styles.seen,
                      { width: "25%", textAlign: "right" },
                    ]
              }
            >
              {convertTo12HourFormat(chatItem?.newest_message?.created_at)}
            </Text>
          </View>
          <Text
            style={
              chatItem.is_seen
                ? styles.textContent
                : [styles.textContent, styles.seen]
            }
            numberOfLines={1}
          >
            {chatItem?.newest_message?.message_from_id == userInfo?.user_id
              ? "Bạn"
              : chatItem?.newest_message?.message_from?.full_name || ""}
            : {chatItem?.newest_message?.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#F3F3F3",
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 20,
  },
  chatTop: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    width: "75%",
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  textContent: {
    color: "#707070",
    fontSize: 12,
    maxWidth: 250,
    overflow: "hidden",
  },
  seen: {
    color: "black",
    fontWeight: "500",
  },
});
