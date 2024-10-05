import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import HelpScreen from "../screens/HelpScreen/HelpScreen";
import RequestMaterialsScreen from "../screens/RequestMaterialsScreen/RequestMaterialsScreen";
import DiaryScreen from "../screens/DiaryScreen/DiaryScreen";
import RequestListScreen from "../screens/RequestListScreen/RequestListScreen";
import HomeExpertScreen from "../screens/HomeExpertScreen/HomeExpertScreen";
import SpecificProcessListScreen from "../screens/SpecificProcessListScreen/SpecificProcessListScreen";
export default function HomeTabsExpert() {
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
          name="HomeExpertScreen"
          component={HomeExpertScreen}
          options={{
            headerShown: false,
            headerLeft: () => null, // This will remove the left button
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
          name="SpecificProcessListScreen"
          component={SpecificProcessListScreen}
          options={{
            headerTitle: "Quy trình canh tác",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
