// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screen components
import BottomTabNavigator from "../tabs/BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import DiaryView from "../screens/DiaryScreen/DiaryView";
import DiaryDetailView from "../screens/DiaryScreen/DiaryDetailView";
import DiaryActionScreen from "../screens/DiaryScreen/DiaryActionScreen";
import CreateDiaryScreen from "../screens/DiaryScreen/CreateDiaryScreen";
import WriteDiaryScreen from "../screens/DiaryScreen/WriteDiaryScreen";
import UpdateDiaryScreen from "../screens/DiaryScreen/UpdateDiaryScreen";
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
      name="DiaryActionScreen"
      options={{
        swipeEnabled: false,
        headerTitle: "Ghi nhật ký",
        headerTitleStyle: {
          paddingHorizontal: 10,
        },
      }}
      component={DiaryActionScreen}
    />
    <Stack.Screen
      name="CreateDiaryScreen"
      options={{
        swipeEnabled: false,
        headerTitle: "Tạo nhật ký",
        headerTitleStyle: {
          paddingHorizontal: 10,
        },
      }}
      component={CreateDiaryScreen}
    />
    <Stack.Screen
      name="WriteDiaryScreen"
      options={{
        swipeEnabled: false,
        headerTitle: "Ghi nhật ký",
        headerTitleStyle: {
          paddingHorizontal: 10,
        },
      }}
      component={WriteDiaryScreen}
    />
    <Stack.Screen
      name="UpdateDiaryScreen"
      options={{
        swipeEnabled: false,
        headerTitle: "Cập nhật nhật ký",
        headerTitleStyle: {
          paddingHorizontal: 10,
        },
      }}
      component={UpdateDiaryScreen}
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
