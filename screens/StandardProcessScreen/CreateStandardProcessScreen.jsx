import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import DropdownComponent from "../../components/DropdownComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import StandardProcessComponent from "./StandardProcessComponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch } from "react-redux";
import {
  createStandardProcess,
  getPlantSeason,
} from "../../redux/slices/processSlice";
import { capitalizeFirstLetter } from "../../utils";
import { useLayoutEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const today = new Date();
today.setHours(0, 0, 0, 0);

const StandardProcessSchema = Yup.object().shape({
  processName: Yup.string().required("Vui lòng không bỏ trống!"),
  plantSeason: Yup.string().required("Vui lòng chọn loại cây!"),
});

const PAGE_SIZE = 50;

export default function CreateStandardProcessScreen({ navigation }) {
  const [openStandardProcess, setOpenStandardProcess] = useState(false);
  const [plantSeasonOptions, setPlantSeasonOptions] = useState([]);
  const [pageNumberPlantSeason, setPageNumberPlantSeason] = useState(1);
  const [hasMorePlantSeason, setHasMorePlantSeason] = useState(true);
  const [isLoadingPlantSeason, setIsLoadingPlantSeason] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            const url = "https://cef.vn/tag/quy-trinh-ky-thuat/";
            Linking.openURL(url).catch((err) =>
              console.error("Không thể mở URL: ", err)
            );
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Tham khảo
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const dispatch = useDispatch();

  const fetchPlantSeasonOptions = (pageIndex) => {
    setIsLoadingPlantSeason(true);
    dispatch(getPlantSeason())
      .then((response) => {
        console.log("response plantSeasonOptions: " + JSON.stringify(response));
        if (response.payload && response.payload.statusCode === 200) {
          if (
            response.payload.metadata &&
            response.payload.metadata &&
            response.payload.metadata.length > 0
          ) {
            const optionData = response.payload.metadata
              .filter((season) => season.process_technical_standard == null)
              .map((season) => ({
                value: season.plant_season_id,
                label: `Mùa vụ ${capitalizeFirstLetter(
                  season.plant.name
                )} Tháng ${season.month_start}`,
              }));
            console.log("Option data: " + JSON.stringify(optionData));
            setPlantSeasonOptions(optionData);
            setPageNumberPlantSeason(pageIndex);
            setIsLoadingPlantSeason(false);
          }
        }
      })
      .catch((error) => {
        setIsLoadingPlantSeason(false);
        console.log("Error loading plant season options", error);
      });
  };

  useEffect(() => {
    fetchPlantSeasonOptions(1);
  }, []);

  const handleCreateStandardProcess = (values) => {
    if (values.processName == "") {
      Toast.show({
        type: "error",
        text1: `Tên quy trình không được bỏ trống`,
      });
    } else if (values.plantSeason == "") {
      Toast.show({
        type: "error",
        text1: `Mùa vụ không được bỏ trống`,
      });
    } else {
      //format data for api
      const stageData = values.stages.map((stageItem, index) => ({
        stage_title: stageItem.title,
        stage_numberic_order: index + 1,
        time_start: stageItem.inputs[0].from,
        time_end: stageItem.inputs[stageItem.inputs.length - 1].to,
        material: stageItem.materials.map((materialItem, index) => ({
          material_id: materialItem.materialId,
          quantity: materialItem.materialQuantity,
        })),
        content: stageItem.inputs.map((step, stepIndex) => ({
          title: step.single,
          content_numberic_order: stepIndex + 1,
          content: step.multiline,
          time_start: step.from,
          time_end: step.to,
        })),
      }));
      const formData = {
        plant_season_id: values.plantSeason,
        name: values.processName,
        stage: stageData,
      };

      console.log("Submit to api", JSON.stringify(formData));

      dispatch(createStandardProcess(formData))
        .then((response) => {
          console.log(
            "Create standard process response",
            JSON.stringify(response)
          );
          if (response.payload.statusCode != 201) {
            if (response.payload.message == "Process name already exist") {
              Toast.show({
                type: "error",
                text1: "Tên quy trình đã tồn tại!",
              });
            } else if (
              response.payload.message == "plant season for process is exist"
            ) {
              Toast.show({
                type: "error",
                text1: "Đã tồn tại quy trình cho mùa vụ này!",
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Tạo quy trình thất bại!",
              });
            }
          }
          if (response.payload.statusCode == 201) {
            Toast.show({
              type: "success",
              text1: "Tạo quy trình thành công!",
            });
            navigation.goBack();
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Tạo quy trình thất bại!",
          });
          console.log("Error create standard process: " + error);
        });
    }
  };

  const handleScrollPlantSeasonOption = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height * 0.75;

    if (isCloseToBottom && !isLoading) {
      if (!isLoadingPlantSeason && hasMorePlantSeason) {
        fetchPlantSeasonOptions(pageNumberPlantSeason + 1);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Formik
            initialValues={{
              processName: "",
              plantSeason: "",
            }}
            validationSchema={StandardProcessSchema}
            onSubmit={(values) => {
              setOpenStandardProcess(true);
              console.log("Created standard process", values);
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
              <>
                <Text style={styles.label}>Tên quy trình</Text>
                <TextInput
                  style={styles.input}
                  activeOutlineColor="#7FB640"
                  textColor="black"
                  mode="outlined"
                  inputMode="text"
                  placeholder="Tên quy trình"
                  onChangeText={handleChange("processName")}
                  onBlur={handleBlur("processName")}
                  value={values.processName}
                  outlineColor={
                    touched.processName && errors.processName
                      ? "red"
                      : undefined
                  }
                />
                <Text style={styles.errorMessage}>
                  {touched.processName && errors.processName}
                </Text>

                <Text style={styles.label}>Mùa vụ</Text>
                {plantSeasonOptions.length > 0 && (
                  <DropdownComponent
                    options={plantSeasonOptions}
                    placeholder="Chọn mùa vụ"
                    value={values.plantSeason}
                    setValue={(value) => setFieldValue("plantSeason", value)}
                  />
                )}
                {plantSeasonOptions.length == 0 && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#707070",
                      textAlign: "center",
                    }}
                  >
                    Chưa có mùa vụ cần tạo quy trình chuẩn
                  </Text>
                )}
                <Text style={styles.errorMessage}>
                  {touched.plantSeason && errors.plantSeason}
                </Text>

                <StandardProcessComponent
                  onSubmit={(stages) => {
                    handleCreateStandardProcess({
                      ...values,
                      stages: stages,
                    });
                  }}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    height: 50,
    lineHeight: 20,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 8,
    borderColor: "#D9D9D9",
  },
  dateInput: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    marginTop: 5,
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "600",
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
