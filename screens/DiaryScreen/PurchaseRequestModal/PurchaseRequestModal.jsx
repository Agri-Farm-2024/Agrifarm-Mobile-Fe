// PurchaseRequestModal.js
import React from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";

const PurchaseRequestModal = ({ visible, onClose }) => {
  const [expectedHarvestDate, setExpectedHarvestDate] = React.useState(
    new Date()
  );
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required("Số lượng là bắt buộc")
      .min(1, "Số lượng phải lớn hơn 0"),
    description: Yup.string()
      .required("Mô tả là bắt buộc")
      .min(5, "Mô tả phải ít nhất 5 ký tự"),
  });

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide date picker by default

    if (event.type === "set") {
      // Only update the date if the user confirms the selection
      setExpectedHarvestDate(selectedDate || expectedHarvestDate); // Fallback to current date if no date selected
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Yêu cầu thu mua</Text>
          <Text style={styles.modalMessage}>
            Bạn có chắc chắn muốn gửi yêu cầu thu mua?
          </Text>

          <Formik
            initialValues={{ quantity: "", description: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form data", values);
              // Submit your data here
              onClose(); // Close modal after submission
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                {/* Input for Sender - Disabled */}
                <TextInput
                  label="Người gửi"
                  value="John Doe" // Static value, can be changed as needed
                  editable={false} // Disable editing
                  mode="outlined"
                  style={styles.input}
                  theme={{ colors: { primary: "#7fb640" } }} // Change primary color for input
                />

                {/* Input for Service Code - Disabled */}
                <TextInput
                  label="Mã dịch vụ"
                  value="SERVICE123" // Static value, can be changed as needed
                  editable={false} // Disable editing
                  mode="outlined"
                  style={styles.input}
                  theme={{ colors: { primary: "#7fb640" } }} // Change primary color for input
                />

                {/* Input for Quantity */}
                <TextInput
                  label="Số lượng"
                  value={values.quantity}
                  onChangeText={handleChange("quantity")}
                  onBlur={handleBlur("quantity")}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric" // Restrict input to numbers
                  theme={{ colors: { primary: "#7fb640" } }} // Change primary color for input
                />
                {errors.quantity && (
                  <Text style={styles.errorText}>{errors.quantity}</Text>
                )}

                {/* Input for Description */}
                <TextInput
                  label="Mô tả"
                  value={values.description}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  mode="outlined"
                  style={styles.input}
                  multiline // Allows for multiple lines of input
                  numberOfLines={4} // Optional: sets a specific height
                  theme={{ colors: { primary: "#7fb640" } }} // Change primary color for input
                />
                {errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                {/* Expected Harvest Date */}
                <Text style={styles.label}>Ngày dự kiến thu hoạch</Text>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker(true)} // Show date picker on press
                >
                  <Text>{expectedHarvestDate.toLocaleDateString()}</Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={expectedHarvestDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange} // Handle date change
                  />
                )}

                <View style={styles.buttonContainer}>
                  <Button
                    onPress={handleSubmit} // Submit the form
                    mode="contained"
                    style={styles.button}
                    color="#7fb640" // Change primary color for button
                  >
                    Gửi yêu cầu
                  </Button>
                  <Button
                    onPress={onClose}
                    mode="outlined"
                    textColor="#7fb640" // Change primary color for button
                  >
                    Đóng
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalMessage: {
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 10, // Spacing between inputs
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  dateInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // Spacing between inputs
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#7fb640",
    marginRight: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});

export default PurchaseRequestModal;
