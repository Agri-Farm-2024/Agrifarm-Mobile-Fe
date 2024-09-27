import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";

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
  const [notifications, setNotifications] = useState(initialNotifications);

  // Hàm xử lý khi người dùng nhấn vào nút "Đã đọc thông báo"
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  };

  const renderItem = ({ item }) => (
    <View
      style={[styles.notificationItem, item.isRead && styles.readNotification]}
    >
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDesc}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh hành động */}
      <Appbar.Header style={styles.actionBar}>
        <Appbar.Content title="Thông báo" color="white" />
      </Appbar.Header>

      {/* Danh sách thông báo */}
      <Button
        mode="outlined"
        style={styles.markAsReadButton}
        onPress={handleMarkAllAsRead}
        textColor="#7fb640"
      >
        Đã đọc thông báo
      </Button>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    width: 200,
  },
});
