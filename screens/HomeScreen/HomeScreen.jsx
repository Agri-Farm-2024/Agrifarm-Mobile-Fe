import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
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
              <Text style={styles.userName}>Gia Hân</Text>
            </View>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              size={30}
              color="#7FB640"
            />
          </TouchableOpacity>
        </View>

        <Image
          style={styles.discountImage}
          source={require("../../assets/discount.png")}
        />

        <Text style={styles.functionTitle}>Chức năng</Text>

        {/* First Row */}
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Hợp đồng thuê đất</Text>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons
                name="briefcase-plus"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Yêu cầu dịch vụ</Text>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DiaryScreen")}
              style={styles.iconButton}
            >
              <MaterialCommunityIcons
                name="book-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Ghi Nhật ký</Text>
          </View>
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons
                name="text-box-check-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Quy trình canh tác</Text>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons
                name="account-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Thông tin</Text>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate("HelpScreen")}
            >
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Hỗ trợ</Text>
          </View>
        </View>
      </View>
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
    width: "20%",
  },
  iconButton: {
    backgroundColor: "#7FB640",
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

export default HomeScreen;
