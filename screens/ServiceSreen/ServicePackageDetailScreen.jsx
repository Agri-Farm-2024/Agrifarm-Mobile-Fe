import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { formatNumber } from "../../utils";
import DropdownComponent from "../../components/DropdownComponent";
import { useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const service = {
  id: "SV001",
  serviceTitle: "Gói dịch vụ số 1",
  serviceDescription:
    "Gói quy trình canh tác theo chuẩn VietGap của giống cây. Dịch vụ này sẽ cung cấp quy trình cụ thể để trồng trọt theo chuẩn VietGAP. Dịch vụ sẽ cung cấp cung cấp vật tư cần thiết để trồng trọt như: phân bón, thuốc trừ sâu, các dụng cụ trồng trọt và các nguyên vật liệu để cải tạo đất và xây dựng mô hình đạt chuẩn VietGAP để trồng cây.",
  servicePrice: 2000000,
  isPurchase: true,
  isMaterial: true,
};

const plotOptions = [
  {
    label: "Mảnh đất số 1",
    value: "Mảnh đất số 1",
  },
  {
    label: "Mảnh đất số 2",
    value: "Mảnh đất số 2",
  },
];

const plantSeasonOptions = [
  {
    label: "Tháng 9 - 12",
    value: "Tháng 9 - 12",
  },
  {
    label: "Tháng 10 - 1",
    value: "Tháng 10 - 1",
  },
  {
    label: "Tháng 1 - 3",
    value: "Tháng 1 - 3",
  },
  {
    value: "Tháng 4 - 8",
    label: "Tháng 4 - 8",
  },
];

const plantTypeOptions = [
  {
    label: "Dưa lưới",
    value: "Dưa lưới",
  },
  {
    label: "Dưa hấu",
    value: "Dưa hấu",
  },
  {
    label: "Dưa leo",
    value: "Dưa leo",
  },
  {
    label: "Cây ớt",
    value: "Cây ớt",
  },
];

const ServicePackageDetailScreen = () => {
  const [formInput, setFormInput] = useState({
    plot: "",
    cultivatedArea: "",
    plantType: "",
    plantSeason: "",
  });

  const handleSubmit = () => {
    if (
      formInput.plot === "" ||
      formInput.cultivatedArea === "" ||
      formInput.plantType === "" ||
      formInput.plantSeason === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Mua dịch vụ thất bại thất bại",
        text2: "Vui lòng điền đầy đủ thông tin!",
      });
    }
    console.log("Submit", formInput);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding">
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
            <Text style={styles.detailName}>Bao tiêu</Text>
            <Text style={styles.detailContent}>
              {service.isPurchase == true ? "Có" : "Không"}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailName}>Bao vật tư</Text>
            <Text style={styles.detailContent}>
              {service.isMaterial == true ? "Có" : "Không"}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailName}>Áp dụng cho mảnh đất</Text>
            <View style={styles.detailContentInput}>
              <DropdownComponent
                styleValue={{
                  height: 40,
                }}
                placeholderStyleValue={{ fontSize: 14, color: "#707070" }}
                options={plotOptions}
                placeholder="Chọn mảnh đất"
                value={formInput.plot}
                setValue={(value) =>
                  setFormInput({ ...formInput, plot: value })
                }
              />
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailName}>Áp dụng cho loại cây</Text>
            <View style={styles.detailContentInput}>
              <DropdownComponent
                styleValue={{
                  height: 40,
                }}
                placeholderStyleValue={{ fontSize: 14, color: "#707070" }}
                options={plantTypeOptions}
                placeholder="Chọn loại cây"
                value={formInput.plantType}
                setValue={(value) => {
                  if (formInput.plantType != value) {
                    setFormInput({
                      ...formInput,
                      plantType: value,
                      plantSeason: "",
                    });
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailName}>Mùa vụ</Text>
            <View style={styles.detailContentInput}>
              <DropdownComponent
                isDisabled={formInput.plantType == "" ? true : false}
                styleValue={{
                  height: 40,
                }}
                placeholderStyleValue={{ fontSize: 14, color: "#707070" }}
                options={plantSeasonOptions}
                placeholder="Chọn mùa vụ"
                value={formInput.plantSeason}
                setValue={(value) =>
                  setFormInput({ ...formInput, plantSeason: value })
                }
              />
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailName}>Diện tích canh tác (ha)</Text>
            <View style={styles.detailContent}>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="Diện tích canh tác"
                style={styles.input}
                value={formInput.cultivatedArea}
                onChangeText={(text) =>
                  setFormInput({ ...formInput, cultivatedArea: text })
                }
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Mua gói dịch vụ</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  detailContentInput: {
    width: "50%",
    fontSize: 14,
    color: "#707070",
    fontWeight: "bold",
  },
  detailContent: {
    width: "50%",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#707070",
  },
  input: {
    paddingVertical: 0,
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderColor: "#D9D9D9",
  },
  submitButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServicePackageDetailScreen;
