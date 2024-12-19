import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DropdownComponent from "../../../components/DropdownComponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Button, TextInput } from "react-native-paper";
import { getMaterial } from "../../../redux/slices/materialSlice";
import TextEditor from "../../../components/TextEditor";
import { capitalizeFirstLetter, formatDate } from "../../../utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  approveSpecificProcess,
  getSpecificProcessDetail,
  updateSpecificProcess,
} from "../../../redux/slices/processSlice";
import { getSpecificProcessDetailSelector } from "../../../redux/selectors";
import ActivityIndicatorComponent from "../../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

const PAGE_SIZE = 100;
const UpdateSpecificProcessScreen = ({ route, navigation }) => {
  const { specificProcess } = route.params;
  // console.log("specificProcess", JSON.stringify(specificProcess));

  const dispatch = useDispatch();

  const [stages, setStages] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [pageNumberMaterial, setPageNumberMaterial] = useState(1);
  const [hasMoreMaterial, setHasMoreMaterial] = useState(true);
  const [isLoadingMaterial, setIsLoadingMaterial] = useState(false);
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState([]);

  const processDetailSeletor = useSelector(getSpecificProcessDetailSelector);
  console.log("processDetailSeletor", JSON.stringify(processDetailSeletor));

  useEffect(() => {
    fetchMaterialOptions(1);
    fetchProcessDetail();
    console.log("Stage", JSON.stringify(stages));
  }, []);

  useEffect(() => {
    if (
      processDetailSeletor &&
      processDetailSeletor?.process_technical_specific_stage
    ) {
      let visibleArr = [];
      specificProcess.process_technical_specific_stage.map(
        (stage, stageIndex) => {
          visibleArr = [
            ...visibleArr,
            {
              stageStart: false,
              stageEnd: false,
              content: [],
            },
          ];
          stage.process_technical_specific_stage_content.map(
            (stageContent, stageContentIndex) => {
              visibleArr[stageIndex].content = [
                ...visibleArr[stageIndex].content,
                {
                  contentStart: false,
                  contentEnd: false,
                },
              ];
            }
          );
        }
      );
      console.log(
        "visibleArr: " + JSON.stringify(visibleArr),
        JSON.stringify(specificProcess?.process_technical_specific_stage)
      );
      setVisibleDatePicker(visibleArr);
      setStages(specificProcess?.process_technical_specific_stage);
    }
  }, [processDetailSeletor]);

  const fetchProcessDetail = () => {
    try {
      if (specificProcess?.process_technical_specific_id) {
        setIsLoadingProcess(true);
        dispatch(
          getSpecificProcessDetail(
            specificProcess.process_technical_specific_id
          )
        ).then((res) => {
          setIsLoadingProcess(false);
        });
      }
    } catch (error) {
      setIsLoadingProcess(false);
      console.log(
        "Failed to fetch detail specific process",
        JSON.stringify(error)
      );
    }
  };

  const fetchMaterialOptions = (pageIndex) => {
    const params = {
      page_size: PAGE_SIZE,
      page_index: pageIndex,
    };

    setIsLoadingMaterial(true);
    dispatch(getMaterial(params))
      .then((response) => {
        console.log("response materialOptions: " + JSON.stringify(response));
        if (response.payload && response.payload.statusCode === 200) {
          if (
            response.payload.metadata &&
            response.payload.metadata.materials &&
            response.payload.metadata.materials.length > 0
          ) {
            const optionData = response.payload.metadata.materials.map(
              (material) => ({
                value: material.material_id,
                label: capitalizeFirstLetter(material.name),
              })
            );
            console.log("Option data: " + JSON.stringify(optionData));
            setMaterialOptions(optionData);
            setPageNumberMaterial(pageIndex);
            setIsLoadingMaterial(false);

            //Check whether has more options to fetch
            if (response.payload.metadata.pagination.total_page == pageIndex) {
              setHasMoreMaterial(false);
            }
          }
        }
      })
      .catch((error) => {
        setIsLoadingMaterial(false);
        console.log("Error loading material options", error);
      });
  };

  const handleScrollMaterialOption = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height * 0.75;

    if (isCloseToBottom && !isLoading) {
      if (!isLoadingMaterial && hasMoreMaterial) {
        fetchMaterialOptions(pageNumberMaterial + 1);
      }
    }
  };

  const addStage = () => {
    setStages([
      ...stages,
      {
        process_technical_specific_stage_id: Date.now(),
        stage_title: "",
        process_technical_specific_stage_content: [
          {
            time_start: new Date().toISOString(),
            time_end: new Date().toISOString(),
            title: "",
            content: "",
          },
        ],
        process_technical_specific_stage_material: [
          { material_id: "", quantity: "" },
        ],
      },
    ]);

    setVisibleDatePicker((prev) => [
      ...prev,
      {
        stageStart: false,
        stageEnd: false,
        content: [],
      },
    ]);
  };

  const removeStage = (id, stageIndex) => {
    setStages(
      stages.map((stage) =>
        stage.process_technical_specific_stage_id == id
          ? { ...stage, is_deleted: true }
          : stage
      )
    );

    let newArr = visibleDatePicker;
    newArr.splice(stageIndex, 1); // remove 1 stage from visible datepicker
    setVisibleDatePicker([...newArr]);
  };

  const addInputBlock = (stageId) => {
    console.log("Stage id to add", stageId);
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.process_technical_specific_stage_id === stageId
          ? {
              ...stage,
              process_technical_specific_stage_content: [
                ...stage.process_technical_specific_stage_content,
                {
                  time_start: new Date().toISOString(),
                  time_end: new Date().toISOString(),
                  title: "",
                  content: "",
                },
              ],
            }
          : stage
      )
    );

    const stageIndexToAdd = stages
      .filter((stageItem) => !stageItem?.is_deleted)
      .findIndex(
        (stage) => stage.process_technical_specific_stage_id === stageId
      );

    //add an visible stage for new block datetimepicker
    if (stageIndexToAdd) {
      let newVisibleArr = visibleDatePicker;
      console.log(
        "Index stage to add content",
        stageIndexToAdd,
        JSON.stringify(newVisibleArr[stageIndexToAdd]?.content),
        JSON.stringify(newVisibleArr)
      );
      newVisibleArr[stageIndexToAdd].content = [
        ...newVisibleArr[stageIndexToAdd].content,
        {
          contentStart: false,
          contentEnd: false,
        },
      ];
      setVisibleDatePicker([...newVisibleArr]);
      console.log("new arr after add", JSON.stringify(newVisibleArr));
    }
  };

  const addMaterialBlock = (stageId) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.process_technical_specific_stage_id === stageId
          ? {
              ...stage,
              process_technical_specific_stage_material: [
                ...stage.process_technical_specific_stage_material,
                {
                  material_id: "",
                  quantity: "",
                },
              ],
            }
          : stage
      )
    );
  };

  const removeInputBlock = (stageId, index) => {
    const lengthOfThisStage = stages
      .filter(
        (stage) => stage.process_technical_specific_stage_id === stageId
      )[0]
      .process_technical_specific_stage_content.filter(
        (contentItem) => !contentItem?.is_deleted
      ).length;
    if (lengthOfThisStage > 1) {
      let existIndex = 0;
      setStages((prevStages) =>
        prevStages.map((stage) =>
          stage.process_technical_specific_stage_id === stageId
            ? {
                ...stage,
                process_technical_specific_stage_content:
                  stage.process_technical_specific_stage_content.map(
                    (stageContent, idx) => {
                      if (!stageContent?.is_deleted) {
                        if (existIndex == index) {
                          existIndex = existIndex + 1;
                          return { ...stageContent, is_deleted: true };
                        } else {
                          existIndex = existIndex + 1;
                          return stageContent;
                        }
                      } else {
                        return stageContent;
                      }
                    }
                  ),
              }
            : stage
        )
      );

      const stageIndexToRemove = stages
        .filter((stage) => !stage?.is_deleted)
        .findIndex(
          (stage) => stage.process_technical_specific_stage_id === stageId
        );

      //Remove a block from the visible state datetimepicker
      let newArr = visibleDatePicker;
      newArr[stageIndexToRemove].content.splice(0, 1);
      setVisibleDatePicker([...newArr]);
      console.log("newArr after remove: " + JSON.stringify(newArr));
    } else {
      Toast.show({
        type: "error",
        text1: "Phải có nội dung giai đoạn",
      });
    }
  };

  const removeMaterialBlock = (stageId, index) => {
    let existIndex = 0;
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.process_technical_specific_stage_id === stageId
          ? {
              ...stage,
              process_technical_specific_stage_material:
                stage.process_technical_specific_stage_material.map(
                  (materialItem, idx) => {
                    if (!materialItem?.is_deleted) {
                      if (existIndex == index) {
                        existIndex = existIndex + 1;
                        return { ...materialItem, is_deleted: true };
                      } else {
                        existIndex = existIndex + 1;
                        return materialItem;
                      }
                    } else {
                      return materialItem;
                    }
                  }
                ),
            }
          : stage
      )
    );
  };

  const handleCheckValidateMaterial = () => {
    // props.setPlantStages(stages);

    let isFalse = false;
    stages.map((stage, stageIndex) => {
      //Check whether have empty material

      if (
        stage.process_technical_specific_stage_material.length > 0 &&
        stage.process_technical_specific_stage_material.filter(
          (material) => !material?.is_deleted
        ).length > 0
      ) {
        let materialIds = [];
        stage.process_technical_specific_stage_material
          .filter((material) => !material?.is_deleted)
          .map((material, materialIndex) => {
            if (
              !material.material_id ||
              !material.quantity ||
              material.material_id.trim() == "" ||
              material.quantity == ""
            ) {
              Toast.show({
                type: "error",
                text1: `Giai đoạn ${stageIndex + 1}`,
                text2: `Vật tư ${materialIndex + 1} ở giai đoạn ${
                  stageIndex + 1
                } không được bỏ trống.`,
              });
              isFalse = true;
            }

            //Check the material duplicate in one stage
            if (materialIds.includes(material.material_id)) {
              isFalse = true;
              Toast.show({
                type: "error",
                text1: `Vật tư ${materialIndex + 1} ở giai đoạn ${
                  stageIndex + 1
                } đã được chọn vui lòng chọn.`,
                text2: `Vui lòng chọn vật tư khác`,
              });
            } else {
              materialIds = [...materialIds, material.material_id];
            }
          });
      }
    });

    return isFalse;
  };

  const handleCheckValidateDate = () => {
    // props.setPlantStages(stages);
    let isFalse = false;

    stages
      .filter((stage) => !stage?.is_deleted)
      .map((stage, idxStage) => {
        if (!isFalse) {
          if (!stage.stage_title.trim()) {
            Toast.show({
              type: "error",
              text1: `Giai đoạn ${idxStage + 1}`,
              text2: `Ô "Tiêu đề" ở giai đoạn ${
                idxStage + 1
              } không được để trống`,
            });
            isFalse = true;
          }

          if (stage.process_technical_specific_stage_content.length == 0) {
            Toast.show({
              type: "error",
              text1: `Giai đoạn ${idxStage + 1}`,
              text2: `Nội dung của giai đoạn không được bỏ trống`,
            });
            isFalse = true;
          } else {
            stage.process_technical_specific_stage_content
              .filter((item) => !item?.is_deleted)
              .map((input, idxInput) => {
                if (input) {
                  if (!input.title.trim()) {
                    Toast.show({
                      type: "error",
                      text1: `Giai đoạn ${idxStage + 1}`,
                      text2: `Ô "Tiêu đề" ở bước ${
                        idxInput + 1
                      } không được để trống`,
                    });
                    isFalse = true;
                  }

                  // Check if 'content' field is empty
                  else if (!input.content.trim()) {
                    Toast.show({
                      type: "error",
                      text1: `Giai đoạn ${idxStage + 1}`,
                      text2: `Ô "Nội dung" ở bước ${
                        idxInput + 1
                      } không được để trống`,
                    });
                    isFalse = true;
                  }
                }
              });
          }
        }
      });

    stages
      .filter((stage) => !stage?.is_deleted)
      .map((stage, idxStage) => {
        if (!isFalse) {
          // check time between stage
          if (idxStage > 0) {
            // const lastToPrev =
            //   stages[idxStage - 1].process_technical_specific_stage_content[
            //     stages[idxStage - 1].process_technical_specific_stage_content
            //       .length - 1
            //   ].time_end;
            const lastToPrev = stages[
              idxStage - 1
            ].process_technical_specific_stage_content
              .slice()
              .reverse()
              .find((item) => !item.is_deleted).time_end;

            // const firstPresentTo =
            //   stage.process_technical_specific_stage_content[0].time_start;
            const firstPresentTo =
              stage.process_technical_specific_stage_content
                .slice()
                .find((item) => !item.is_deleted).time_start;
            if (new Date(firstPresentTo) <= new Date(lastToPrev)) {
              Toast.show({
                type: "error",
                text1: `Kiểm tra lại ngày của giai đoạn ${idxStage} và ${
                  idxStage + 1
                }`,
                text2: `Thời gian cuối của giai đoạn ${idxStage} và thời gian đầu của ${
                  idxStage + 1
                } `,
              });
              isFalse = true;
            }
          }
          stage.process_technical_specific_stage_content
            .filter((item) => !item?.is_deleted)
            .map((input, idxInput) => {
              //   Check validate from and to
              if (new Date(input.time_start) > new Date(input.time_end)) {
                Toast.show({
                  type: "error",
                  text1: `Kiểm tra lại ngày của giai đoạn ${idxStage + 1}`,
                  text2: `Tại bước ${idxInput + 1} của giai đoạn`,
                });
                isFalse = true;
              }

              //   Check from date between input of Stage
              if (idxInput > 0) {
                const lastToInputPrev =
                  stage.process_technical_specific_stage_content.filter(
                    (item) => !item?.is_deleted
                  )[idxInput - 1].time_end;
                const firstFromInputPresent = input.time_start;

                if (
                  new Date(firstFromInputPresent) <= new Date(lastToInputPrev)
                ) {
                  Toast.show({
                    type: "error",
                    text1: `Kiểm tra lại ngày của giai đoạn ${idxStage + 1}`,
                    text2: `Tại bước ${idxInput} và bước ${
                      idxInput + 1
                    } của giai đoạn`,
                  });
                  isFalse = true;
                }
              }
            });
        }
      });

    const checkMaterial = handleCheckValidateMaterial();
    return isFalse || checkMaterial;
  };

  const getDateValue = (stage, inputIndex) => {
    console.log("Get date value", stage, inputIndex);
    const time_start = stage.process_technical_specific_stage_content.filter(
      (stageContent) => !stageContent?.is_deleted
    );
    return new Date(time_start[inputIndex].time_start);
  };

  const handleSubmitProcess = () => {
    console.log("Submit process", JSON.stringify(stages));
    const isValidInput = handleCheckValidateDate();
    if (!isValidInput) {
      const formData = {
        time_start: specificProcess.time_start,
        time_end: specificProcess.time_end,
        stage: stages.map((stage) => ({
          process_technical_specific_stage_id:
            stage.process_technical_specific_stage_id.toString().includes("-")
              ? stage.process_technical_specific_stage_id
              : null,
          stage_title: stage.stage_title,
          stage_numberic_order: stage?.stage_numberic_order
            ? stage.stage_numberic_order
            : null,
          time_start: stage.time_start,
          time_end: stage.time_end,
          material: stage.process_technical_specific_stage_material.map(
            (material) => ({
              process_technical_specific_stage_material_id:
                material?.process_technical_specific_stage_material_id
                  ? material?.process_technical_specific_stage_material_id
                  : null,
              material_id: material?.material_id,
              quantity: material?.quantity,
              is_deleted: material?.is_deleted ? true : null,
            })
          ),
          content: stage.process_technical_specific_stage_content.map(
            (content) => ({
              process_technical_specific_stage_content_id:
                content?.process_technical_specific_stage_content_id
                  ? content?.process_technical_specific_stage_content_id
                  : null,
              title: content.title,
              content: content.content,
              content_numberic_order: content?.content_numberic_order
                ? content?.content_numberic_order
                : null,
              time_start: content.time_start,
              time_end: content.time_end,
              is_deleted: content?.is_deleted ? true : null,
            })
          ),
          is_deleted: stage?.is_deleted ? true : null,
        })),
      };
      console.log("form data submit", JSON.stringify(formData));
      const processId = specificProcess.process_technical_specific_id;
      const params = {
        formData: formData,
        processId: processId,
      };
      dispatch(updateSpecificProcess(params)).then((updateResponse) => {
        console.log("Update response", JSON.stringify(updateResponse));
        if (updateResponse.payload.statusCode != 200) {
          Toast.show({
            type: "error",
            text1: "Duyệt quy trình không thành công!",
          });
        }
        if (updateResponse.payload.statusCode == 200) {
          dispatch(approveSpecificProcess(processId)).then(
            (approveResponse) => {
              console.log("Approve response", approveResponse);
              if (approveResponse.payload.statusCode != 200) {
                if (approveResponse.payload.statusCode == 400) {
                  Toast.show({
                    type: "error",
                    text1: approveResponse?.payload?.message,
                  });
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Duyệt quy trình không thành công!",
                  });
                }
              }
              if (approveResponse.payload.statusCode == 200) {
                Toast.show({
                  type: "success",
                  text1: "Duyệt quy trình thành công!",
                });
                navigation.goBack();
              }
            }
          );
        }
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoadingProcess && <ActivityIndicatorComponent />}
      {!isLoadingProcess && processDetailSeletor && (
        <ScrollView keyboardDismissMode="on-drag" style={styles.container}>
          <View style={styles.fiedldWrapper}>
            <Text style={styles.title}>Tên quy trình</Text>
            <TextInput
              readOnly
              style={styles.content}
              mode="outlined"
              activeOutlineColor="#7FB640"
              textColor="#707070"
              inputMode="text"
              value={`${
                specificProcess?.process_technical_standard?.plant_season?.plant
                  ?.name
              } ${formatDate(
                specificProcess?.process_technical_specific_stage[0].time_start,
                2
              )} - ${formatDate(
                specificProcess?.process_technical_specific_stage[
                  specificProcess?.process_technical_specific_stage?.length - 1
                ].time_end,
                2
              )}`}
            />
          </View>
          <View style={styles.fiedldWrapper}>
            <Text style={styles.title}>Mùa vụ</Text>
            <TextInput
              readOnly
              style={styles.content}
              mode="outlined"
              activeOutlineColor="#7FB640"
              textColor="#707070"
              value={`${specificProcess?.process_technical_standard?.plant_season?.plant?.name} tháng ${specificProcess?.process_technical_standard?.plant_season?.month_start}`}
              inputMode="text"
            />
          </View>

          <View>
            <Text style={styles.sub_header}>Kế hoạch trồng trọt:</Text>

            {stages &&
              stages?.length > 0 &&
              stages
                .filter((stage) => !stage?.is_deleted)
                .map((stage, indexStage) => (
                  <View
                    key={`Stage ${indexStage}`}
                    style={styles.inputStageContainer}
                  >
                    <View style={styles.inputRow}>
                      <Text
                        style={[
                          styles.sub_header,
                          { color: "#7FB640", fontWeight: "bold" },
                        ]}
                      >
                        Giai đoạn {indexStage + 1}:
                      </Text>
                      <TextInput
                        mode="outlined"
                        activeOutlineColor="#7FB640"
                        textColor="black"
                        inputMode="text"
                        style={styles.input}
                        placeholder={`Tên giai đoạn`}
                        value={stage.stage_title}
                        onChangeText={(text) => {
                          setStages((prevStages) =>
                            prevStages.map((stageItem) =>
                              stageItem.process_technical_specific_stage_id ===
                              stage.process_technical_specific_stage_id
                                ? {
                                    ...stageItem,
                                    stage_title: text,
                                  }
                                : stageItem
                            )
                          );
                        }}
                      />
                      {indexStage ===
                        stages.filter((stageItem) => !stageItem?.is_deleted)
                          .length -
                          1 && (
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={addStage}
                        >
                          <MaterialCommunityIcons
                            name="plus-circle-outline"
                            size={25}
                            color="#7fb640"
                          />
                        </TouchableOpacity>
                      )}
                      {indexStage !== 0 && (
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => {
                            if (
                              stages.filter(
                                (stageItem) => !stageItem?.is_deleted
                              )?.length > 1
                            ) {
                              removeStage(
                                stage.process_technical_specific_stage_id,
                                indexStage
                              );
                            } else {
                              Toast.show({
                                type: "error",
                                text1: "Phải có giai đoạn",
                              });
                            }
                          }}
                        >
                          <MaterialCommunityIcons
                            name="delete-outline"
                            size={25}
                            color="#d91515"
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    {stage.process_technical_specific_stage_content.filter(
                      (stageContent) => !stageContent?.is_deleted
                    ).length == 0 && (
                      <Button
                        style={{
                          marginTop: 10,
                          borderRadius: 7,
                          borderStyle: "dashed",
                        }}
                        mode="outlined"
                        onPress={() =>
                          addInputBlock(
                            stage.process_technical_specific_stage_id
                          )
                        }
                        icon={"plus"}
                      >
                        Thêm nội dung
                      </Button>
                    )}

                    {/* Dynamic Input Blocks for this stage */}
                    {stage.process_technical_specific_stage_content
                      .filter((stageContent) => !stageContent?.is_deleted)
                      .map((input, inputIndex) => (
                        <View
                          key={`Stage content ${inputIndex} in Stage ${indexStage}`}
                          style={styles.inputDateContainer}
                        >
                          <View style={[styles.inputRow, styles.marginTop]}>
                            <Text style={styles.label}>Từ</Text>
                            <TouchableOpacity
                              style={[
                                styles.inputDate,
                                indexStage == 0 &&
                                  inputIndex == 0 && {
                                    backgroundColor: "#cacaca",
                                    color: "#707070",
                                  },
                              ]}
                              onPress={() => {
                                console.log(
                                  "Press Date start ",
                                  indexStage,
                                  inputIndex
                                );
                                if (!(indexStage == 0 && inputIndex == 0)) {
                                  let newVisibleArr = visibleDatePicker;
                                  console.log(
                                    "newVisibleArr press",
                                    newVisibleArr[indexStage]?.content[
                                      inputIndex
                                    ],
                                    JSON.stringify(newVisibleArr)
                                  );
                                  if (
                                    newVisibleArr[indexStage]?.content[
                                      inputIndex
                                    ]
                                  ) {
                                    newVisibleArr[indexStage].content[
                                      inputIndex
                                    ] = {
                                      contentEnd: false,
                                      contentStart: true,
                                    };
                                    setVisibleDatePicker([...newVisibleArr]);
                                  }
                                }
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    indexStage == 0 && inputIndex == 0
                                      ? "#707070"
                                      : "#000000",
                                }}
                              >
                                {formatDate(
                                  stage.process_technical_specific_stage_content.filter(
                                    (stageContent) => !stageContent?.is_deleted
                                  )[inputIndex].time_start,
                                  0
                                )}
                              </Text>
                            </TouchableOpacity>

                            {visibleDatePicker[indexStage]?.content[
                              inputIndex
                            ] &&
                              visibleDatePicker[indexStage]?.content[inputIndex]
                                ?.contentStart && (
                                <DateTimePicker
                                  testID="dateTimePicker"
                                  value={getDateValue(stage, inputIndex)}
                                  mode="date"
                                  is24Hour={true}
                                  display="spinner"
                                  onChange={(event, selectedDate) => {
                                    console.log(selectedDate);
                                    setVisibleDatePicker((prevState) =>
                                      prevState.map((stageItem, index) =>
                                        index == indexStage
                                          ? {
                                              ...stageItem,
                                              content: stageItem.content.map(
                                                (content, contentIdx) =>
                                                  contentIdx == inputIndex
                                                    ? {
                                                        contentStart: false,
                                                        contentEnd: false,
                                                      }
                                                    : content
                                              ),
                                            }
                                          : stageItem
                                      )
                                    );

                                    let existIndex = 0;
                                    let existStageIndex = 0;
                                    const newArr = stages.map(
                                      (stageItem, stageIdx) => {
                                        if (!stageItem?.is_deleted) {
                                          if (existStageIndex == indexStage) {
                                            existStageIndex =
                                              existStageIndex + 1;
                                            return {
                                              ...stageItem,
                                              process_technical_specific_stage_content:
                                                stageItem.process_technical_specific_stage_content.map(
                                                  (contentItem, contentIdx) => {
                                                    if (
                                                      !contentItem?.is_deleted
                                                    ) {
                                                      if (
                                                        existIndex == inputIndex
                                                      ) {
                                                        existIndex =
                                                          existIndex + 1;
                                                        return {
                                                          ...contentItem,
                                                          time_start:
                                                            selectedDate.toISOString(),
                                                        };
                                                      } else {
                                                        existIndex =
                                                          existIndex + 1;
                                                        return contentItem;
                                                      }
                                                    } else {
                                                      return contentItem;
                                                    }
                                                  }
                                                ),
                                            };
                                          } else {
                                            existStageIndex =
                                              existStageIndex + 1;
                                            return stageItem;
                                          }
                                        } else {
                                          return stageItem;
                                        }
                                      }
                                    );
                                    setStages((prevState) => [...newArr]);
                                  }}
                                  textColor="#7FB640"
                                />
                              )}
                            <Text style={styles.label}>đến</Text>

                            <TouchableOpacity
                              style={styles.inputDate}
                              onPress={() => {
                                console.log(
                                  "Press date end ",
                                  indexStage,
                                  inputIndex
                                );
                                let newVisibleArr = visibleDatePicker;
                                console.log(
                                  "newVisibleArr press",
                                  newVisibleArr[indexStage].content[inputIndex]
                                );
                                if (
                                  newVisibleArr[indexStage]?.content[inputIndex]
                                ) {
                                  newVisibleArr[indexStage].content[
                                    inputIndex
                                  ] = {
                                    contentEnd: true,
                                    contentStart: false,
                                  };
                                  setVisibleDatePicker([...newVisibleArr]);
                                }
                              }}
                            >
                              <Text>
                                {formatDate(
                                  stage.process_technical_specific_stage_content.filter(
                                    (stageContent) => !stageContent?.is_deleted
                                  )[inputIndex].time_end,
                                  0
                                )}
                              </Text>
                            </TouchableOpacity>

                            {visibleDatePicker[indexStage]?.content[
                              inputIndex
                            ] &&
                              visibleDatePicker[indexStage]?.content[inputIndex]
                                ?.contentEnd && (
                                <DateTimePicker
                                  testID="dateTimePicker"
                                  value={getDateValue(stage, inputIndex)}
                                  mode="date"
                                  is24Hour={true}
                                  display="spinner"
                                  onChange={(event, selectedDate) => {
                                    console.log(selectedDate);

                                    setVisibleDatePicker((prevState) =>
                                      prevState.map((stageItem, index) =>
                                        index == indexStage
                                          ? {
                                              ...stageItem,
                                              content: stageItem.content.map(
                                                (content, contentIdx) =>
                                                  contentIdx == inputIndex
                                                    ? {
                                                        contentStart: false,
                                                        contentEnd: false,
                                                      }
                                                    : content
                                              ),
                                            }
                                          : stageItem
                                      )
                                    );
                                    let existIndex = 0;
                                    let existStageIndex = 0;
                                    const newArr = stages.map(
                                      (stageItem, stageIdx) => {
                                        if (!stageItem?.is_deleted) {
                                          if (existStageIndex == indexStage) {
                                            existStageIndex =
                                              existStageIndex + 1;
                                            return {
                                              ...stageItem,
                                              process_technical_specific_stage_content:
                                                stageItem.process_technical_specific_stage_content.map(
                                                  (contentItem, contentIdx) => {
                                                    if (
                                                      !contentItem?.is_deleted
                                                    ) {
                                                      if (
                                                        existIndex == inputIndex
                                                      ) {
                                                        existIndex =
                                                          existIndex + 1;
                                                        return {
                                                          ...contentItem,
                                                          time_end:
                                                            selectedDate.toISOString(),
                                                        };
                                                      } else {
                                                        existIndex =
                                                          existIndex + 1;
                                                        return contentItem;
                                                      }
                                                    } else {
                                                      return contentItem;
                                                    }
                                                  }
                                                ),
                                            };
                                          } else {
                                            existStageIndex =
                                              existStageIndex + 1;
                                            return stageItem;
                                          }
                                        } else {
                                          return stageItem;
                                        }
                                      }
                                    );
                                    setStages((prevState) => [...newArr]);
                                  }}
                                  textColor="#7FB640"
                                />
                              )}
                            {inputIndex ===
                              stage.process_technical_specific_stage_content.filter(
                                (stageContent) => !stageContent?.is_deleted
                              ).length -
                                1 && (
                              <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                  addInputBlock(
                                    stage.process_technical_specific_stage_id
                                  )
                                }
                              >
                                <MaterialCommunityIcons
                                  name="plus-circle-outline"
                                  size={25}
                                  color="#7fb640"
                                />
                              </TouchableOpacity>
                            )}
                            {!(indexStage == 0 && inputIndex == 0) && (
                              <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                  removeInputBlock(
                                    stage.process_technical_specific_stage_id,
                                    inputIndex
                                  )
                                }
                              >
                                <MaterialCommunityIcons
                                  name="delete-outline"
                                  size={25}
                                  color="#d91515"
                                />
                              </TouchableOpacity>
                            )}
                          </View>

                          {/* Additional single line input */}
                          <TextInput
                            mode="outlined"
                            activeOutlineColor="#7FB640"
                            textColor="black"
                            inputMode="text"
                            style={[styles.input, styles.marginVertical]}
                            value={input.title}
                            onChangeText={(text) => {
                              let existIndex = 0;
                              setStages((prevStages) =>
                                prevStages.map((stageItem) =>
                                  stageItem.process_technical_specific_stage_id ===
                                  stage.process_technical_specific_stage_id
                                    ? {
                                        ...stageItem,
                                        process_technical_specific_stage_content:
                                          stageItem.process_technical_specific_stage_content.map(
                                            (inputItem, idx) => {
                                              if (!inputItem?.is_deleted) {
                                                if (existIndex == inputIndex) {
                                                  existIndex = existIndex + 1;
                                                  return {
                                                    ...inputItem,
                                                    title: text,
                                                  };
                                                } else {
                                                  existIndex = existIndex + 1;
                                                  return inputItem;
                                                }
                                              } else {
                                                return inputItem;
                                              }
                                            }
                                          ),
                                      }
                                    : stageItem
                                )
                              );
                            }}
                            placeholder="Tiêu đề"
                          />

                          <View
                            style={{
                              marginBottom: 20,
                              borderRadius: 5,
                              borderColor: "#707070",
                              borderWidth: 1,
                              overflow: "hidden",
                              minHeight: 200,
                              position: "relative",
                              padding: 5,
                              paddingLeft: 10,
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <TextEditor
                              value={input.content}
                              onValueChange={(text) => {
                                console.log("Text change", text);
                                let newArr = [...stages];

                                let updatedStage = { ...newArr[indexStage] };

                                let updatedContent = [
                                  ...updatedStage.process_technical_specific_stage_content,
                                ];

                                updatedContent[inputIndex] = {
                                  ...updatedContent[inputIndex],
                                  content: text,
                                };

                                updatedStage.process_technical_specific_stage_content =
                                  updatedContent;

                                newArr[indexStage] = updatedStage;
                                setStages([...newArr]);
                              }}
                              placeholder="Nội dung"
                            />
                          </View>
                        </View>
                      ))}

                    <Text style={styles.sub_header}>
                      Vật tư cần cho giai đoạn {indexStage + 1}:
                    </Text>
                    {stage.process_technical_specific_stage_material.length ==
                      0 && (
                      <Button
                        style={{
                          borderRadius: 7,
                          borderColor: "#7FB640",
                          borderStyle: "dashed",
                        }}
                        mode="outlined"
                        onPress={() =>
                          addMaterialBlock(
                            stage.process_technical_specific_stage_id
                          )
                        }
                        icon={"plus"}
                      >
                        Thêm vât tư
                      </Button>
                    )}
                    {/* Dynamic Input Materials for this stage */}
                    {stage.process_technical_specific_stage_material
                      .filter((materialItem) => !materialItem?.is_deleted)
                      .map((material, materialIndex) => (
                        <View
                          key={materialIndex}
                          style={styles.inputDateContainer}
                        >
                          <View style={styles.inputMaterialContainer}>
                            <View style={[styles.materialInput]}>
                              <DropdownComponent
                                styleValue={{ marginTop: 0 }}
                                value={material.material_id}
                                options={materialOptions}
                                setValue={(value) => {
                                  let existIndex = 0;
                                  setStages((prevStages) =>
                                    prevStages.map((stageItem) =>
                                      stageItem.process_technical_specific_stage_id ===
                                      stage.process_technical_specific_stage_id
                                        ? {
                                            ...stageItem,
                                            process_technical_specific_stage_material:
                                              stageItem.process_technical_specific_stage_material.map(
                                                (materialItem, idx) => {
                                                  if (
                                                    !materialItem?.is_deleted
                                                  ) {
                                                    if (
                                                      existIndex ==
                                                      materialIndex
                                                    ) {
                                                      existIndex =
                                                        existIndex + 1;
                                                      return {
                                                        ...materialItem,
                                                        material_id: value,
                                                      };
                                                    } else {
                                                      existIndex =
                                                        existIndex + 1;
                                                      return materialItem;
                                                    }
                                                  } else {
                                                    return materialItem;
                                                  }
                                                }
                                              ),
                                          }
                                        : stageItem
                                    )
                                  );
                                }}
                                placeholder={"Chọn vật tư"}
                              />
                            </View>
                            <TextInput
                              mode="outlined"
                              activeOutlineColor="#7FB640"
                              textColor="black"
                              inputMode="decimal"
                              value={material.quantity + ""}
                              onChangeText={(text) => {
                                let existIndex = 0;
                                setStages((prevStages) =>
                                  prevStages.map((stageItem) =>
                                    stageItem.process_technical_specific_stage_id ===
                                    stage.process_technical_specific_stage_id
                                      ? {
                                          ...stageItem,
                                          process_technical_specific_stage_material:
                                            stageItem.process_technical_specific_stage_material.map(
                                              (materialItem, idx) => {
                                                if (!materialItem?.is_deleted) {
                                                  if (
                                                    existIndex == materialIndex
                                                  ) {
                                                    existIndex = existIndex + 1;
                                                    return {
                                                      ...materialItem,
                                                      quantity: text,
                                                    };
                                                  } else {
                                                    existIndex = existIndex + 1;
                                                    return materialItem;
                                                  }
                                                } else {
                                                  return materialItem;
                                                }
                                              }
                                            ),
                                        }
                                      : stageItem
                                  )
                                );
                              }}
                              placeholder="Số lượng"
                              style={[styles.materialInput]}
                            />
                            {materialIndex ===
                              stage.process_technical_specific_stage_material.filter(
                                (materialItem) => !materialItem?.is_deleted
                              ).length -
                                1 && (
                              <TouchableOpacity
                                onPress={() =>
                                  addMaterialBlock(
                                    stage.process_technical_specific_stage_id
                                  )
                                }
                              >
                                <MaterialCommunityIcons
                                  name="plus-circle-outline"
                                  size={25}
                                  color="#7fb640"
                                />
                              </TouchableOpacity>
                            )}
                            <TouchableOpacity
                              onPress={() =>
                                removeMaterialBlock(
                                  stage.process_technical_specific_stage_id,
                                  materialIndex
                                )
                              }
                            >
                              <MaterialCommunityIcons
                                name="delete-outline"
                                size={25}
                                color="#d91515"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                  </View>
                ))}
          </View>
        </ScrollView>
      )}
      <View style={styles.submitContainer}>
        <Button
          style={styles.submitBtn}
          mode="contained"
          onPress={() => handleSubmitProcess()}
        >
          Duyệt quy trình
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fiedldWrapper: {
    marginVertical: 20,
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    width: "100%",
    height: 40,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#cacaca",
    backgroundColor: "#e5e5e5",
    color: "#707070",
  },

  inputStageContainer: {
    marginBottom: 25,
  },
  inputMaterialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  inputDateContainer: {
    marginLeft: 10,
  },
  sub_header: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
  },
  inputDate: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#707070",
    justifyContent: "center",
    paddingLeft: 7,
  },
  materialInput: {
    width: "40%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
  },
  label: {
    fontWeight: "600",
    marginHorizontal: 3,
  },
  marginTop: {
    marginTop: 10,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  marginVertical: {
    marginVertical: 10,
  },
  multilineInput: {
    height: 94,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  submitContainer: {
    padding: 20,
  },
  submitBtn: {
    borderRadius: 7,
    paddingVertical: 3,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UpdateSpecificProcessScreen;
