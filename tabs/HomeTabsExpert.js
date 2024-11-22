import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RequestMaterialsScreen from "../screens/RequestMaterialsScreen/RequestMaterialsScreen";
import HomeExpertScreen from "../screens/HomeExpertScreen/HomeExpertScreen";
import SpecificProcessListScreen from "../screens/SpecificProcessListScreen/SpecificProcessListScreen";
import MyTaskScreen from "../screens/MyTaskScreen/MyTaskScreen";
import StandardProcessScreen from "../screens/StandardProcessScreen/StandardProcessScreen";
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
          name="MyTaskScreen"
          component={MyTaskScreen}
          options={{
            headerTitle: "Xử lý yêu cầu",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SpecificProcessListScreen"
          component={SpecificProcessListScreen}
          options={{
            headerTitle: "Quy trình canh tác cụ thể",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="StandardProcessScreen"
          component={StandardProcessScreen}
          options={{
            headerTitle: "Quy trình chuẩn",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
