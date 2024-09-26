import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { convertHttpToHttps, convertTo12HourFormat } from "../../utils";
import { useDispatch } from "react-redux";
// import messageSlice, {
//   getMessageDetail,
// } from "../../redux/slices/messageSlice";

export default function ChatListItem({ seen, navigation, chatItem }) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        // dispatch(getMessageDetail(chatItem.group_message_id)).then((res) => {
        navigation.navigate("ChatDetailScreen");
        //   dispatch(
        //     messageSlice.actions.setGroupMessageID(chatItem.group_message_id)
        //   );
        // });
      }}
    >
      <View style={styles.chatItem}>
        <Avatar.Image
          size={45}
          source={{
            uri: convertHttpToHttps(chatItem.group_message_thumnail),
          }}
          style={{ marginRight: 10 }}
        />
        <View>
          <View style={styles.chatTop}>
            <Text style={styles.userName}>{chatItem.group_message_name}</Text>
            <Text
              style={
                chatItem.is_seen
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
              {convertTo12HourFormat(chatItem.last_active_time)}
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
            {chatItem.last_message}
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
