import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import DropdownComponent from "../../../components/DropdownComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import SpecificProcessComponent from "../SpecificProcessComponent/SpecificProcessComponent";

const today = new Date();
today.setHours(0, 0, 0, 0);

const SpecificProcessSchema = Yup.object().shape({
  processName: Yup.string().required("Vui lòng không bỏ trống!"),
  plantType: Yup.string().required("Vui lòng chọn loại cây!"),
  areaSize: Yup.number()
    .required("Vui lòng không bỏ trống!")
    .min(100, "Diện tích phải lớn hơn 100"),
  cultivationDate: Yup.date()
    .min(today, "Ngày canh tác không được ở quá khứ!")
    .required("Vui lòng chọn ngày canh tác!"),
});

export default function AddSpecificProcessScreen() {
  const [openSpecificProcess, setOpenSpecificProcess] = useState(false);
  const plantTypeOptions = [
    { label: "Dưa lưới", value: "Dưa lưới" },
    { label: "Dưa hấu", value: "Dưa hấu" },
    { label: "Dưa leo", value: "Dưa leo" },
    { label: "Cây ớt", value: "Cây ớt" },
  ];

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Formik
            initialValues={{
              processName: "",
              plantType: "",
              areaSize: "",
              cultivationDate: new Date(),
              showDatePicker: false,
            }}
            validationSchema={SpecificProcessSchema}
            onSubmit={(values) => {
              setOpenSpecificProcess(true);
              console.log(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <Text style={styles.label}>Tên quy trình</Text>
                <TextInput
                  style={styles.input}
                  activeOutlineColor="#7FB640"
                  textColor="black"
                  mode="outlined"
                  inputMode="text"
                  placeholder="Tên quy trình"
                  onChangeText={handleChange("processName")}
                  onBlur={handleBlur("processName")}
                  value={values.processName}
                  outlineColor={
                    touched.processName && errors.processName
                      ? "red"
                      : undefined
                  }
                />
                <Text style={styles.errorMessage}>
                  {touched.processName && errors.processName}
                </Text>

                <Text style={styles.label}>Loại cây trồng</Text>
                <DropdownComponent
                  options={plantTypeOptions}
                  placeholder="Chọn loại cây"
                  value={values.plantType}
                  setValue={(value) => setFieldValue("plantType", value)}
                />
                <Text style={styles.errorMessage}>
                  {touched.plantType && errors.plantType}
                </Text>

                <View style={{ marginBottom: 10 }}></View>

                <Text style={styles.label}>Diện tích canh tác(m2)</Text>
                <TextInput
                  style={styles.input}
                  activeOutlineColor="#7FB640"
                  textColor="black"
                  mode="outlined"
                  inputMode="numeric"
                  keyboardType="number"
                  placeholder="Diện tích canh tác"
                  onChangeText={handleChange("areaSize")}
                  onBlur={handleBlur("areaSize")}
                  value={values.areaSize}
                  outlineColor={
                    touched.areaSize && errors.areaSize ? "red" : undefined
                  }
                />
                <Text style={styles.errorMessage}>
                  {touched.areaSize && errors.areaSize}
                </Text>

                <Text style={styles.label}>Ngày canh tác</Text>
                <TouchableOpacity
                  onPress={() => setFieldValue("showDatePicker", true)}
                  style={styles.dateInput}
                >
                  <Text
                    style={{ color: values.cultivationDate ? "black" : "gray" }}
                  >
                    {values.cultivationDate
                      ? values.cultivationDate.toLocaleDateString("en-GB")
                      : "Chọn ngày canh tác"}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.errorMessage}>
                  {touched.cultivationDate && errors.cultivationDate}
                </Text>

                {values.showDatePicker && (
                  <DateTimePicker
                    value={values.cultivationDate || new Date()}
                    mode="date"
                    minimumDate={new Date()}
                    display="default"
                    onChange={(event, selectedDate) => {
                      setFieldValue("showDatePicker", false);
                      if (selectedDate) {
                        setFieldValue("cultivationDate", selectedDate);
                      }
                    }}
                  />
                )}

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Tạo quy trình</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          {openSpecificProcess && <SpecificProcessComponent />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    height: 50,
    lineHeight: 20,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 8,
    borderColor: "#D9D9D9",
  },
  dateInput: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    marginTop: 5,
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "600",
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
