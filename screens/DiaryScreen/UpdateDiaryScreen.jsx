import { Formik } from "formik";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import * as Yup from "yup";
import DropdownComponent from "../../components/DropdownComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

const stageOptions = [
  {
    label: "Giai đoạn 1: Chuẩn bị đất",
    value: "Giai đoạn 1: Chuẩn bị đất",
  },
  {
    label: "Giai đoạn 2: Gieo hạt",
    value: "Giai đoạn 2: Gieo hạt",
  },
  {
    label: "Giai đoạn 3: Bón phân",
    value: "Giai đoạn 3: Bón phân",
  },
];

const DiarySchema = Yup.object().shape({
  dateWrite: Yup.date().required("Vui lòng không bỏ trống!"),
  stage: Yup.string().required("Vui lòng không bỏ trống!"),
  dateFrom: Yup.date().required("Vui lòng không bỏ trống!"),
  dateTo: Yup.date().required("Vui lòng không bỏ trống!"),
  actionTitle: Yup.string().required("Vui lòng không bỏ trống!"),
  actionDescription: Yup.string().required("Vui lòng không bỏ trống!"),
  imageReport: Yup.array().of(Yup.string()),
});

const UpdateDiaryScreen = () => {
  const [isShowDatePicker, setIsShowDatePicker] = useState({
    dateWrite: false,
    fromDate: false,
    toDate: false,
  });

  const [imageReports, setImageReports] = useState([]);

  const [showImagePickerOptions, setShowImagePickerOptions] = useState(false);

  const pickImage = async () => {
    console.log("pickImage");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      let imageArr = [...result.assets];
      console.log("imageArr", imageArr);
      let imagesSelect = imageArr.map((image) => image.uri);

      console.log("images: " + imagesSelect);
      setImageReports([...imageReports, ...imagesSelect]);
      Toast.show({
        type: "success",
        text1: "Thêm ảnh thành công!",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <Formik
            initialValues={{
              dateWrite: new Date(),
              stage: "",
              dateFrom: new Date(),
              dateTo: new Date(),
              actionTitle: "",
              actionDescription: "",
              imageReport: [],
            }}
            validationSchema={DiarySchema}
            onSubmit={(values) => {
              console.log(values, stageList);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.container}>
                <View style={styles.dateContainer}>
                  <Text style={styles.textTitle}>Ngày ghi nhật ký</Text>
                  <TouchableOpacity style={styles.inputDate} onPress={() => {}}>
                    <Text>{new Date().toLocaleDateString()}</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Loại cây trồng</Text>
                <DropdownComponent
                  options={stageOptions}
                  placeholder="Chọn loại cây"
                  value={values.stage}
                  setValue={handleChange("stage")}
                />

                <Text style={styles.errorMessage}>
                  {touched.stage && errors.stage && errors.stage}
                </Text>

                <View style={styles.dateContainer}>
                  <Text style={styles.textTitle}>Ngày bắt đầu</Text>
                  <TouchableOpacity
                    style={styles.inputDate}
                    onPress={() =>
                      setIsShowDatePicker({
                        ...isShowDatePicker,
                        dateFrom: true,
                      })
                    }
                  >
                    <Text>
                      {new Date(values.dateFrom).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  {isShowDatePicker.dateFrom && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(values.dateFrom)}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        console.log(selectedDate);
                        const currentDate =
                          selectedDate || new Date(values.dateFrom);
                        setIsShowDatePicker({
                          ...isShowDatePicker,
                          dateFrom: false,
                        });
                        setFieldValue("dateFrom", currentDate.toISOString());
                      }}
                      textColor="#7FB640"
                    />
                  )}
                  {touched.dateFrom && errors.dateFrom && (
                    <Text style={styles.errorText}>{errors.dateFrom}</Text>
                  )}
                </View>

                <View style={styles.dateContainer}>
                  <Text style={styles.textTitle}>Ngày kết thúc</Text>
                  <TouchableOpacity
                    style={styles.inputDate}
                    onPress={() =>
                      setIsShowDatePicker({
                        ...isShowDatePicker,
                        dateFrom: true,
                      })
                    }
                  >
                    <Text>{new Date(values.dateTo).toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {isShowDatePicker.dateTo && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(values.dateTo)}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        console.log(selectedDate);
                        const currentDate =
                          selectedDate || new Date(values.dateTo);
                        setIsShowDatePicker({
                          ...isShowDatePicker,
                          dateTo: false,
                        });
                        setFieldValue("dateTo", currentDate.toISOString());
                      }}
                      textColor="#7FB640"
                    />
                  )}
                  {touched.dateTo && errors.dateTo && (
                    <Text style={styles.errorText}>{errors.dateTo}</Text>
                  )}
                </View>

                <Text style={[styles.label]}>Tên hoạt động canh tác</Text>
                <TextInput
                  style={styles.input}
                  textColor="black"
                  activeOutlineColor="#7FB640"
                  mode="outlined"
                  inputMode="text"
                  placeholder="Tên hoạt động canh tác"
                  onChangeText={handleChange("actionTitle")}
                  onBlur={handleBlur("actionTitle")}
                  value={values.actionTitle}
                  outlineColor={
                    touched.actionTitle && errors.actionTitle && "red"
                  }
                />
                <Text style={styles.errorMessage}>
                  {touched.actionTitle &&
                    errors.actionTitle &&
                    errors.actionTitle}
                </Text>

                <Text style={[styles.label]}>Nội dung canh tác</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  textColor="black"
                  activeOutlineColor="#7FB640"
                  mode="outlined"
                  inputMode="text"
                  multiline={true}
                  placeholder="Nội dung canh tác"
                  onChangeText={handleChange("actionDescription")}
                  onBlur={handleBlur("actionDescription")}
                  value={values.actionDescription}
                  outlineColor={
                    touched.actionDescription &&
                    errors.actionDescription &&
                    "red"
                  }
                />
                <Text style={styles.errorMessage}>
                  {touched.actionDescription &&
                    errors.actionDescription &&
                    errors.actionDescription}
                </Text>

                <View style={styles.imageReportTitleWrapper}>
                  <Text style={styles.label}>Hình ảnh báo cáo</Text>
                  <FAB
                    icon="image"
                    style={styles.fab}
                    color="white"
                    onPress={pickImage}
                  />
                </View>
                <View style={styles.imageReportContainer}>
                  {imageReports.length > 0 &&
                    imageReports.map((image, index) => {
                      console.log(image, typeof image);
                      return (
                        <View key={index} style={styles.imageWrapper}>
                          <Image
                            style={styles.imageReport}
                            source={{
                              uri: image,
                            }}
                          />
                          <TouchableOpacity
                            style={styles.closeIcon}
                            onPress={() => {
                              const newImageList = imageReports.filter(
                                (imageReport) => imageReport != image
                              );
                              setImageReports(newImageList);
                            }}
                          >
                            <AntDesign
                              name="closecircle"
                              size={24}
                              color="red"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Tạo nhật ký</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageReportTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginBottom: 25,
  },
  imageReportContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 20,
  },
  imageReport: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: "center",
    objectFit: "cover",
    objectPosition: "center",
  },
  fab: {
    right: 55,
    bottom: 0,
    backgroundColor: "#7FB640",
    borderRadius: 12,
  },
  closeIcon: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#797979",
    marginBottom: 30,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  inputDate: {
    width: "100%",
    height: 50,
    lineHeight: 50,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    borderColor: "#4878D9",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    padding: 10,
  },
  input: {
    height: 50,
    lineHeight: 20,
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  descriptionInput: {
    height: 150,
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
    height: 18,
  },
  button: {
    backgroundColor: "#7FB640",
    borderRadius: 20,
    paddingVertical: 4,
    marginTop: 20,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateContainer: {
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdateDiaryScreen;
