import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationComponent = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Register for push notifications
        let token = await registerForPushNotificationsAsync();
        if (token) {
          setExpoPushToken(token);
        }

        // Fetch notification channels for Android
        if (Platform.OS === "android") {
          let value = await Notifications.getNotificationChannelsAsync();
          setChannels(value ?? []);
        }

        // Add notification listeners
        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
          });
        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
          });
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    };

    // Call setup function
    setupNotifications();

    // Clean up function
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification(message) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "AGRIFARM 📬",
          body: message,
          data: { message },
          sound: true,
        },
        trigger: { seconds: 2 },
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  }

  async function registerForPushNotificationsAsync() {
    try {
      let token;

      // Set notification channel for Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // Check device and permissions
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Failed to get push token for push notification!");
          return;
        }
        // Retrieve push token
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log("Expo Push Token:", token);
      } else {
        Alert.alert("Dùng máy thật để nhận Notifications");
      }

      return token;
    } catch (error) {
      console.error("Error registering for push notifications:", error);
    }
  }

  // Function to trigger notification with a specific message
  async function triggerNotification(message) {
    try {
      await schedulePushNotification(message);
    } catch (error) {
      console.error("Error triggering notification:", error);
    }
  }

  return {
    expoPushToken,
    channels,
    notification,
    triggerNotification,
  };
};

export default NotificationComponent;
