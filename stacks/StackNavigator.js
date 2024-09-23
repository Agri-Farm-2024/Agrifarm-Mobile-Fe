// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screen components
import BottomTabNavigator from "../tabs/BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import DiaryView from "../screens/DiaryScreen/DiaryView";
import DiaryDetailView from "../screens/DiaryScreen/DiaryDetailView";
import LandLeaseScreen from "../screens/LandLeaseScreen/LandLeaseScreen";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#7FB640",
      },
      headerTintColor: "#fff",
      headerTitleAlign: "center",
    }}
    initialRouteName="BottomTabs"
  >
    <Stack.Screen
      name="Login"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={LoginScreen}
    />
    <Stack.Screen
      name="BottomTabs"
      options={{
        headerShown: false,
      }}
      component={BottomTabNavigator}
    />
    <Stack.Screen
      name="DiaryView"
      options={{
        swipeEnabled: false,
        headerTitle: "Nhật ký canh tác",
      }}
      component={DiaryView}
    />
    <Stack.Screen
      name="DiaryDetailView"
      options={{
        swipeEnabled: false,
        headerTitle: "Chi tiết nhật ký",
      }}
      component={DiaryDetailView}
    />
    <Stack.Screen
      name="LandLeaseScreen"
      options={{
        headerTitle: "Yêu cầu thuê đất",
        headerTitleAlign: "center",
      }}
      component={LandLeaseScreen}
    />
  </Stack.Navigator>
);

export default StackNavigator;
