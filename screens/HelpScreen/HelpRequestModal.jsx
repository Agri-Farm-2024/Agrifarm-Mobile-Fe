import React, { useState } from "react";
import {
  Button,
  Dialog,
  Portal,
  TextInput,
  Menu,
  Text,
  Icon,
  MD3Colors,
} from "react-native-paper";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { View } from "react-native";
import Toast from "react-native-toast-message"; // Import Toast

const HelpRequestModal = ({ visible, onDismiss, onSubmit }) => {
  const [name, setName] = useState("");
  const [landCode] = useState("MD0001");
  const [plantType, setPlantType] = useState("Chọn cây mai");
  const [requestType, setRequestType] = useState("Chọn loại hỗ trợ");
  const [requestContent, setRequestContent] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPlantVisible, setMenuPlantVisible] = useState(false);

  const validateFields = () => {
    const isValid =
      name &&
      plantType !== "Chọn cây mai" &&
      requestType !== "Chọn loại hỗ trợ" &&
      requestContent;
    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "Chưa gửi được đơn",
        text2: "Vui lòng điền đầy đủ thông tin!",
      });
    }
    return isValid;
  };

  const handleCheck = () => {
    if (validateFields()) {
      setConfirmVisible(true);
    }
  };

  const requestTypes = ["Tư vấn qua chat", "Hỗ trợ kỹ thuật"];
  const plantTypes = ["Cây mai", "Cây đào"];

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: "white", borderRadius: 10 }}
      >
        <Dialog.Title
          style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}
        >
          YÊU CẦU HỖ TRỢ KĨ THUẬT
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Họ và tên"
            value={name}
            onChangeText={setName}
            activeUnderlineColor="#7fb640"
            style={{ marginBottom: 20, backgroundColor: "#f5f5f5" }}
            underlineColor="white"
          />
          <TextInput
            label="Mã số mảnh đất"
            value={landCode}
            disabled
            activeUnderlineColor="#7fb640"
            style={{ marginBottom: 20, backgroundColor: "#f5f5f5" }}
            underlineColor="white"
          />

          <Menu
            visible={menuPlantVisible}
            onDismiss={() => setMenuPlantVisible(false)}
            anchor={
              <Button
                style={{
                  marginBottom: 20,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 5,
                  textAlign: "left",
                }}
                onPress={() => setMenuPlantVisible(true)}
              >
                <Text
                  style={{
                    textAlign: "left",
                    width: "100%",
                    paddingHorizontal: 10,
                    fontSize: 16,
                    paddingVertical: 10,
                  }}
                >
                  {plantType}
                  <Icon source="menu-down" size={20} />
                </Text>
              </Button>
            }
          >
            {plantTypes.map((type) => (
              <Menu.Item
                key={type}
                onPress={() => {
                  setPlantType(type);
                  setMenuPlantVisible(false);
                }}
                title={<Text style={{ width: 200 }}>{type}</Text>}
              />
            ))}
          </Menu>

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                style={{
                  marginBottom: 20,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 5,
                  textAlign: "left",
                }}
                onPress={() => setMenuVisible(true)}
              >
                <Text
                  style={{
                    textAlign: "left",
                    width: "100%",
                    paddingHorizontal: 10,
                    fontSize: 16,
                    paddingVertical: 10,
                  }}
                >
                  {requestType}
                  <Icon source="menu-down" size={20} />
                </Text>
              </Button>
            }
          >
            {requestTypes.map((type) => (
              <Menu.Item
                key={type}
                onPress={() => {
                  setRequestType(type);
                  setMenuVisible(false);
                }}
                title={<Text style={{ width: 200 }}>{type}</Text>}
              />
            ))}
          </Menu>

          <TextInput
            label="Nội dung yêu cầu"
            value={requestContent}
            onChangeText={setRequestContent}
            activeUnderlineColor="#7fb640"
            style={{
              marginBottom: 20,
              backgroundColor: "#f5f5f5",
            }}
            underlineColor="white"
            multiline
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button textColor="black" onPress={onDismiss}>
            Hủy
          </Button>
          <Button
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: "#7fb640",
            }}
            mode="contained"
            onPress={handleCheck}
          >
            GỬI ĐƠN
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Confirmation Modal */}
      <ConfirmationModal
        title="Xác nhận"
        content="Bạn có chắc bạn muốn gửi đơn"
        visible={confirmVisible}
        onDismiss={() => setConfirmVisible(false)}
        onConfirm={() => {
          onSubmit(name, landCode, plantType, requestType, requestContent);
          setConfirmVisible(false);
          onDismiss();
          Toast.show({
            type: "success",
            text1: "Đơn đã được gửi",
            text2: "Hệ thống sẽ xử lí đơn của bạn sớm nhất!",
          });
        }}
      />

      {/* Toast Component */}
      <Toast />
    </Portal>
  );
};

export default HelpRequestModal;
