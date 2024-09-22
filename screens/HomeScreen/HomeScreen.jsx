import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function HomeScreen() {
  return (
    <SafeAreaView>
      <View
        style={{
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={76}
              source={{
                uri: "https://th.bing.com/th/id/OIP.EX4-Ntrsq26D7rjZEhky0gHaHN?rs=1&pid=ImgDetMain",
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                CHÀO MỪNG
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  // fontWeight: "700",
                }}
              >
                Gia Hân
              </Text>
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
          style={{
            height: 180,
            objectFit: "cover",
            width: "100%",
            marginTop: 30,
          }}
          source={require("../../assets/discount.png")}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          Chức năng
        </Text>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "20%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#7FB640",
                display: "flex",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="file-document-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
              }}
            >
              Hợp đồng thuê đất
            </Text>
          </View>
          <View
            style={{
              width: "20%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#7FB640",
                display: "flex",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="briefcase-plus"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
              }}
            >
              Yêu cầu dịch vụ
            </Text>
          </View>
          <View
            style={{
              width: "20%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#7FB640",
                display: "flex",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="book-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
              }}
            >
              Ghi Nhật ký
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "20%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#7FB640",
                display: "flex",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="text-box-check-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
              }}
            >
              Quy trình canh tác
            </Text>
          </View>
          <View
            style={{
              width: "20%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#7FB640",
                display: "flex",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
              }}
            >
              Thông tin
            </Text>
          </View>
          <View
            style={{
              width: "20%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#7FB640",
                display: "flex",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={45}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
              }}
            >
              Hỗ trợ
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
