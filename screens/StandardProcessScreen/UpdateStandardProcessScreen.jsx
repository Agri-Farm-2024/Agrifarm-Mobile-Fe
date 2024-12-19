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
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Button, TextInput } from "react-native-paper";
import TextEditor from "../../components/TextEditor";
import { capitalizeFirstLetter, formatDate } from "../../utils";
import { updateStandardProcess } from "../../redux/slices/processSlice";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { getMaterial } from "../../redux/slices/materialSlice";
import { getPlantSeasonList } from "../../redux/slices/plantSlice";

const PAGE_SIZE = 100;

const UpdateStandardProcessScreen = ({ route, navigation }) => {
  const { standardProcess } = route.params;
  //   console.log("standardProcess outside", JSON.stringify(standardProcess));

  const dispatch = useDispatch();

  const [processInfo, setProcessInfo] = useState({
    name: "",
    plant_season_id: "",
  });
  const [stages, setStages] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [plantSeasonOptions, setPlantSeasonOptions] = useState([]);
  const [pageNumberMaterial, setPageNumberMaterial] = useState(1);
  const [hasMoreMaterial, setHasMoreMaterial] = useState(true);
  const [isLoadingMaterial, setIsLoadingMaterial] = useState(false);
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);

  useEffect(() => {
    fetchMaterialOptions(1);
    fetchPlantSeasonOptions(1);
    console.log("Stage", JSON.stringify(stages));
  }, []);

  useEffect(() => {
    if (standardProcess) {
      console.log("standardProcess inside", JSON.stringify(standardProcess));
      const sortStageArr = [...standardProcess?.process_standard_stage].sort(
        (a, b) => a.stage_numberic_order - b.stage_numberic_order
      );
      const sortStageContent = [...sortStageArr].map((stage, index) => {
        return {
          ...stage,
          process_standard_stage_content: [
            ...stage?.process_standard_stage_content,
          ].sort((a, b) => a.content_numberic_order - b.content_numberic_order),
        };
      });
      setStages(sortStageContent);
      console.log("setProcessDetail", JSON.stringify(sortStageArr));
      const newProcessInfo = {
        name: standardProcess?.name,
        plant_season_id: standardProcess?.plant_season?.plant_season_id,
      };
      console.log("newProcessInfo", JSON.stringify(newProcessInfo));
      setProcessInfo({ ...newProcessInfo });
    }
  }, [standardProcess]);

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

  const fetchPlantSeasonOptions = (pageIndex) => {
    const params = {
      page_size: PAGE_SIZE,
      page_index: pageIndex,
    };
    setIsLoadingMaterial(true);
    dispatch(getPlantSeasonList(params))
      .then((response) => {
        console.log("response plantSeasonOptions: " + JSON.stringify(response));
        if (response.payload && response.payload.statusCode === 200) {
          if (
            response.payload.metadata &&
            response.payload.metadata.plant_seasons &&
            response.payload.metadata.plant_seasons.length > 0
          ) {
            const optionData = response.payload.metadata.plant_seasons.map(
              (season) => ({
                value: season.plant_season_id,
                label: `Mùa vụ ${capitalizeFirstLetter(
                  season.plant.name
                )} Tháng ${season.month_start}`,
              })
            );
            console.log("Option data: " + JSON.stringify(optionData));
            setPlantSeasonOptions(optionData);
            setIsLoadingMaterial(false);
          }
        }
      })
      .catch((error) => {
        setIsLoadingMaterial(false);
        console.log("Error loading plant season options", error);
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
        process_technical_standard_stage_id: Date.now(),
        stage_title: "",
        process_standard_stage_content: [
          {
            time_start: "",
            time_end: "",
            title: "",
            content: "",
          },
        ],
        process_standard_stage_material: [{ material_id: "", quantity: "" }],
      },
    ]);
  };

  const removeStage = (id, stageIndex) => {
    setStages(
      stages.map((stage) =>
        stage.process_technical_standard_stage_id == id
          ? { ...stage, is_deleted: true }
          : stage
      )
    );
  };

  const addInputBlock = (stageId) => {
    console.log("Stage id to add", stageId);
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.process_technical_standard_stage_id === stageId
          ? {
              ...stage,
              process_standard_stage_content: [
                ...stage.process_standard_stage_content,
                {
                  time_start: "",
                  time_end: "",
                  title: "",
                  content: "",
                },
              ],
            }
          : stage
      )
    );
  };

  const addMaterialBlock = (stageId) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.process_technical_standard_stage_id === stageId
          ? {
              ...stage,
              process_standard_stage_material: [
                ...stage.process_standard_stage_material,
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
    console.log("Removing input block");
    const lengthOfThisStage = stages
      .filter(
        (stage) => stage.process_technical_standard_stage_id === stageId
      )[0]
      .process_standard_stage_content.filter(
        (contentItem) => !contentItem?.is_deleted
      ).length;
    if (lengthOfThisStage > 1) {
      let existIndex = 0;
      setStages((prevStages) =>
        prevStages.map((stage) => {
          if (stage.process_technical_standard_stage_id === stageId) {
            return {
              ...stage,
              process_standard_stage_content:
                stage.process_standard_stage_content.map(
                  (stageContent, idx) => {
                    console.log("call back");
                    if (!stageContent?.is_deleted) {
                      if (existIndex == index) {
                        console.log(
                          "exist index",
                          existIndex,
                          stageContent,
                          index
                        );
                        existIndex = existIndex + 1;
                        // return stageContent;
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
            };
          } else {
            return stage;
          }
        })
      );
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
        stage.process_technical_standard_stage_id === stageId
          ? {
              ...stage,
              process_standard_stage_material:
                stage.process_standard_stage_material.map(
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
        stage.process_standard_stage_material.length > 0 &&
        stage.process_standard_stage_material.filter(
          (material) => !material?.is_deleted
        ).length > 0
      ) {
        let materialIds = [];
        stage.process_standard_stage_material
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

          if (stage.process_standard_stage_content.length == 0) {
            Toast.show({
              type: "error",
              text1: `Giai đoạn ${idxStage + 1}`,
              text2: `Nội dung của giai đoạn không được bỏ trống`,
            });
            isFalse = true;
          } else {
            stage.process_standard_stage_content
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
            const lastToPrev = stages[
              idxStage - 1
            ].process_standard_stage_content
              .slice()
              .reverse()
              .find((item) => !item.is_deleted).time_end;

            const firstPresentTo = stage.process_standard_stage_content
              .slice()
              .find((item) => !item.is_deleted).time_start;
            if (firstPresentTo <= lastToPrev) {
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
          stage.process_standard_stage_content
            .filter((item) => !item?.is_deleted)
            .map((input, idxInput) => {
              //   Check validate from and to
              if (input.time_start > input.time_end) {
                Toast.show({
                  type: "error",
                  text1: `Kiểm tra lại ngày của giai đoạn ${idxStage + 1}`,
                  text2: `Tại bước ${idxInput + 1} của giai đoạn`,
                });
                isFalse = true;
              }

              //   Check from time between input of Stage
              if (idxInput > 0) {
                const lastToInputPrev =
                  stage.process_standard_stage_content.filter(
                    (item) => !item?.is_deleted
                  )[idxInput - 1].time_end;
                const firstFromInputPresent = input.time_start;

                if (firstFromInputPresent <= lastToInputPrev) {
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

  const handleSubmitProcess = () => {
    console.log("Submit process", JSON.stringify(stages));
    const isValidInput = handleCheckValidateDate();
    if (!isValidInput) {
      const formData = {
        name: processInfo?.name,
        stage: stages.map((stage) => {
          return {
            process_technical_standard_stage_id:
              stage.process_technical_standard_stage_id.toString().includes("-")
                ? stage.process_technical_standard_stage_id
                : null,
            stage_title: stage.stage_title,
            stage_numberic_order: stage?.stage_numberic_order
              ? stage.stage_numberic_order
              : null,
            time_start: stage.time_start,
            time_end: stage.time_end,
            material: stage.process_standard_stage_material.map((material) => ({
              process_technical_standard_stage_material_id:
                material?.process_technical_standard_stage_material_id
                  ? material?.process_technical_standard_stage_material_id
                  : null,
              material_id: material?.material_id,
              quantity: material?.quantity,
              is_deleted: material?.is_deleted ? true : null,
            })),
            content: stage.process_standard_stage_content.map((content) => ({
              process_technical_standard_stage_content_id:
                content?.process_technical_standard_stage_content_id
                  ? content?.process_technical_standard_stage_content_id
                  : null,
              title: content.title,
              content: content.content,
              content_numberic_order: content?.content_numberic_order
                ? content?.content_numberic_order
                : null,
              time_start: content.time_start,
              time_end: content.time_end,
              is_deleted: content?.is_deleted ? true : null,
            })),
            is_deleted: stage?.is_deleted ? true : null,
          };
        }),
      };
      console.log("form data submit", JSON.stringify(formData));
      const processId = standardProcess.process_technical_standard_id;
      const params = {
        formData: formData,
        processId: processId,
      };
      dispatch(updateStandardProcess(params)).then((updateResponse) => {
        console.log("Update response", JSON.stringify(updateResponse));
        if (updateResponse.payload.statusCode != 200) {
          Toast.show({
            type: "error",
            text1: "Cập nhật quy trình không thành công!",
          });
        }
        if (updateResponse.payload.statusCode == 200) {
          Toast.show({
            type: "success",
            text1: "Cập nhật quy trình thành công!",
          });
          navigation.goBack();
        }
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoadingMaterial && <ActivityIndicatorComponent />}
      {!isLoadingMaterial && standardProcess && (
        <ScrollView keyboardDismissMode="on-drag" style={styles.container}>
          <View style={styles.fiedldWrapper}>
            <Text style={styles.title}>Tên quy trình</Text>
            <TextInput
              style={styles.content}
              mode="outlined"
              activeOutlineColor="#7FB640"
              textColor="#707070"
              inputMode="text"
              readOnly
              value={capitalizeFirstLetter(processInfo?.name) || ""}
              onChange={(value) =>
                setProcessInfo((prevState) => ({ ...prevState, name: value }))
              }
            />
          </View>
          <View style={styles.fiedldWrapper}>
            <Text style={styles.title}>Mùa vụ</Text>
            <DropdownComponent
              isDisabled={true}
              options={plantSeasonOptions}
              placeholder="Chọn mùa vụ"
              value={processInfo?.plant_season_id || ""}
              setValue={(value) =>
                setProcessInfo((prevState) => ({
                  ...prevState,
                  plant_season_id: value,
                }))
              }
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
                              stageItem.process_technical_standard_stage_id ===
                              stage.process_technical_standard_stage_id
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
                                stage.process_technical_standard_stage_id,
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

                    {stage.process_standard_stage_content.filter(
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
                            stage.process_technical_standard_stage_id
                          )
                        }
                        icon={"plus"}
                      >
                        Thêm nội dung
                      </Button>
                    )}

                    {/* Dynamic Input Blocks for this stage */}
                    {stage.process_standard_stage_content
                      .filter((stageContent) => !stageContent?.is_deleted)
                      .map((input, inputIndex) => (
                        <View
                          key={`Stage content ${inputIndex} in Stage ${indexStage}`}
                          style={styles.inputDateContainer}
                        >
                          <View style={[styles.inputRow, styles.marginTop]}>
                            <Text style={styles.label}>Từ</Text>
                            <TextInput
                              mode="outlined"
                              activeOutlineColor="#7FB640"
                              textColor="black"
                              inputMode="numeric"
                              keyboardType="number"
                              style={[styles.input, styles.marginHorizontal]}
                              value={input.time_start + ""}
                              onChangeText={(text) => {
                                let existIndex = 0;
                                setStages((prevStages) =>
                                  prevStages.map((stageItem) =>
                                    stageItem.process_technical_standard_stage_id ===
                                    stage.process_technical_standard_stage_id
                                      ? {
                                          ...stageItem,
                                          process_standard_stage_content:
                                            stageItem.process_standard_stage_content.map(
                                              (inputItem, idx) => {
                                                if (!inputItem?.is_deleted) {
                                                  if (
                                                    existIndex == inputIndex
                                                  ) {
                                                    existIndex = existIndex + 1;
                                                    return {
                                                      ...inputItem,
                                                      time_start: text,
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
                              placeholder="Từ"
                            />
                            <Text style={styles.label}>đến</Text>
                            <TextInput
                              mode="outlined"
                              activeOutlineColor="#7FB640"
                              textColor="black"
                              inputMode="numeric"
                              keyboardType="number"
                              style={[styles.input, styles.marginHorizontal]}
                              value={input.time_end + ""}
                              onChangeText={(text) => {
                                let existIndex = 0;
                                setStages((prevStages) =>
                                  prevStages.map((stageItem) =>
                                    stageItem.process_technical_standard_stage_id ===
                                    stage.process_technical_standard_stage_id
                                      ? {
                                          ...stageItem,
                                          process_standard_stage_content:
                                            stageItem.process_standard_stage_content.map(
                                              (inputItem, idx) => {
                                                if (!inputItem?.is_deleted) {
                                                  if (
                                                    existIndex == inputIndex
                                                  ) {
                                                    existIndex = existIndex + 1;
                                                    return {
                                                      ...inputItem,
                                                      time_end: text,
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
                              placeholder="Từ"
                            />

                            {inputIndex ===
                              stage.process_standard_stage_content.filter(
                                (stageContent) => !stageContent?.is_deleted
                              ).length -
                                1 && (
                              <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                  addInputBlock(
                                    stage.process_technical_standard_stage_id
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
                                    stage.process_technical_standard_stage_id,
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
                                  stageItem.process_technical_standard_stage_id ===
                                  stage.process_technical_standard_stage_id
                                    ? {
                                        ...stageItem,
                                        process_standard_stage_content:
                                          stageItem.process_standard_stage_content.map(
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

                                let existIndex = 0;
                                setStages((prevStages) =>
                                  prevStages.map((stageItem) =>
                                    stageItem.process_technical_standard_stage_id ===
                                    stage.process_technical_standard_stage_id
                                      ? {
                                          ...stageItem,
                                          process_standard_stage_content:
                                            stageItem.process_standard_stage_content.map(
                                              (inputItem, idx) => {
                                                if (!inputItem?.is_deleted) {
                                                  if (
                                                    existIndex == inputIndex
                                                  ) {
                                                    existIndex = existIndex + 1;
                                                    return {
                                                      ...inputItem,
                                                      content: text,
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
                              placeholder="Nội dung"
                            />
                          </View>
                        </View>
                      ))}

                    <Text style={styles.sub_header}>
                      Vật tư cần cho giai đoạn {indexStage + 1}:
                    </Text>
                    {stage.process_standard_stage_material.filter(
                      (item) => !item?.is_deleted
                    ).length == 0 && (
                      <Button
                        style={{
                          borderRadius: 7,
                          borderColor: "#7FB640",
                          borderStyle: "dashed",
                        }}
                        mode="outlined"
                        onPress={() =>
                          addMaterialBlock(
                            stage.process_technical_standard_stage_id
                          )
                        }
                        icon={"plus"}
                      >
                        Thêm vât tư
                      </Button>
                    )}
                    {/* Dynamic Input Materials for this stage */}
                    {stage.process_standard_stage_material
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
                                      stageItem.process_technical_standard_stage_id ===
                                      stage.process_technical_standard_stage_id
                                        ? {
                                            ...stageItem,
                                            process_standard_stage_material:
                                              stageItem.process_standard_stage_material.map(
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
                                    stageItem.process_technical_standard_stage_id ===
                                    stage.process_technical_standard_stage_id
                                      ? {
                                          ...stageItem,
                                          process_standard_stage_material:
                                            stageItem.process_standard_stage_material.map(
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
                              stage.process_standard_stage_material.filter(
                                (materialItem) => !materialItem?.is_deleted
                              ).length -
                                1 && (
                              <TouchableOpacity
                                onPress={() =>
                                  addMaterialBlock(
                                    stage.process_technical_standard_stage_id
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
                                  stage.process_technical_standard_stage_id,
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
          disabled={isLoadingMaterial == true}
        >
          Cập nhật quy trình
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

export default UpdateStandardProcessScreen;
