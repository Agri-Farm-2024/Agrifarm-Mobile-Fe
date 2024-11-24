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
import { FAB, IconButton, TextInput } from "react-native-paper";
import * as Yup from "yup";
import DropdownComponent from "../../components/DropdownComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formatDate } from "../../utils";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../services/uploadService";
import { writeDiary } from "../../redux/slices/processSlice";

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
  quality: Yup.number()
    .required("Vui lòng không bỏ trống!")
    .min(0, "Chất lượng không hợp lệ!")
    .max(100, "Chất lượng không hợp lệ!"),
  actionDescription: Yup.string().required("Vui lòng không bỏ trống!"),
  imageReport: Yup.array().of(Yup.string()),
});

const WriteDiaryScreen = ({ route, navigation }) => {
  const { diary } = route.params;

  const dispatch = useDispatch();

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
      let imageArr = [...imageReports, ...result.assets];
      console.log("imageArr", imageArr);

      if (imageArr.length > 3) {
        Toast.show({
          type: "error",
          text1: "Chỉ được chọn 3 ảnh!",
        });
      } else {
        setImageReports([...imageArr]);
        Toast.show({
          type: "success",
          text1: "Thêm ảnh thành công!",
        });
      }
    }
  };

  const handleWriteDinary = async (values) => {
    try {
      console.log("submit value", values);
      let uploadedImages = null;
      if (imageReports.length > 0) {
        console.log("Upload images...");
        uploadedImages = await Promise.all(
          imageReports.map(async (file, index) => {
            const formData = new FormData();
            console.log("file add formData", {
              uri: file.uri,
              name: file.fileName,
              type: file.mimeType,
            });
            formData.append("file", {
              uri: file.uri,
              name: file.fileName || `image_${index}.jpg`,
              type: file.mimeType || "image/jpeg",
            });
            const response = await uploadFile(formData);
            console.log("upload image", response);
            return response.metadata.folder_path;
          })
        );
      }
      const params = {
        processId: diary.process_technical_specific_stage_content_id,
        formData: {
          content: values.actionDescription,
          quality_report: values.quality,
          dinaries_image:
            uploadedImages && uploadedImages?.length > 0
              ? uploadedImages.map((image) => ({
                  url_link: image,
                  type: "image",
                }))
              : null,
        },
      };

      console.log("params write dinary", JSON.stringify(params));
      dispatch(writeDiary(params)).then((response) => {
        console.log("Response write diary", JSON.stringify(response));

        if (response.payload.statusCode != 201) {
          Toast.show({
            type: "error",
            text1: "Ghi nhật ký không thành công!",
          });
        }

        if (response.payload.statusCode == 201) {
          Toast.show({
            type: "success",
            text1: "Ghi nhật ký thành công!",
          });
          navigation.goBack();
        }
      });
    } catch (error) {
      console.log("Error write dinary", error);
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
              actionDescription: "",
              quality: 0,
              imageReport: [],
            }}
            validationSchema={DiarySchema}
            onSubmit={handleWriteDinary}
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
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.title}>{diary.actionTitle}</Text>

                  <View style={styles.diaryInfo}>
                    <Text style={styles.infoTitle}>Ngày bắt đầu</Text>
                    <Text style={styles.infoContent}>
                      {formatDate(diary.dayFrom, 0)}
                    </Text>
                  </View>

                  <View style={styles.diaryInfo}>
                    <Text style={styles.infoTitle}>Ngày kết thúc</Text>
                    <Text style={styles.infoContent}>
                      {formatDate(diary.dayTo, 0)}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.label]}>Chất lượng canh tác</Text>
                <TextInput
                  style={styles.input}
                  textColor="#707070"
                  activeOutlineColor="#7FB640"
                  mode="outlined"
                  placeholderTextColor={"#707070"}
                  inputMode="numeric"
                  placeholder="Chất lượng canh tác"
                  onChangeText={handleChange("quality")}
                  onBlur={handleBlur("quality")}
                  value={values.quality}
                  outlineColor={touched.quality && errors.quality && "red"}
                />
                <Text style={styles.errorMessage}>
                  {touched.quality && errors.quality && errors.quality}
                </Text>

                <Text style={[styles.label]}>Nội dung canh tác</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  textColor="#707070"
                  activeOutlineColor="#7FB640"
                  mode="outlined"
                  inputMode="text"
                  multiline={true}
                  placeholder="Nội dung canh tác"
                  placeholderTextColor={"#707070"}
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
                  <IconButton
                    icon="image"
                    style={styles.fab}
                    iconColor="white"
                    onPress={pickImage}
                  />
                </View>
                <View style={styles.imageReportContainer}>
                  {imageReports.length == 0 && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#cacaca",
                        textAlign: "center",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      Chưa có hình ảnh
                    </Text>
                  )}
                  {imageReports.length > 0 &&
                    imageReports.map((image, index) => {
                      console.log(image, typeof image);
                      return (
                        <View key={index} style={styles.imageWrapper}>
                          <Image
                            style={styles.imageReport}
                            source={{
                              uri: image.uri,
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
    backgroundColor: "#7FB640",
    borderRadius: 7,
  },
  closeIcon: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  label: {
    width: "70%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#707070",
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
    color: "#707070",
  },
  descriptionInput: {
    height: 100,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    borderBottomColor: "#707070",
    borderBottomWidth: 1,
  },
  diaryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#707070",
  },
  infoContent: {
    fontSize: 12,
    color: "#707070",
    fontWeight: "bold",
  },
});

export default WriteDiaryScreen;
