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
import { formatNumber } from "../../../utils";

// Validation schema with Yup
// Validation schema with Yup
const validationSchema = Yup.object().shape({
  startTime: Yup.date()
    .required("Thời gian bắt đầu là bắt buộc")
    .min(
      new Date(new Date().setHours(24, 0, 0, 0)),
      "Thời gian bắt đầu phải là ngày mai trở đi"
    ),
  rentalMonths: Yup.number()
    .typeError("Số tháng cần thuê phải là số")
    .min(6, "Ít nhất là 6 tháng")
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
            <Text style={styles.title}>Thông tin yêu cầu</Text>

            <Text>Mảnh đất cần thuê</Text>
            <TextInput
              style={styles.input}
              value={props.land.name}
              editable={false}
            />
            <Text>Tiền thuê mỗi tháng</Text>
            <TextInput
              style={styles.input}
              value={`${formatNumber(props.land.price_booking_per_month)} VND`}
              editable={false}
            />
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
