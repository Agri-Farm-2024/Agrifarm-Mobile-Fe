import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { formatNumber, shortenText } from "../../utils";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getServicePackageList } from "../../redux/slices/serviceSlice";
import {
  getServicePackageSelector,
  serviceLoadingSelector,
} from "../../redux/selectors";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

const myService = [
  {
    id: "DV001",
    serviceTitle: "Gói dịch vụ số 1",
    platType: "Dưa lưới",
    status: "Đang sử dụng",
    cultivatedArea: 200,
    expiredDate: "25/09/2025",
    serviceDescription:
      "Gói quy trình canh tác theo chuẩn VietGap cùa giống cây + vật tư",
    plot: "Mảnh đất số 1",
    servicePrice: 2000000,
  },
  {
    id: "DV001",
    serviceTitle: "Gói dịch vụ số 1",
    platType: "Dưa gan",
    status: "Sắp hết hạn",
    cultivatedArea: 200,
    expiredDate: "25/10/2024",
    serviceDescription:
      "Gói quy trình canh tác theo chuẩn VietGap cùa giống cây + vật tư",
    plot: "Mảnh đất số 1",
    servicePrice: 2000000,
  },
];

const services = [
  {
    id: "SV001",
    serviceTitle: "Gói dịch vụ số 1",
    serviceDescription:
      "Gói quy trình canh tác theo chuẩn VietGap cùa giống cây + vật tư",
    servicePrice: 2000000,
  },
  {
    id: "SV001",
    serviceTitle: "Gói dịch vụ số 2",
    serviceDescription:
      "Gói quy trình canh tác theo chuẩn VietGap cùa giống cây + vật tư + bao tiêu nông sản",
    servicePrice: 4000000,
  },
  {
    id: "SV001",
    serviceTitle: "Gói dịch vụ số 1",
    serviceDescription:
      "Gói quy trình canh tác theo chuẩn VietGap cùa giống cây + vật tư + hỗ trợ canh tác",
    servicePrice: 6000000,
  },
  {
    id: "SV001",
    serviceTitle: "Gói dịch vụ số 1",
    serviceDescription:
      "Gói quy trình canh tác theo chuẩn VietGap cùa giống cây + vật tư + bao tiêu nông sản + hỗ trợ canh tác",
    servicePrice: 8000000,
  },
];

const ServiceScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const serviceList = useSelector(getServicePackageSelector);
  const loading = useSelector(serviceLoadingSelector);

  const fetchServiceList = () => {
    try {
      dispatch(getServicePackageList());
    } catch (error) {
      console.log("Error fetching service package list", error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchServiceList();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {loading && <ActivityIndicatorComponent />}
        {!loading && (
          <>
            {/* <View style={styles.sectionContainer}>
              <Text style={styles.headerLabel}>Dịch vụ đang sử dụng</Text>
              {myService.map((service, index) => (
                <TouchableRipple
                  style={styles.serviceContainer}
                  key={`MSV${index}`}
                  rippleColor="rgba(127, 182, 64, 0.2)"
                  onPress={() => {
                    navigation.navigate("MyServiceDetailScreen");
                  }}
                >
                  <>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.serviceTitle}>
                        {service.serviceTitle}
                      </Text>
                      <Text
                        style={[
                          styles.serviceStatus,
                          service.status == "Sắp hết hạn" && {
                            backgroundColor: "#D91515",
                          },
                        ]}
                      >
                        {service.status}
                      </Text>
                    </View>
                    <Text style={styles.serviceDescription}>
                      {service.serviceDescription}
                    </Text>
                    <Text style={styles.serviceDescription}>
                      Loại cây: {service.platType}
                    </Text>
                    <Text style={styles.servicePrice}>
                      {formatNumber(service.servicePrice)} VND
                    </Text>
                  </>
                </TouchableRipple>
              ))}
            </View> */}
            <View style={[styles.sectionContainer, { paddingBottom: 50 }]}>
              <Text style={styles.headerLabel}>Các gói dịch vụ</Text>
              {serviceList?.metadata &&
                serviceList?.metadata?.map((service, index) => (
                  <TouchableRipple
                    rippleColor="rgba(127, 182, 64, 0.2)"
                    onPress={() => {
                      navigation.navigate("ServicePackageDetailScreen", {
                        serviceDetail: service,
                      });
                    }}
                    key={`SV${index}`}
                    style={styles.serviceContainer}
                  >
                    <>
                      <Text style={styles.serviceTitle}>{service.name}</Text>
                      <Text style={styles.serviceDescription}>
                        {shortenText(service.description, 50)}
                      </Text>
                      <Text style={styles.servicePrice}>
                        {formatNumber(service.price)} VND
                      </Text>
                    </>
                  </TouchableRipple>
                ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionContainer: {
    marginVertical: 30,
    gap: 20,
  },
  headerLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceStatus: {
    padding: 5,
    backgroundColor: "#7FB640",
    fontSize: 12,
    fontWeight: "bold",
    borderRadius: 3,
    color: "#FFFFFF",
  },
  serviceContainer: {
    gap: 10,
    padding: 20,
    borderRadius: 7,
    backgroundColor: "#f5f5f5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: "flex-start",
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceDescription: {
    fontSize: 16,
    color: "#707070",
  },
  servicePrice: {
    fontSize: 16,
    color: "#7FB640",
  },
});
export default ServiceScreen;
