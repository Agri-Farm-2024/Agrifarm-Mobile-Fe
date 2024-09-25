import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "../screens/ChatScreen/ChatListScreen";
import ChatDetailScreen from "../screens/ChatScreen/ChatDetailScreen";

const Stack = createStackNavigator();

const ChatTabs = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatListScreen"
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
        name="ChatListScreen"
        component={ChatListScreen}
        options={{
          headerLeft: () => null, // This will remove the left button
          headerTitle: "Trò chuyện",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{
          headerShown: false,
          headerLeft: () => null, // This will remove the left button
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatTabs;
