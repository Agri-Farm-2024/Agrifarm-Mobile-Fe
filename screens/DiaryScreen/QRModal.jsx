import React from "react";
import { Button, Dialog, Portal, Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const API = "https://agrifarm.site";

const QRModal = ({ visible, onDismiss, onCancel, diaryId }) => {
  console.log("Show QR", `${API}/cultivation-diary/${diaryId}`);
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
        <Dialog.Content style={{ alignItems: "center" }}>
          <QRCode
            size={250}
            style={{ width: "100%" }}
            value={`${API}/cultivation-diary/${diaryId}`}
            logo={require("./../../assets/agrifarm-logo.png")}
            logoSize={30}
            logoBackgroundColor="transparent"
          />
        </Dialog.Content>
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
    marginBottom: 10,
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
    width: "40%",
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

export default QRModal;
