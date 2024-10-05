import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const user = {
  avatar:
    "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
  name: "Phạm Đăng Ninh",
  email: "ninh@gmail.com",
  dob: "17/11/1999",
  gender: "male",
  phone: "054343453",
  address: "60 Láng Hạ, Ba Đình, Hà Nội",
};

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.avatar} source={{ uri: user.avatar }}></Image>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>{user.email}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfileScreen")}
          >
            <View style={styles.editAction}>
              <Text style={styles.editActionTitle}>Chỉnh sửa</Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={24}
                color="#707070"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.infoTitle}>Ngày sinh:</Text>
          <Text style={styles.info}>{user.dob}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.infoTitle}>Giới tính:</Text>
          <Text style={styles.info}>
            {user.gender == "male" ? "Nam" : "Nữ"}
          </Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.infoTitle}>Địa chỉ:</Text>
          <Text style={styles.info}>{user.address}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.infoTitle}>Số điện thoại:</Text>
          <Text style={styles.info}>{user.phone}</Text>
        </View>
        <TouchableHighlight
          underlayColor="#7FB640"
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.userInfoContainer}>
            <View style={styles.logoutContainer}>
              <MaterialCommunityIcons name="logout" size={24} color="#7FB640" />
              <Text style={styles.logoutTitle}>Đăng xuất</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#707070" />
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    padding: 10,
  },

  headerContainer: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 10,
  },
  userInfoContainer: {
    width: "50%",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7FB640",
  },
  userRole: {
    fontSize: 18,
    color: "#707070",
    fontWeight: "bold",
  },
  editAction: {
    flexDirection: "row",
    alignItem: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  editActionTitle: {
    fontSize: 16,
    color: "#707070",
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 16,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },
  infoTitle: {
    fontSize: 18,
    color: "#707070",
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    color: "#7FB640",
  },
  logoutTitle: {
    color: "black",
    fontSize: 18,
  },
});

export default ProfileScreen;
