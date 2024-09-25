import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import DropdownComponent from "../../components/DropdownComponent";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { MaterialIcons } from "@expo/vector-icons";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

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

const DiarySchema = Yup.object().shape({
  diaryTitle: Yup.string().required("Vui lòng không bỏ trống!"),
  plantType: Yup.string().required("Vui lòng không bỏ trống!"),
  areaNumber: Yup.number()
    .required("Vui lòng không bỏ trống!")
    .min(100, "Diện tích phải lớn hơn 100"),
  stage: Yup.array().of(
    Yup.object().shape({
      dateFrom: Yup.date().required("Chọn ngày bắt đầu!"),
      dateTo: Yup.date().required("Chọn ngày kết thúc!"),
      stageTitle: Yup.string().required("Nhập tên giai đoạn!"),
    })
  ),
});

const CreateDiaryScreen = () => {
  const [isShowDatePicker, setIsShowDatePicker] = useState({
    fromDate: false,
    toDate: false,
  });

  const [stageSelected, setStageSelected] = useState(null);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const [stageForm, setStageForm] = useState({
    dateFrom: new Date().toISOString(),
    dateTo: new Date().toISOString(),
    titleStage: "",
  });

  const [stageList, setStageList] = useState([]);

  const handleAddStage = () => {
    console.log("Add stage");
    if (
      !stageForm.dateFrom ||
      !stageForm.dateTo ||
      stageForm.titleStage == ""
    ) {
      Toast.show({
        type: "error",
        text1: "Thêm giai đoạn thất bại",
        text2: "Vui lòng điền đầy đủ thông tin!",
      });
      return;
    }

    if (stageForm.dateFrom > stageForm.dateTo) {
      Toast.show({
        type: "error",
        text1: "Thêm giai đoạn thất bại",
        text2: "Thời gian không hợp lệ!",
      });
      return;
    }

    setStageList([...stageList, stageForm]);
    setStageForm({
      dateFrom: new Date(),
      dateTo: new Date(),
      titleStage: "",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={{
          diaryTitle: "",
          plantType: "",
          areaNumber: "",
          stage: [],
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              style={styles.container}
            >
              <Text style={[styles.label, { marginTop: 30 }]}>Tên nhật ký</Text>
              <TextInput
                style={styles.input}
                textColor="black"
                activeOutlineColor="#7FB640"
                mode="outlined"
                inputMode="text"
                placeholder="Tên nhật ký"
                onChangeText={handleChange("diaryTitle")}
                onBlur={handleBlur("diaryTitle")}
                value={values.diaryTitle}
                outlineColor={touched.diaryTitle && errors.diaryTitle && "red"}
              />
              <Text style={styles.errorMessage}>
                {touched.diaryTitle && errors.diaryTitle && errors.diaryTitle}
              </Text>

              <Text style={styles.label}>Loại cây trồng</Text>
              <DropdownComponent
                options={plantTypeOptions}
                placeholder="Chọn loại cây"
                value={values.plantType}
                setValue={handleChange("plantType")}
              />

              <Text style={styles.errorMessage}>
                {touched.plantType && errors.plantType && errors.plantType}
              </Text>

              <Text style={styles.label}>Diện tích canh tác(m2)</Text>
              <TextInput
                style={styles.input}
                activeOutlineColor="#7FB640"
                textColor="black"
                mode="outlined"
                inputMode="text"
                placeholder="Diện tích canh tác"
                onChangeText={handleChange("areaNumber")}
                onBlur={handleBlur("areaNumber")}
                value={values.areaNumber}
                outlineColor={touched.areaNumber && errors.areaNumber && "red"}
              />
              <Text style={styles.errorMessage}>
                {touched.areaNumber && errors.areaNumber && errors.areaNumber}
              </Text>

              <Text style={styles.label}>Giai đoạn canh tác</Text>
              <View style={styles.stageFormContainer}>
                <View style={styles.stageFormContent}>
                  <View style={styles.stageDateContainer}>
                    {/* From date */}
                    <View style={styles.stageDate}>
                      <Text style={styles.textTitle}>Từ </Text>
                      <TouchableOpacity
                        style={[styles.inputDate]}
                        onPress={() =>
                          setIsShowDatePicker({
                            ...isShowDatePicker,
                            dateFrom: true,
                          })
                        }
                      >
                        <Text>
                          {new Date(stageForm.dateFrom).toLocaleDateString()}
                        </Text>
                      </TouchableOpacity>
                      {isShowDatePicker.dateFrom && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={new Date(stageForm.dateFrom)}
                          open={isShowDatePicker.dateFrom}
                          mode="date"
                          is24Hour={true}
                          display="spinner"
                          onChange={(event, selectedDate) => {
                            console.log(selectedDate);
                            const currentDate =
                              selectedDate || new Date(stageForm.dateFrom);
                            setIsShowDatePicker({
                              ...isShowDatePicker,
                              dateFrom: false,
                            });
                            setStageForm({
                              ...stageForm,
                              dateFrom: currentDate.toISOString(),
                            });
                          }}
                          textColor="#7FB640"
                        />
                      )}
                    </View>
                    {/* To date */}
                    <View style={styles.stageDate}>
                      <Text style={[styles.textTitle, { marginLeft: 5 }]}>
                        đến{" "}
                      </Text>
                      <TouchableOpacity
                        style={[styles.inputDate]}
                        onPress={() =>
                          setIsShowDatePicker({
                            ...isShowDatePicker,
                            dateTo: true,
                          })
                        }
                      >
                        <Text>
                          {new Date(stageForm.dateTo).toLocaleDateString()}
                        </Text>
                      </TouchableOpacity>
                      {isShowDatePicker.dateTo && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={new Date(stageForm.dateTo)}
                          open={isShowDatePicker.dateTo}
                          mode="date"
                          is24Hour={true}
                          display="spinner"
                          onChange={(event, selectedDate) => {
                            console.log(selectedDate);
                            const currentDate =
                              selectedDate || new Date(stageForm.dateTo);
                            setIsShowDatePicker({
                              ...isShowDatePicker,
                              dateTo: false,
                            });
                            setStageForm({
                              ...stageForm,
                              dateTo: currentDate.toISOString(),
                            });
                          }}
                          textColor="#7FB640"
                        />
                      )}
                    </View>
                  </View>
                  {/* title */}
                  <TextInput
                    style={[styles.input, { marginTop: -10, fontSize: 16 }]}
                    textColor="black"
                    mode="outlined"
                    inputMode="text"
                    activeOutlineColor="#7FB640"
                    placeholder="Tên giai đoạn canh tác"
                    onChangeText={(text) =>
                      setStageForm({ ...stageForm, titleStage: text })
                    }
                    value={stageForm.titleStage}
                  />
                </View>
                {/* //icons */}
                <TouchableOpacity onPress={() => handleAddStage()}>
                  <AntDesign name="pluscircleo" size={26} color="#7FB640" />
                </TouchableOpacity>
              </View>
              {stageList.length == 0 && (
                <Text style={styles.errorMessage}>
                  {touched.areaNumber && errors.areaNumber && errors.areaNumber}
                </Text>
              )}

              {stageList.length > 0 && (
                <View style={styles.stageList}>
                  {stageList.map((stage, index) => (
                    <View
                      key={`Stage-${index}`}
                      style={styles.stageItemWrapper}
                    >
                      <View style={styles.stageTitle}>
                        <Text style={styles.stageText}>{stage.titleStage}</Text>
                      </View>
                      <View style={styles.stageTime}>
                        <Text style={styles.stageText}>
                          {`${new Date(
                            stage.dateFrom
                          ).toLocaleDateString()} - ${new Date(
                            stage.dateTo
                          ).toLocaleDateString()}`}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setStageSelected(stage);
                          setConfirmVisible(true);
                        }}
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={28}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleSubmit}
              >
                <Text style={styles.createButtonText}>Tạo nhật ký</Text>
              </TouchableOpacity>
              <ConfirmationModal
                title="Xác nhận"
                content="Bạn có chắc bạn muốn xoá giai đoạn này"
                visible={confirmVisible}
                onDismiss={() => {
                  setStageSelected(null);
                  setConfirmVisible(false);
                }}
                onConfirm={() => {
                  if (stageSelected) {
                    const newStageList = stageList.filter(
                      (stage) => stage.titleStage != stageSelected.titleStage
                    );
                    setStageList(newStageList);
                    setStageSelected(null);
                    setConfirmVisible(false);
                    Toast.show({
                      type: "success",
                      text1: "Đã xoá thành công!",
                    });
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "Xoá thất bại!",
                    });
                  }
                }}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  stageFormContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stageFormContent: {
    width: "90%",
    justifyContent: "center",
  },
  stageDateContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stageDate: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    // marginBottom: 5,
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
    width: "75%",
    height: 50,
    lineHeight: 50,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    borderColor: "#4878D9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "#D9D9D9",
    borderWidth: 1,
  },
  input: {
    height: 50,
    lineHeight: 20,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    borderColor: "#D9D9D9",
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
    height: 18,
  },
  button: {
    backgroundColor: "#1646A9",
    borderRadius: 20,
    paddingVertical: 4,
    marginTop: 20,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  stageList: {
    gap: 10,
    marginVertical: 20,
  },
  stageItemWrapper: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  stageTitle: {
    borderRadius: 7,
    backgroundColor: "#7FB640",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: "45%",
  },
  stageText: {
    color: "#fff",
  },
  stageTime: {
    borderRadius: 7,
    backgroundColor: "#D26426",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: "50%",
  },
  createButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateDiaryScreen;
