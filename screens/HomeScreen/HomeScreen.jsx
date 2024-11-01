import React from "react";
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
import SlideImageComponent from "../../components/SlideImageComponent/SlideImageComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const cartCount = useSelector((state) => state.cart.cartCount);

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
                <Text style={styles.userName}>Gia Hân</Text>
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

          <SlideImageComponent />

          <Text style={styles.functionTitle}>Chức năng</Text>

          {/* First Row */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("LandLeaseScreen")}
              >
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Yêu cầu thuê đất</Text>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("ServiceScreen")}
              >
                <MaterialCommunityIcons
                  name="briefcase-plus"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Yêu cầu dịch vụ</Text>
            </View>

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
          </View>

          {/* Second Row */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="text-box-check-outline"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Quy trình canh tác</Text>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("DiaryScreen")}
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
          </View>

          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("HelpScreen")}
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
                onPress={() => navigation.navigate("RequestListScreen")}
              >
                <MaterialCommunityIcons
                  name="format-list-checkbox"
                  size={40}
                  color="#7FB640"
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Danh sách yêu cầu</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("LandListScreen")}
              >
                <MaterialCommunityIcons name="map" size={40} color="#7FB640" />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Danh sách mảnh đất</Text>
            </View>
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

export default HomeScreen;
