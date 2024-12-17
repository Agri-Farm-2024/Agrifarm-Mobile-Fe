import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // for icons
import Toast from "react-native-toast-message";
import DropdownComponent from "../../components/DropdownComponent";
import TextEditor from "../../components/TextEditor";
import { getMaterial } from "../../redux/slices/materialSlice";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../../utils";

const PAGE_SIZE = 30;

const PlanToStandardFarmingInput = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [stages, setStages] = useState(props.plantStages || []);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [pageNumberMaterial, setPageNumberMaterial] = useState(1);
  const [hasMoreMaterial, setHasMoreMaterial] = useState(true);
  const [isLoadingMaterial, setIsLoadingMaterial] = useState(false);

  useEffect(() => {
    fetchMaterialOptions(1);
  }, []);

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

  useEffect(() => {
    if (props.plantStages.length > 0) {
      setStages(props.plantStages);
    }
  }, [props.plantStages]);

  const addStage = () => {
    setStages([
      ...stages,
      {
        id: Date.now(),
        title: "",
        inputs: [{ from: "", to: "", single: "", multiline: "" }],
        materials: [{ materialId: "", materialQuantity: "" }],
      },
    ]);
  };

  const removeStage = (id) => {
    setStages(stages.filter((stage) => stage.id !== id));
  };

  const addInputBlock = (stageId) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              inputs: [
                ...stage.inputs,
                { from: "", to: "", single: "", multiline: "" },
              ],
            }
          : stage
      )
    );
  };

  const addMaterialBlock = (stageId) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              materials: [
                ...stage.materials,
                {
                  materialId: "",
                  materialQuantity: "",
                },
              ],
            }
          : stage
      )
    );
  };

  const removeInputBlock = (stageId, index) => {
    const lengthOfThisStage = stages.filter((stage) => stage.id === stageId)[0]
      .inputs.length;
    if (lengthOfThisStage > 1) {
      setStages((prevStages) =>
        prevStages.map((stage) =>
          stage.id === stageId
            ? {
                ...stage,
                inputs: stage.inputs.filter((_, idx) => idx !== index),
              }
            : stage
        )
      );
    } else {
      Toast.show({
        type: "error",
        text1: "Phải có nội dung giai đoạn",
      });
    }
  };

  const removeMaterialBlock = (stageId, index) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              materials: stage.materials.filter((_, idx) => idx !== index),
            }
          : stage
      )
    );
    Toast.show({
      type: "error",
      text1: "Phải có vật tư của giai đoạn",
    });
  };

  const handleCheckValidateMaterial = () => {
    props.setPlantStages(stages);

    let isFalse = false;
    stages.map((stage, stageIndex) => {
      //Check whether have empty material

      if (stage.materials.length > 0) {
        let materialIds = [];
        stage.materials.map((material, materialIndex) => {
          if (
            !material.materialId ||
            !material.materialQuantity ||
            material.materialId.trim() == "" ||
            material.materialQuantity == ""
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
          if (materialIds.includes(material.materialId)) {
            isFalse = true;
            Toast.show({
              type: "error",
              text1: `Vật tư ${materialIndex + 1} ở giai đoạn ${
                stageIndex + 1
              } đã được chọn vui lòng chọn.`,
              text2: `Vui lòng chọn vật tư khác`,
            });
          } else {
            materialIds = [...materialIds, material.materialId];
          }
        });
      }
    });

    return isFalse;
  };

  const handleCheckValidateDate = () => {
    props.setPlantStages(stages);
    let isFalse = false;

    if (stages[0].inputs[0].from != 1) {
      Toast.show({
        type: "error",
        text1: `Thời gian bắt đầu giai đoạn 1 phải là 1`,
      });
      isFalse = true;
    }

    stages.map((stage, idxStage) => {
      if (!isFalse) {
        if (!stage.title.trim()) {
          Toast.show({
            type: "error",
            text1: `Giai đoạn ${idxStage + 1}`,
            text2: `Ô "Tiêu đề" ở giai đoạn ${
              idxStage + 1
            } không được để trống`,
          });
          isFalse = true;
        }

        stage.inputs.map((input, idxInput) => {
          if (input) {
            // Check if 'from' field is empty
            if (!input.from.trim()) {
              Toast.show({
                type: "error",
                text1: `Giai đoạn ${idxStage + 1}`,
                text2: `Ô "Từ ngày" ở bước ${idxInput + 1} không được để trống`,
              });
              isFalse = true;
            }

            // Check if 'to' field is empty
            else if (!input.to.trim()) {
              Toast.show({
                type: "error",
                text1: `Giai đoạn ${idxStage + 1}`,
                text2: `Ô "Đến ngày" ở bước ${
                  idxInput + 1
                } không được để trống`,
              });
              isFalse = true;
            }

            // Check if 'single' field is empty
            else if (!input.single.trim()) {
              Toast.show({
                type: "error",
                text1: `Giai đoạn ${idxStage + 1}`,
                text2: `Ô "Tiêu đề" ở bước ${idxInput + 1} không được để trống`,
              });
              isFalse = true;
            }

            // Check if 'multiline' field is empty
            else if (!input.multiline.trim()) {
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
    });

    stages.map((stage, idxStage) => {
      if (!isFalse) {
        // check time between stage
        if (idxStage > 0) {
          const lastToPrev =
            stages[idxStage - 1].inputs[stages[idxStage - 1].inputs.length - 1]
              .to;
          const firstPresentTo = stage.inputs[0].from;
          if (Number(firstPresentTo) <= Number(lastToPrev)) {
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
        stage.inputs.map((input, idxInput) => {
          //   Check validate from and to
          if (Number(input.from) > Number(input.to)) {
            Toast.show({
              type: "error",
              text1: `Kiểm tra lại ngày của giai đoạn ${idxStage + 1}`,
              text2: `Tại bước ${idxInput + 1} của giai đoạn`,
            });
            isFalse = true;
          }

          //   Check from date between input of Stage
          if (idxInput > 0) {
            const lastToInputPrev = stage.inputs[idxInput - 1].to;
            const firstFromInputPresent = input.from;

            if (Number(firstFromInputPresent) <= Number(lastToInputPrev)) {
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

  useImperativeHandle(ref, () => ({
    handleCheckValidateDate,
  }));

  return (
    <View>
      <Text style={styles.sub_header}>Kế hoạch trồng trọt:</Text>

      {stages &&
        stages?.length > 0 &&
        stages.map((stage, indexStage) => (
          <View key={stage.id} style={styles.inputStageContainer}>
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
                value={stage.title}
                onChangeText={(text) => {
                  setStages((prevStages) =>
                    prevStages.map((stageItem) =>
                      stageItem.id === stage.id
                        ? {
                            ...stageItem,
                            title: text,
                          }
                        : stageItem
                    )
                  );
                }}
              />
              {indexStage === stages.length - 1 && (
                <TouchableOpacity style={styles.iconButton} onPress={addStage}>
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={25}
                    color="#7fb640"
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  if (stages.length > 1) {
                    removeStage(stage.id);
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
            </View>

            {/* Dynamic Input Blocks for this stage */}
            {stage.inputs.map((input, inputIndex) => (
              <View key={inputIndex} style={styles.inputDateContainer}>
                <View style={[styles.inputRow, styles.marginTop]}>
                  <Text style={styles.label}>Từ ngày</Text>
                  <TextInput
                    mode="outlined"
                    activeOutlineColor="#7FB640"
                    textColor="black"
                    inputMode="numeric"
                    keyboardType="number"
                    style={[styles.input, styles.marginHorizontal]}
                    value={input.from + ""}
                    onChangeText={(text) => {
                      setStages((prevStages) =>
                        prevStages.map((stageItem) =>
                          stageItem.id === stage.id
                            ? {
                                ...stageItem,
                                inputs: stageItem.inputs.map((inputItem, idx) =>
                                  idx === inputIndex
                                    ? { ...inputItem, from: text }
                                    : inputItem
                                ),
                              }
                            : stageItem
                        )
                      );
                    }}
                    placeholder="Từ"
                  />
                  <Text style={styles.label}>đến ngày</Text>
                  <TextInput
                    mode="outlined"
                    activeOutlineColor="#7FB640"
                    textColor="black"
                    inputMode="numeric"
                    keyboardType="numeric"
                    style={[styles.input, styles.marginHorizontal]}
                    value={input.to + ""}
                    onChangeText={(text) => {
                      setStages((prevStages) =>
                        prevStages.map((stageItem) =>
                          stageItem.id === stage.id
                            ? {
                                ...stageItem,
                                inputs: stageItem.inputs.map((inputItem, idx) =>
                                  idx === inputIndex
                                    ? { ...inputItem, to: text }
                                    : inputItem
                                ),
                              }
                            : stageItem
                        )
                      );
                    }}
                    placeholder="Đến"
                  />
                  {inputIndex === stage.inputs.length - 1 && (
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => addInputBlock(stage.id)}
                    >
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={25}
                        color="#7fb640"
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => removeInputBlock(stage.id, inputIndex)}
                  >
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={25}
                      color="#d91515"
                    />
                  </TouchableOpacity>
                </View>

                {/* Additional single line input */}
                <TextInput
                  mode="outlined"
                  activeOutlineColor="#7FB640"
                  textColor="black"
                  inputMode="text"
                  style={[styles.input, styles.marginVertical]}
                  value={input.single}
                  onChangeText={(text) => {
                    setStages((prevStages) =>
                      prevStages.map((stageItem) =>
                        stageItem.id === stage.id
                          ? {
                              ...stageItem,
                              inputs: stageItem.inputs.map((inputItem, idx) =>
                                idx === inputIndex
                                  ? { ...inputItem, single: text }
                                  : inputItem
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
                    borderRadius: 8,
                    borderColor: "#aaa",
                    borderWidth: 0.5,
                    minHeight: 200,
                    padding: 10,
                    backgroundColor: "#fff",
                  }}
                >
                  <TextEditor
                    value={input.multiline}
                    onValueChange={(text) => {
                      setStages((prevStages) =>
                        prevStages.map((stageItem) =>
                          stageItem.id === stage.id
                            ? {
                                ...stageItem,
                                inputs: stageItem.inputs.map((inputItem, idx) =>
                                  idx === inputIndex
                                    ? { ...inputItem, multiline: text }
                                    : inputItem
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
            {stage.materials.length == 0 && (
              <Button
                style={{
                  borderRadius: 7,
                  borderColor: "#7FB640",
                  borderStyle: "dashed",
                }}
                mode="outlined"
                onPress={() => addMaterialBlock(stage.id)}
                icon={"plus"}
              >
                Thêm vât tư
              </Button>
            )}
            {/* Dynamic Input Materials for this stage */}
            {stage.materials.map((material, materialIndex) => (
              <View key={materialIndex} style={styles.inputDateContainer}>
                <View style={styles.inputMaterialContainer}>
                  <View style={[styles.materialInput]}>
                    <DropdownComponent
                      styleValue={{ marginTop: 0 }}
                      value={material.materialId}
                      options={materialOptions}
                      setValue={(value) => {
                        setStages((prevStages) =>
                          prevStages.map((stageItem) =>
                            stageItem.id === stage.id
                              ? {
                                  ...stageItem,
                                  materials: stageItem.materials.map(
                                    (materialItem, idx) =>
                                      idx === materialIndex
                                        ? {
                                            ...materialItem,
                                            materialId: value,
                                          }
                                        : materialItem
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
                    value={material.materialQuantity + ""}
                    onChangeText={(text) => {
                      setStages((prevStages) =>
                        prevStages.map((stageItem) =>
                          stageItem.id === stage.id
                            ? {
                                ...stageItem,
                                materials: stageItem.materials.map(
                                  (materialItem, idx) =>
                                    idx === materialIndex
                                      ? {
                                          ...materialItem,
                                          materialQuantity: text,
                                        }
                                      : materialItem
                                ),
                              }
                            : stageItem
                        )
                      );
                    }}
                    placeholder="Số lượng"
                    style={[styles.materialInput]}
                  />
                  {materialIndex === stage.materials.length - 1 && (
                    <TouchableOpacity
                      onPress={() => addMaterialBlock(stage.id)}
                    >
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={25}
                        color="#7fb640"
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => removeMaterialBlock(stage.id, materialIndex)}
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
  );
});

const styles = StyleSheet.create({
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
  materialInput: {
    width: "40%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
  },
  label: {
    fontWeight: "600",
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
});

export default PlanToStandardFarmingInput;
