import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";
import { capitalizeFirstLetter, formatNumber } from "../../../utils";
import { getPlantSeasonList } from "../../../redux/slices/plantSlice";
import { useDispatch, useSelector } from "react-redux";
import ActivityIndicatorComponent from "../../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { Checkbox } from "react-native-paper";

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
    .max(36, "nhiều nhất là 36 tháng")
    .required("Số tháng cần thuê là bắt buộc"),
  purpose: Yup.string().required("Mục đích thuê đất là bắt buộc"), // Add this line
});

const LandLeaseInput = forwardRef((props, ref) => {
  const [startTime, setStartTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const formikRef = React.useRef();

  const dispatch = useDispatch();
  const plantSeason = useSelector(
    (state) => state?.plantSlice?.plantSeason?.plant_seasons
  );
  const loading = useSelector((state) => state?.plantSlice?.loading);
  console.log("plantSeason: " + JSON.stringify(plantSeason));
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
      }) => {
        useEffect(() => {
          console.log(
            "handleChange: ",
            parseInt(new Date(values.startTime).getMonth())
          );

          const startMonth =
            parseInt(new Date(values.startTime).getMonth()) + 1;

          const params = {
            page_size: 50,
            page_index: 1,
            time_start: startMonth,
            total_month: parseInt(values.rentalMonths),
          };
          dispatch(getPlantSeasonList(params));
        }, [values.rentalMonths, values.startTime]);
        return (
          <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={80}>
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
                value={`${formatNumber(
                  props.land.price_booking_per_month
                )} VND`}
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
                  display="spinner"
                  onChange={(e, selectedDate) =>
                    handleDateChange(e, selectedDate, setFieldValue)
                  }
                  minimumDate={new Date()}
                />
              )}
              <Text>Số tháng cần thuê (ít nhất 6 tháng)</Text>
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
              {Number(values.rentalMonths) > 12 && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Checkbox
                    status={values.isMultiplePayment ? "checked" : "unchecked"}
                    onPress={() =>
                      setFieldValue(
                        "isMultiplePayment",
                        !values.isMultiplePayment
                      )
                    }
                    color="#7fb640"
                  />
                  <Text>Thanh toán nhiều lần</Text>
                </View>
              )}

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
                    minHeight: 80,
                  },
                ]}
                onChangeText={handleChange("purpose")}
                onBlur={handleBlur("purpose")}
                value={values.purpose}
                placeholder="Mục đích thuê đất"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <Text>Loại cây phù hợp với thời gian thuê này</Text>

                {plantSeason?.map((season, index) => (
                  <View
                    style={{
                      paddingLeft: 10,
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 6,
                        marginRight: 10,
                        marginTop: 10,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 4,
                        elevation: 3,
                      }}
                    >
                      <Text>
                        {capitalizeFirstLetter(season?.plant?.name)} -{" "}
                        {season.type === "in_season"
                          ? "mùa thuận"
                          : "mùa nghịch"}{" "}
                      </Text>
                    </View>
                  </View>
                ))}
                {plantSeason?.length <= 0 && (
                  <Text>Không có cây nào phù hợp</Text>
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        );
      }}
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
