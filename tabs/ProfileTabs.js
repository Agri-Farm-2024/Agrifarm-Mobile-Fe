import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "../screens/ProfileScreen/EditProfile";

export default function ProfileTabs() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#7FB640",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
        options={{
          headerShown: false,
          headerLeft: () => null, // This will remove the left button
        }}
      >
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerLeft: () => null, // This will remove the left button
            headerTitle: "Tài khoản",
          }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            headerTitle: "Cập nhật thông tin",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
