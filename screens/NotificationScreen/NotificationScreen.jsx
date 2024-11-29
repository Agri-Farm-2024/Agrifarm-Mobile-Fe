import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markToSeenNoti,
} from "../../redux/slices/notificationSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

// Dữ liệu mẫu cho thông báo với tiêu đề, mô tả và biểu tượng
const initialNotifications = [
  {
    id: "1",
    title: "Đơn hàng đã được giao",
    description: "Đơn hàng của bạn #1234 đã được vận chuyển!",
    icon: "https://img.icons8.com/color/48/000000/shipped.png",
    isRead: false,
  },
  {
    id: "3",
    title: "Gia hạn đăng ký",
    description: "Nhắc nhở: Đăng ký của bạn sẽ hết hạn trong 3 ngày.",
    icon: "https://img.icons8.com/color/48/000000/calendar.png",
    isRead: false,
  },
  // Thêm nhiều thông báo ở đây
];

export default function NotificationScreen() {
  const notifications = useSelector(
    (state) => state.notificationSlice?.notifications
  );
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      console.log(notifications);
      dispatch(fetchNotifications({ pageSize: 1000, pageIndex: 1 }));
    }, [dispatch])
  );
  console.log(notifications);

  const iconMapping = {
    task: "clipboard-check-outline",
    booking_land: "map-marker-radius-outline",
    request: "file-document-outline",
    material: "package-variant-closed",
    dinary: "food-variant",
    process: "cogs",
    channel: "television-guide",
    report: "chart-bar",
    extend: "calendar-plus",
    transaction: "currency-usd",
  };

  const renderItem = ({ item }) => {
    const iconName = iconMapping[item.type] || "alert-circle-outline";
    return (
      <View
        style={[
          styles.notificationItem,
          item.is_seen && styles.readNotification,
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={30}
          color="white"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDesc}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Thanh hành động */}
      <Appbar.Header style={styles.actionBar}>
        <Appbar.Content title="Thông báo" color="white" />
      </Appbar.Header>

      {/* Danh sách thông báo */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          mode="outlined"
          style={styles.markAsReadButton}
          onPress={() => {
            dispatch(markToSeenNoti()).then((res) => {
              dispatch(fetchNotifications({ pageSize: 1000, pageIndex: 1 }));
            });
          }}
          textColor="#7fb640"
        >
          Đã đọc
        </Button>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.notification_id}
      />

      {/* Nút "Đã đọc thông báo" */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  actionBar: {
    backgroundColor: "#7fb640", // Màu cho thanh hành động dùng màu chính
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#7fb640", // Màu chính cho nền của thông báo
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  readNotification: {
    opacity: 0.6, // Thông báo đã đọc sẽ hiển thị mờ hơn
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Màu văn bản cho tiêu đề
  },
  notificationDesc: {
    fontSize: 14,
    color: "#fff", // Màu văn bản cho mô tả
  },
  markAsReadButton: {
    margin: 16,
    borderColor: "#7fb640",
    width: 100,
    borderRadius: 10,
  },
});
