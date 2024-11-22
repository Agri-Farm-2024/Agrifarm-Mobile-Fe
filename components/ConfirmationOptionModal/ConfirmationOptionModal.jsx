import React from "react";
import { Button, Dialog, Portal, Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const ConfirmationOptionModal = ({
  visible,
  onDismiss,
  onConfirm,
  onCancel,
  title,
  content,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <View style={styles.closeButtonContainer}>
          <IconButton
            icon="close"
            size={30}
            onPress={onDismiss}
            style={styles.closeButton}
            iconColor="#7fb640"
          />
        </View>
        <Dialog.Content>
          <Text style={styles.title}>{title}</Text>
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
            onPress={onCancel}
            labelStyle={styles.cancelButtonText}
            style={styles.cancelButton}
          >
            Từ Chối
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    paddingBottom: 20,
  },
  closeButtonContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  closeButton: {
    borderRadius: 15,
    margin: 0,
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#7fb640",
  },
  contentText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
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
    borderColor: "#7fb640",
    borderWidth: 1,
  },
  cancelButtonText: {
    color: "#7fb640",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#7fb640",
  },
  confirmButtonText: {
    color: "#ffffff",
  },
});

export default ConfirmationOptionModal;
