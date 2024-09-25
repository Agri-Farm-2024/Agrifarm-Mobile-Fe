// BottomTabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import defaultAvatar from "../assets/default-avatar.jpg";
import HomeTabs from "./HomeTabs";
import ProfileTabs from "./ProfileTabs";
import ChatTabs from "./ChatTabs";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#7FB640",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name={"home-outline"} color={color} size={size + 5} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatTabs}
        options={{
          headerShown: false,
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={"chat-processing-outline"}
              color={color}
              size={size + 5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTabs}
        options={{
          headerShown: false,
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color, size }) => (
            <Icon name={"account-outline"} color={color} size={size + 5} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
