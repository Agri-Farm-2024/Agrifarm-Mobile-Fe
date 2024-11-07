import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "../screens/ChatScreen/ChatListScreen";

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
    </Stack.Navigator>
  );
};

export default ChatTabs;
