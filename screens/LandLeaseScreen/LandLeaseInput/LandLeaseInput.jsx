import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Họ và tên là bắt buộc"),
  address: Yup.string().required("Địa chỉ là bắt buộc"),
  cccd: Yup.string()
    .matches(/^[0-9]+$/, "CCCD phải là số")
    .min(9, "CCCD phải có ít nhất 9 chữ số")
    .required("Số CCCD là bắt buộc"),
  birthDate: Yup.date()
    .required("Ngày sinh là bắt buộc")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "Bạn phải đủ 18 tuổi"
    ),
  rentalMonths: Yup.number()
    .typeError("Số tháng cần thuê phải là số")
    .min(1, "Ít nhất là 1 tháng")
    .required("Số tháng cần thuê là bắt buộc"),
});

const LandLeaseInput = forwardRef((props, ref) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const formikRef = React.useRef();

  // Expose the `submitForm` method to the parent
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formikRef.current?.handleSubmit();
    },
  }));

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFieldValue("birthDate", selectedDate);
      setBirthDate(selectedDate);
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={props.formData} // Use props for initial values
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.handleGetData(values);
        setSubmitting(false);
        props.onSubmitSuccess();
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
        >
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <Text style={styles.title}>Thông tin khách hàng</Text>
            {/* Họ và tên */}
            <Text>Họ và tên</Text>
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: touched.name && errors.name ? "red" : "#d4d7e3",
                },
              ]}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Họ và tên"
            />
            {/* Địa chỉ */}
            <Text>Địa chỉ</Text>
            {touched.address && errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    touched.address && errors.address ? "red" : "#d4d7e3",
                },
              ]}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              placeholder="Địa chỉ"
            />
            {/* Số CCCD */}
            <Text>Số CCCD</Text>
            {touched.cccd && errors.cccd && (
              <Text style={styles.errorText}>{errors.cccd}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: touched.cccd && errors.cccd ? "red" : "#d4d7e3",
                },
              ]}
              onChangeText={handleChange("cccd")}
              onBlur={handleBlur("cccd")}
              value={values.cccd}
              placeholder="Số CCCD"
              keyboardType="numeric"
            />
            {/* Năm sinh (Date Picker) */}
            <Text>Năm sinh</Text>
            {touched.birthDate && errors.birthDate && (
              <Text style={styles.errorText}>{errors.birthDate}</Text>
            )}
            <TouchableOpacity
              style={[
                styles.input,
                {
                  borderColor:
                    touched.birthDate && errors.birthDate ? "red" : "#d4d7e3",
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{birthDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleDateChange(event, selectedDate, setFieldValue)
                }
              />
            )}
            {/* Số tháng cần thuê */}
            <Text>Số tháng cần thuê</Text>
            {touched.rentalMonths && errors.rentalMonths && (
              <Text style={styles.errorText}>{errors.rentalMonths}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    touched.rentalMonths && errors.rentalMonths
                      ? "red"
                      : "#d4d7e3",
                },
              ]}
              onChangeText={handleChange("rentalMonths")}
              onBlur={handleBlur("rentalMonths")}
              value={values.rentalMonths}
              placeholder="Số tháng cần thuê"
              keyboardType="numeric"
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
});

const styles = StyleSheet.create({
  title: {
    color: "#242731",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default LandLeaseInput;
