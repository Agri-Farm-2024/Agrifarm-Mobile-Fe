// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screen components
import BottomTabNavigator from "../tabs/BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen/LoginScreen";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="BottomTabs">
    <Stack.Screen
      name="Login"
      options={{
        headerShown: false,
      }}
      component={LoginScreen}
    />
    <Stack.Screen
      name="BottomTabs"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={BottomTabNavigator}
    />
  </Stack.Navigator>
);

export default StackNavigator;
