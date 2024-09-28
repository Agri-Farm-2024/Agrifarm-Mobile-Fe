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
import ServiceScreen from "../screens/ServiceSreen/ServiceScreen";
import ServicePackageDetailScreen from "../screens/ServiceSreen/ServicePackageDetailScreen";
import MyServiceDetailScreen from "../screens/ServiceSreen/MyServiceDetailScreen";
import MaterialDetailScreen from "../screens/MaterialDetailScreen/MaterialDetailScreen";
import CartMaterialsScreen from "../screens/CartMaterialsScreen/CartMaterialsScreen";
import CheckoutScreen from "../screens/CheckoutScreen/CheckoutScreen";
import PaymentScreen from "../screens/PaymentScreen/PaymentScreen";
import ThankYouScreen from "../screens/ThankYouScreen/ThankYouScreen";
import RequestMaterialsByStage from "../screens/RequestMaterialsScreen/RequestMaterialsByStage/RequestMaterialsByStage";
import HistoryOrder from "../screens/HistoryOrder/HistoryOrder";
import HistoryOrderDetail from "../screens/HistoryOrder/HistoryOrderDetail/HistoryOrderDetail";
import RequestContractDetailScreen from "../screens/RequestListScreen/RequestContractDetailScreen/RequestContractDetailScreen";
import RequestServicesDetailScreen from "../screens/RequestListScreen/RequestServicesDetailScreen/RequestServicesDetailScreen";
import RequestPurchaseScreen from "../screens/RequestListScreen/RequestPurchaseScreen/RequestPurchaseScreen";

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
    />
    <Stack.Screen
      name="LandLeaseScreen"
      options={{
        headerTitle: "Yêu cầu thuê đất",
        headerTitleAlign: "center",
      }}
      component={LandLeaseScreen}
    />
    <Stack.Screen
      name="ServiceScreen"
      options={{
        headerTitle: "Gói dịch vụ",
        headerTitleAlign: "center",
      }}
      component={ServiceScreen}
    />
    <Stack.Screen
      name="ServicePackageDetailScreen"
      options={{
        headerTitle: "Chi tiết gói dịch vụ",
        headerTitleAlign: "center",
      }}
      component={ServicePackageDetailScreen}
    />
    <Stack.Screen
      name="MyServiceDetailScreen"
      options={{
        headerTitle: "Dịch vụ của tôi",
        headerTitleAlign: "center",
      }}
      component={MyServiceDetailScreen}
    />
    <Stack.Screen
      name="MaterialDetailScreen"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={MaterialDetailScreen}
    />
    <Stack.Screen
      name="CartMaterialsScreen"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={CartMaterialsScreen}
    />
    <Stack.Screen
      name="CheckoutScreen"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={CheckoutScreen}
    />
    <Stack.Screen
      name="PaymentScreen"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={PaymentScreen}
    />
    <Stack.Screen
      name="ThankYouScreen"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={ThankYouScreen}
    />
    <Stack.Screen
      name="RequestMaterialsByStage"
      options={{
        headerTitle: "Yêu cầu vật tư",
        headerTitleAlign: "center",
      }}
      component={RequestMaterialsByStage}
    />
    <Stack.Screen
      name="HistoryOrder"
      options={{
        headerTitle: "Lịch sử đơn hàng",
        headerTitleAlign: "center",
      }}
      component={HistoryOrder}
    />
    <Stack.Screen
      name="HistoryOrderDetail"
      options={{
        headerTitle: "Chi tiết đơn hàng",
        headerTitleAlign: "center",
      }}
      component={HistoryOrderDetail}
    />
    <Stack.Screen
      name="RequestContractDetailScreen"
      options={{
        headerTitle: "Chi tiết yêu cầu",
        headerTitleAlign: "center",
      }}
      component={RequestContractDetailScreen}
    />
    <Stack.Screen
      name="RequestServicesDetailScreen"
      options={{
        headerTitle: "Chi tiết yêu cầu",
        headerTitleAlign: "center",
      }}
      component={RequestServicesDetailScreen}
    />
    <Stack.Screen
      name="RequestPurchaseScreen"
      options={{
        headerTitle: "Chi tiết yêu cầu",
        headerTitleAlign: "center",
      }}
      component={RequestPurchaseScreen}
    />
  </Stack.Navigator>
);

export default StackNavigator;
