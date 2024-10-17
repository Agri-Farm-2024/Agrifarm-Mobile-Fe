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
// Validation schema with Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Họ và tên là bắt buộc"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại phải là số")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "Số điện thoại không vượt quá 11 chữ số")
    .required("Số điện thoại là bắt buộc"),
  startTime: Yup.date().required("Thời gian bắt đầu là bắt buộc"),
  rentalMonths: Yup.number()
    .typeError("Số tháng cần thuê phải là số")
    .min(1, "Ít nhất là 1 tháng")
    .required("Số tháng cần thuê là bắt buộc"),
  purpose: Yup.string().required("Mục đích thuê đất là bắt buộc"), // Add this line
});

const LandLeaseInput = forwardRef((props, ref) => {
  const [startTime, setStartTime] = useState(new Date());
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
      setFieldValue("startTime", selectedDate);
      setStartTime(selectedDate);
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={props.formData}
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

            {/* Số điện thoại */}
            <Text>Số điện thoại</Text>
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    touched.phoneNumber && errors.phoneNumber
                      ? "red"
                      : "#d4d7e3",
                },
              ]}
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              keyboardType="phone-pad"
              placeholder="Số điện thoại"
            />
            {/* Thời gian bắt đầu */}
            <Text>Thời gian bắt đầu</Text>
            {touched.startTime && errors.startTime && (
              <Text style={styles.errorText}>{errors.startTime}</Text>
            )}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePicker}
            >
              <Text>
                {startTime.toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={startTime}
                mode="date"
                display="default"
                onChange={(e, selectedDate) =>
                  handleDateChange(e, selectedDate, setFieldValue)
                }
                minimumDate={new Date()} // Set the minimum date to today
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
              keyboardType="numeric"
              placeholder="Số tháng cần thuê"
            />
            {/* Mục đích thuê đất */}
            <Text>Mục đích thuê đất</Text>
            {touched.purpose && errors.purpose && (
              <Text style={styles.errorText}>{errors.purpose}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    touched.purpose && errors.purpose ? "red" : "#d4d7e3",
                },
              ]}
              onChangeText={handleChange("purpose")}
              onBlur={handleBlur("purpose")}
              value={values.purpose}
              placeholder="Mục đích thuê đất"
              multiline // Enable multiline input
              numberOfLines={4} // Adjust the number of visible lines
              textAlignVertical="top" // Align text to the top of the TextInput
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d4d7e3",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d4d7e3",
    marginTop: 5,
    marginBottom: 15,
  },
});

export default LandLeaseInput;
