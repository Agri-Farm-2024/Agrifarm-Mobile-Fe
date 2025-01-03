import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const ConfirmationModal = ({
  visible,
  onDismiss,
  onConfirm,
  title,
  content,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.contentText}>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={onConfirm}
            labelStyle={styles.confirmButtonText}
            style={styles.confirmButton}
          >
            Xác nhận
          </Button>
          <Button
            mode="outlined"
            onPress={onDismiss}
            labelStyle={styles.cancelButtonText}
            style={styles.cancelButton}
          >
            Hủy
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 15, // Round corners
    backgroundColor: "#ffffff", // Dialog background color
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4caf50", // Title color
  },
  contentText: {
    fontSize: 16,
    color: "#555", // Text color
    textAlign: "center",
    marginVertical: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderColor: "#4caf50", // Red outline for cancel
    borderWidth: 1,
  },
  cancelButtonText: {
    color: "#4caf50", // Red text for cancel
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#4caf50", // Green background for confirm
  },
  confirmButtonText: {
    color: "#ffffff", // White text for confirm
  },
});

export default ConfirmationModal;
