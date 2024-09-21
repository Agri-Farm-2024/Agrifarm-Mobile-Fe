import * as Yup from "yup";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const validationSchema = Yup.object().shape({
  textName: Yup.string()
    .required("Vui lòng không bỏ trống!")
    .min(2, "Tên quá ngắn")
    .max(100, "Tên quá dài"),
  dateOfBirth: Yup.date().required("Vui lòng không bỏ trống!"),
  textAddress: Yup.string().required("Vui lòng không bỏ trống!"),
  genderSelected: Yup.string().required("Vui lòng không bỏ trống!"),
  phone: Yup.string()
    .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ!")
    .required("Vui lòng không bỏ trống!"),
  textEmail: Yup.string()
    .email("Email không hợp lệ!")
    .required("Vui lòng không bỏ trống!"),
});

const initialValues = {
  textName: "",
  dateOfBirth: new Date(),
  textAddress: "",
  genderSelected: "",
  phone: "",
  textEmail: "",
};

const EditProfileScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {}}
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
              <>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Tên</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.textAddress && styles.errorOutline,
                    ]}
                    onChangeText={handleChange("textName")}
                    onBlur={handleBlur("textName")}
                    value={values.textName}
                  />
                  {touched.textName && errors.textName && (
                    <Text style={styles.errorText}>{errors.textName}</Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Ngày sinh</Text>
                  <TouchableOpacity
                    style={[
                      styles.input,
                      errors.textAddress && styles.errorOutline,
                    ]}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text>
                      {new Date(values.dateOfBirth).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(values.dateOfBirth)}
                      open={showDatePicker}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        console.log(selectedDate);
                        const currentDate =
                          selectedDate || new Date(values.dateOfBirth);
                        setShowDatePicker(false);
                        setFieldValue("dateOfBirth", currentDate.toISOString());
                      }}
                      textColor="#7FB640"
                    />
                  )}
                  {touched.dateOfBirth && errors.dateOfBirth && (
                    <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Giới tính</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 40,
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setFieldValue("genderSelected", "men")}
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.genderSelected === "men" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Ionicons
                          name="male"
                          size={24}
                          color={
                            values.genderSelected === "men" ? "white" : "black"
                          }
                        />
                        <Text
                          style={{
                            color:
                              values.genderSelected === "men"
                                ? "white"
                                : "black",
                          }}
                        >
                          Nam
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setFieldValue("genderSelected", "women")}
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.genderSelected === "women" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Ionicons
                          name="female"
                          size={24}
                          color={
                            values.genderSelected === "women"
                              ? "white"
                              : "black"
                          }
                        />
                        <Text
                          style={{
                            color:
                              values.genderSelected === "women"
                                ? "white"
                                : "black",
                          }}
                        >
                          Nữ
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {touched.genderSelected && errors.genderSelected && (
                    <Text style={styles.errorText}>
                      {errors.genderSelected}
                    </Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Địa chỉ</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.textAddress && styles.errorOutline,
                    ]}
                    onChangeText={handleChange("textAddress")}
                    onBlur={handleBlur("textAddress")}
                    value={values.textAddress}
                    placeholder="Điạ chỉ"
                  />
                  {touched.textAddress && errors.textAddress && (
                    <Text style={styles.errorText}>{errors.textAddress}</Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Email</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.textAddress && styles.errorOutline,
                    ]}
                    onChangeText={handleChange("textEmail")}
                    onBlur={handleBlur("textEmail")}
                    value={values.textEmail}
                    placeholder="Email"
                  />
                  {touched.textEmail && errors.textEmail && (
                    <Text style={styles.errorText}>{errors.textEmail}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.updateButtonText}>Cập nhật</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  infoTextContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  errorOutline: {
    borderColor: "red",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
  },
  iconGender: {
    backgroundColor: "#fff",
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#7FB640",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSelected: {
    backgroundColor: "#7FB640",
    color: "white",
  },
  updateButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
