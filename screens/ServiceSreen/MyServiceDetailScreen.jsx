import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatNumber } from "../../utils";

const service = {
  id: "DV001",
  serviceTitle: "Gói dịch vụ số 1",
  platType: "Dưa lưới",
  status: "Đang sử dụng",
  cultivatedArea: 200,
  expiredDate: "25/09/2025",
  serviceDescription:
    "Gói quy trình canh tác theo chuẩn VietGap của giống cây. Dịch vụ này sẽ cung cấp quy trình cụ thể để trồng trọt theo chuẩn VietGAP. Dịch vụ sẽ cung cấp cung cấp vật tư cần thiết để trồng trọt như: phân bón, thuốc trừ sâu, các dụng cụ trồng trọt và các nguyên vật liệu để cải tạo đất và xây dựng mô hình đạt chuẩn VietGAP để trồng cây.",
  servicePrice: 2000000,
  plot: "Mảnh đất số 1",
};

const MyServiceDetailScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{service.serviceTitle}</Text>
        <Text style={styles.description}>{service.serviceDescription}</Text>
        <Text style={styles.header}>Chi tiết gói dịch vụ</Text>
        <View style={styles.detail}>
          <Text style={styles.detailName}>Gói dịch vụ</Text>
          <Text style={styles.detailContent}>{service.serviceTitle}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailName}>Giá thuê</Text>
          <Text style={styles.detailContent}>
            {formatNumber(service.servicePrice)} VND / năm
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailName}>Diện tích canh tác</Text>
          <Text style={styles.detailContent}>{service.cultivatedArea} ha</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailName}>Loại cây</Text>
          <Text style={styles.detailContent}>{service.platType} ha</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailName}>Mảnh đất</Text>
          <Text style={styles.detailContent}>{service.plot}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailName}>Trạng thái</Text>
          <Text
            style={[
              styles.detailContent,
              service.status == "Đang sử dụng"
                ? { color: "#7FB640" }
                : { color: "#D91515" },
            ]}
          >
            {service.status}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D9D9D9",
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  header: {
    marginVertical: 10,
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#D9D9D9",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D9D9D9",
  },
  detailName: {
    fontSize: 16,
    color: "#707070",
  },
  detailContent: {
    width: "50%",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#707070",
  },
});

export default MyServiceDetailScreen;
