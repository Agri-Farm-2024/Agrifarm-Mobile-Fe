import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import EmptyComponent from "../../components/EmptyComponent/EmptyComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { formatDate, formatDateToDDMMYYYY } from "../../utils";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import ConfirmationOptionModal from "../../components/ConfirmationOptionModal/ConfirmationOptionModal";
import Toast from "react-native-toast-message";

export default function ExtendListScreen({ route }) {
  const [confirmVisible, setConfirmVisible] = useState(false);

  const navigation = useNavigation();
  const { booking } = route.params;
  const reversedExtends = [...(booking?.extends || [])].reverse();
  console.log(`Extending: ` + JSON.stringify(reversedExtends));
  if (!booking) return <ActivityIndicatorComponent />;

  const handleExtendByBookingExtend = (extend) => {
    navigation.navigate("ExtendFormScreen", { booking: booking, extend });
  };

  const handleCancelBooking = () => {
    setConfirmVisible(false);
    Toast.show({
      type: "info",
      text1: "Đã từ chối yêu cầu gia hạn",
    });
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          padding: 20,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {booking?.extends?.length >= 1 &&
          reversedExtends?.map((extend, index) => (
            <TouchableRipple
              key={index}
              rippleColor="rgba(127, 182, 64, 0.2)"
              onPress={() => {
                // navigation.navigate("RequestContractDetailScreen", {
                //   requestID: request.booking_id,
                // });
                if (extend.status === "pending_contract") {
                  setConfirmVisible(extend);
                } else {
                  navigation.navigate("ExtendItemScreen", {
                    booking: booking,
                    extend: extend,
                  });
                }
                console.log("RequestContractDetailScreen");
              }}
              style={styles.extendContainer}
            >
              <>
                <View style={styles.contentWrapper}>
                  <Text style={styles.title}>
                    Gia hạn thuê đất lần {index + 1}
                  </Text>
                  <Text style={styles.plantType}>
                    Ngày tạo: {formatDateToDDMMYYYY(extend?.created_at)}
                  </Text>
                  <Text
                    style={[
                      styles.status,
                      extend.status === "completed" && { color: "#28a745" },
                      extend.status === "pending_payment" && {
                        color: "#ff007f",
                      },
                      extend.status === "pending_sign" && { color: "#00bcd4" },
                      extend.status === "rejected" && { color: "#dc3545" },
                      extend.status === "pending" && { color: "#007bff" },
                      extend.status === "pending_contract" && {
                        color: "#fd7e14",
                      },
                      extend.status === "canceled" && { color: "#6c757d" },
                      // extend.status === "expired" && { color: "#868e96" },
                    ]}
                  >
                    {extend.status === "pending" && "Chờ bạn xác nhận"}
                    {extend.status === "rejected" && "Từ chối"}
                    {extend.status === "canceled" && "Hủy"}
                    {extend.status === "pending_contract" && "Chờ phê duyệt"}
                    {extend.status === "pending_sign" && "Chờ ký tên"}
                    {extend.status === "pending_payment" && "Chờ thanh toán"}
                    {extend.status === "completed" && "Hoàn thành"}
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="#707070"
                />
              </>
            </TouchableRipple>
          ))}
        {booking?.extends?.length <= 0 && (
          <EmptyComponent message="Không có gia hạn nào" />
        )}
      </ScrollView>
      <ConfirmationOptionModal
        visible={confirmVisible}
        onDismiss={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          handleExtendByBookingExtend(confirmVisible);
        }}
        onCancel={handleCancelBooking}
        title="Xác nhận"
        content="Bạn có muốn đồng ý gia hạn không ?"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  extendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#f5f5f5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
    marginBottom: 20,
  },

  contentWrapper: {
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  plantType: {
    fontSize: 12,
    color: "#707070",
  },
  status: {
    fontSize: 14,
    color: "#7FB640",
    fontWeight: "bold",
  },
});
