import React, { useEffect, useState } from "react";
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
import DropdownComponent from "../../components/DropdownComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getListServiceSpecific,
  sendSupportService,
} from "../../redux/slices/serviceSlice";
import { capitalizeFirstLetter, formatDate } from "../../utils";

const HelpRequestModal = ({ visible, onDismiss, onSubmit }) => {
  const [filterList, setFilterList] = useState([]);
  const [service, setService] = useState(null);
  const [serviceObj, setServiceObj] = useState(null);
  const [land, setLand] = useState("Chưa có");
  const [requestType, setRequestType] = useState(null);
  const [requestContent, setRequestContent] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);

  const serviceSpcificList = useSelector(
    (state) => state.serviceSlice?.listServiceInUse?.services
  );

  useEffect(() => {
    const filterUsed = serviceSpcificList?.filter(
      (service) => service.status === "used"
    );

    const optionServices = filterUsed?.map((obj) => ({
      label: `${capitalizeFirstLetter(
        obj?.plant_season?.plant?.name
      )} ${formatDate(obj.time_start, 2)} - ${formatDate(obj.time_end, 2)}
      `,
      value: obj?.service_specific_id,
      obj: obj,
    }));

    console.log("optionServies: " + JSON.stringify(optionServices));

    setFilterList(optionServices);
  }, [serviceSpcificList]);

  useEffect(() => {
    if (service) {
      const getService = filterList.filter((item) => item.value === service);
      console.log("service: " + getService[0]?.obj?.booking_land?.land?.name);
      setLand(
        capitalizeFirstLetter(getService[0]?.obj?.booking_land?.land?.name)
      );
    } else {
      setLand("Chưa có");
    }
  }, [service]);

  const validateFields = () => {
    const isValid = requestType !== "Chọn loại hỗ trợ" && requestContent;
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

  const requestTypes = [
    {
      label: "Tư vấn qua chat",
      value: "chat",
    },
    {
      label: "Tư vấn trực tiếp",
      value: "direct",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListServiceSpecific());
  }, []);

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
          {/* <TextInput
            label="Họ và tên"
            value={name}
            onChangeText={setName}
            activeUnderlineColor="#7fb640"
            style={{ marginBottom: 20, backgroundColor: "#f5f5f5" }}
            underlineColor="white"
          /> */}

          <View style={{ marginBottom: 20 }}>
            <DropdownComponent
              options={filterList}
              placeholder="Chọn dịch vụ"
              value={service}
              setValue={(e) => setService(e)}
            />
          </View>
          <TextInput
            label="Mảnh đất sử dụng dịch vụ"
            value={land}
            disabled
            activeUnderlineColor="#7fb640"
            style={{ marginBottom: 20, backgroundColor: "#f5f5f5" }}
            underlineColor="white"
          />

          <View style={{ marginBottom: 20 }}>
            <DropdownComponent
              options={requestTypes}
              placeholder="Chọn loại hỗ trợ"
              value={requestType}
              setValue={(e) => setRequestType(e)}
            />
          </View>

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
          onSubmit(requestType, requestContent);
          console.log(
            "onSubmit: " + service + " " + requestType + " " + requestContent
          );
          Toast.show({
            type: "info",
            text1: "Đang xử lí...",
            text2: "Vui lòng chờ trong giây lát",
            visibilityTime: 0,
            autoHide: false,
          });
          const formdata = {
            service_specific_id: service,
            support_type: requestType,
            description: requestContent,
          };
          dispatch(sendSupportService(formdata))
            .then((res) => {
              setConfirmVisible(false);
              console.log("res: " + JSON.stringify(res));
              if (res.payload.statusCode === 201) {
                onDismiss();
                Toast.show({
                  type: "success",
                  text1: "Đơn đã được gửi",
                  text2: "Hệ thống sẽ xử lí đơn của bạn sớm nhất!",
                });
                setLand("Chưa có");
                setService(null);
                setRequestType(null);
                setRequestContent("");
                return;
              }

              if (res.payload.statusCode === 400) {
                if (
                  res.payload.message === "support_type should not be empty"
                ) {
                  Toast.show({
                    type: "error",
                    text1: "Đơn chưa được gửi",
                    text2: "Không được để trống loại hỗ trợ",
                  });
                  return;
                }

                if (res.payload.message === "description should not be empty") {
                  Toast.show({
                    type: "error",
                    text1: "Đơn chưa được gửi",
                    text2: "Không được để trống nội dung",
                  });
                  return;
                }

                Toast.show({
                  type: "error",
                  text1: "Đơn chưa được gửi",
                  text2: "Lỗi 400",
                });
                return;
              }

              if (res.payload.statusCode === 500) {
                Toast.show({
                  type: "error",
                  text1: "Đơn chưa được gửi",
                  text2: "Lỗi 500",
                });
                return;
              }
            })
            .catch((err) => console.log("err: " + JSON.stringify(err)));

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
