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
import DropdownComponent from "../../components/DropdownComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import StandardProcessComponent from "./StandardProcessComponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const today = new Date();
today.setHours(0, 0, 0, 0);

const StandardProcessSchema = Yup.object().shape({
  processName: Yup.string().required("Vui lòng không bỏ trống!"),
  plantType: Yup.string().required("Vui lòng chọn loại cây!"),
});

export default function CreateStandardProcessScreen() {
  const [openStandardProcess, setOpenStandardProcess] = useState(false);
  const plantTypeOptions = [
    { label: "Dưa lưới", value: "Dưa lưới" },
    { label: "Dưa hấu", value: "Dưa hấu" },
    { label: "Dưa leo", value: "Dưa leo" },
    { label: "Cây ớt", value: "Cây ớt" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"}>
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
            }}
            validationSchema={StandardProcessSchema}
            onSubmit={(values) => {
              setOpenStandardProcess(true);
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

                <StandardProcessComponent
                  onSubmit={() => {
                    console.log("submit", values.processName);
                    if (values.processName == "") {
                      Toast.show({
                        type: "error",
                        text1: `Tên quy trình không được bỏ trống`,
                      });
                    } else if (values.plantType == "") {
                      Toast.show({
                        type: "error",
                        text1: `Loại cây trồng không được bỏ trống`,
                      });
                    } else {
                      Toast.show({
                        type: "success",
                        text1: "Gửi thành công",
                      });
                    }
                  }}
                />
              </>
            )}
          </Formik>
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
