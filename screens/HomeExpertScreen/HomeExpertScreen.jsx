import React, { useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Avatar, Badge } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import AgricultureExpertEfficiency from "./AgricultureExpertEfficiency/AgricultureExpertEfficiency";
import socket from "../../services/socket";
import NotificationComponent from "../../services/notification";

function HomeExpertScreen({ navigation }) {
  const { triggerNotification } = NotificationComponent();
  const cartCount = useSelector((state) => state.cartSlice.cartCount);
  const user_id = useSelector((state) => state.userSlice?.userInfo?.user_id);
  const userInfo = useSelector((state) => state.userSlice?.userInfo);

  console.log(user_id);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socket;

    socketRef.current.emit("online-user", user_id);
    socketRef.current.on("notification", async (data) => {
      console.log(data);

      // Toast.show({
      //   type: "info",
      //   text1: "Thông báo",
      //   text2: data.message.content,
      // });
      await triggerNotification(data?.message?.content);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("notification");
      }
    };
  }, [user_id]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Avatar.Image
                size={76}
                source={{
                  uri: "https://th.bing.com/th/id/OIP.EX4-Ntrsq26D7rjZEhky0gHaHN?rs=1&pid=ImgDetMain",
                }}
              />
              <View style={styles.userDetails}>
                <Text style={styles.welcomeText}>CHÀO MỪNG</Text>
                <Text style={styles.userName}>
                  Chuyên viên {userInfo?.full_name}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("CartMaterialsScreen")}
            >
              <MaterialCommunityIcons name="cart" size={30} color="#7FB640" />
              {cartCount > 0 && (
                <Badge
                  size={20}
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  {cartCount}
                </Badge>
              )}
            </TouchableOpacity>
          </View>
          {/* 
          <Image
            style={styles.discountImage}
            source={require("../../assets/discount.png")}
          /> */}
          <AgricultureExpertEfficiency />

          <Text style={styles.functionTitle}>Chức năng</Text>

          {/* First Row */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("RequestMaterialsScreen")}
              >
                <MaterialCommunityIcons
                  name="basket-plus-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Yêu cầu vật tư</Text>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("StandardProcessScreen")}
                style={styles.iconButton}
              >
                <MaterialCommunityIcons
                  name="application-cog-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Quy trình kỹ thuật chuẩn</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SpecificProcessListScreen")}
                style={styles.iconButton}
              >
                <MaterialCommunityIcons
                  name="application-edit-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Quy trình canh tác cụ thể</Text>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => console.log("press")}
                style={styles.iconButton}
              >
                <MaterialCommunityIcons
                  name="book-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Ghi Nhật ký</Text>
            </View>
          </View>

          {/* Second Row */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("HistoryOrder")}
              >
                <MaterialCommunityIcons
                  name="briefcase-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Đơn hàng</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => console.log("presss")}
              >
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Hỗ trợ</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("MyTaskScreen")}
              >
                <MaterialCommunityIcons
                  name="format-list-checkbox"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Danh sách công việc</Text>
            </View>
            <View style={styles.iconContainer}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 17,
  },
  discountImage: {
    height: 180,
    width: "100%",
    marginTop: 30,
    resizeMode: "cover",
  },
  functionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: "22%",
  },
  iconButton: {
    // backgroundColor: "#7FB640",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  iconLabel: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
});

export default HomeExpertScreen;
