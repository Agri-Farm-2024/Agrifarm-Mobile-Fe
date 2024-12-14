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
import { formatTimeViewLand } from "../../utils";

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
      <View style={[styles.notificationItem]}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={30}
            color="white"
            style={styles.icon}
          />
          {!item.is_seen && <View style={styles.redDot} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDesc}>{item.content}</Text>
          <Text style={styles.notificationTime}>
            {formatTimeViewLand(item.created_at)}
          </Text>
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
    padding: 16,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "white",
  },
  readNotification: {
    // backgroundColor: "white",
    opacity: 0.6,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
    color: "#7fb640",
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7fb640",
  },
  notificationDesc: {
    fontSize: 14,
    color: "#7d8185",
  },
  notificationTime: {
    fontSize: 12,
    color: "#babdc2",
  },

  markAsReadButton: {
    margin: 16,
    borderColor: "#7fb640",
    width: 100,
    borderRadius: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
    position: "relative",
  },
  redDot: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "white", // Optional for a cleaner look
  },
});
