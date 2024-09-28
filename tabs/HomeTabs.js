import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import HelpScreen from "../screens/HelpScreen/HelpScreen";
import RequestMaterialsScreen from "../screens/RequestMaterialsScreen/RequestMaterialsScreen";
import DiaryScreen from "../screens/DiaryScreen/DiaryScreen";
import RequestListScreen from "../screens/RequestListScreen/RequestListScreen";
export default function HomeTabs() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#7FB640",
          },
          headerTintColor: "#fff",
        }}
        options={{
          headerShown: false,
          headerLeft: () => null, // This will remove the left button
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerLeft: () => null, // This will remove the left button
          }}
        />
        <Stack.Screen
          name="HelpScreen"
          component={HelpScreen}
          options={{
            headerTitle: "Hỗ trợ",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="RequestMaterialsScreen"
          component={RequestMaterialsScreen}
          options={{
            headerTitle: "Vật tư",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="DiaryScreen"
          component={DiaryScreen}
          options={{
            headerTitle: "Nhật ký canh tác",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="RequestListScreen"
          component={RequestListScreen}
          options={{
            headerTitle: "Danh sách yêu cầu",
            headerTitleAlign: "center",
        }}
        />
      </Stack.Navigator>
    </>
  );
}
