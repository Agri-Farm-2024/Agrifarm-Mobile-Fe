import React, { useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { uploadFile } from "../../services/uploadService";
import { useDispatch } from "react-redux";
import { reportTask, reportTaskPurchase } from "../../redux/slices/taskSlice";
import DropdownComponent from "../../components/DropdownComponent";

export const ReportTaskPurchaseHarvestScreen = ({ route, navigation }) => {
  const { taskInfo } = route.params;
  const reportType = taskInfo?.request?.type;

  console.log("ReportTaskPurchaseHarvestScreen: " + JSON.stringify(taskInfo));

  const [note, setNote] = useState("");
  const [qualityPlantExpect, setQualityPlantExpect] = useState(100);
  const [massPlantExpect, setMassPlantExpect] = useState("");
  const [imageReports, setImageReports] = useState([]);
  const [videoReport, setVideoReport] = useState(null);
  const video = useRef(null);
  const dispatch = useDispatch();

  const qualityOPtions = [
    {
      label: "Tốt 🌳",
      value: 100,
    },
    {
      label: "Trung bình 🌿",
      value: 95,
    },
    {
      label: "Xấu 🌱",
      value: 90,
    },
  ];

  const handleSubmit = async (event) => {
    try {
      if (!massPlantExpect || massPlantExpect == "") {
        Toast.show({
          type: "error",
          text1: "Số lượng không được bỏ trống!",
        });
        return;
      }
      if (Number(massPlantExpect) <= 0) {
        Toast.show({
          type: "error",
          text1: "Số lượng phải lớn hơn 1",
        });
        return;
      }

      if (!qualityPlantExpect || qualityPlantExpect == "") {
        Toast.show({
          type: "error",
          text1: "Chất lượng không được bỏ trống!",
        });
        return;
      }
      if (
        Number(qualityPlantExpect) <= 0 ||
        Number(qualityPlantExpect) >= 101
      ) {
        Toast.show({
          type: "error",
          text1: "Chất lượng phải nằm khoảng 1 đến 100",
        });
        return;
      }

      if (!note || note == "") {
        Toast.show({
          type: "error",
          text1: "Ghi chú không được bỏ trống!",
        });
        return;
      }

      console.log("note: " + note);
      let reportData = {
        content: note,
        quality_plant: Number(qualityPlantExpect),
        mass_plant: Number(massPlantExpect),
        url: [],
      };
      let uploadedImagesMetadata = null;
      let uploadedVideosMetadata = null;

      if (imageReports.length > 0) {
        console.log("Upload images...");
        uploadedImagesMetadata = await Promise.all(
          imageReports.map(async (file, index) => {
            const formData = new FormData();
            console.log("file add formData", {
              uri: file.uri,
              name: file.fileName,
              type: file.mimeType,
            });
            formData.append("file", {
              uri: file.uri,
              name: file.fileName || `image_${index}.jpg`,
              type: file.mimeType || "image/jpeg",
            });
            const response = await uploadFile(formData);
            console.log("upload image", response);
            return response.metadata.folder_path;
          })
        );
      }

      // Upload videos
      if (videoReport) {
        console.log("Upload video...");
        const formData = new FormData();
        formData.append("file", {
          uri: videoReport.uri,
          name: videoReport.fileName || "video.mp4",
          type: videoReport.mimeType || "video/mp4",
        });

        uploadedVideosMetadata = await uploadFile(formData);
        console.log("uploaded videos metadata", uploadedVideosMetadata);
      }
      if (imageReports.length > 0 && uploadedImagesMetadata) {
        reportData = {
          ...reportData,
          url: uploadedImagesMetadata.map((image) => ({
            url_link: image,
            url_type: "image",
          })),
        };
      }

      if (videoReport && uploadedVideosMetadata) {
        reportData = {
          ...reportData,
          url: [
            ...reportData.url,
            {
              url_link: uploadedVideosMetadata.metadata.folder_path,
              url_type: "video",
            },
          ],
        };
      }
      // Log the metadata directly after upload
      console.log("Uploaded images metadata:", uploadedImagesMetadata);
      console.log("Uploaded videos metadata:", uploadedVideosMetadata);
      console.log("Update report data", reportData);

      //handle report task
      const formData = {
        taskId: taskInfo.task_id,
        formData: reportData,
      };
      console.log("formData to report:", JSON.stringify(formData));
      dispatch(reportTaskPurchase(formData)).then((response) => {
        console.log("response:", JSON.stringify(response));
        if (response.payload.statusCode === 201) {
          Toast.show({
            type: "success",
            text1: "Báo cáo công việc thành công!",
          });
          navigation.goBack();
        } else {
          if (response.payload.message === "Report already exist") {
            Toast.show({
              type: "error",
              text1: "Công việc này đã được báo cáo!",
            });
          } else if (
            response.payload.message ===
            "quality_plant_expect must not be greater than 100, quality_plant_expect must not be less than 1"
          ) {
            Toast.show({
              type: "error",
              text1: "Chất lượng không hợp lệ!",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Báo cáo công việc thất bại!",
            });
          }
        }
      });
    } catch (error) {
      console.log("Error report task!", JSON.stringify(error));
    }
  };

  const pickImage = async () => {
    console.log("pickImage");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("result", result);
    if (!result.canceled) {
      let imageArr = [...result.assets];
      console.log("imageArr", imageArr);
      if (imageArr.length > 3) {
        Toast.show({
          type: "error",
          text1: "Chỉ được chọn tối đa 3 ảnh",
        });
      } else {
        setImageReports(imageArr);
      }
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("result", result);
      // Set the file size limit to 20MB (20 * 1024 * 1024 bytes)
      const fileSizeLimit = 20 * 1024 * 1024;
      if (result?.assets[0]?.fileSize <= fileSizeLimit) {
        setVideoReport(result.assets[0]);
      } else {
        Toast.show({
          type: "error",
          text1: "Dung lượng video phải dưới 20MB!",
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Yêu cầu</Text>
            <Text style={styles.content}>
              {taskInfo?.request?.type === "product_puchase_harvest"
                ? "Thu hoạch nông sản"
                : "Chưa rõ"}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Số lượng thu hoạch (Kg)</Text>
            <TextInput
              value={massPlantExpect}
              onChangeText={setMassPlantExpect}
              textAlignVertical="top"
              style={[styles.textinput]}
              maxLength={10}
              placeholder="Số lượng thu hoạch"
              inputMode="decimal"
            />
          </View>
          {/* <View style={styles.rowContainer}>
            <Text style={styles.title}>Chất lượng thu hoạch</Text>
            <TextInput
              value={qualityPlantExpect}
              onChangeText={setQualityPlantExpect}
              textAlignVertical="top"
              style={[styles.textinput]}
              maxLength={3}
              placeholder="Chất lượng thu hoạch từ 1 đến 100"
              inputMode="decimal"
            />
          </View> */}
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Chất lượng thu hoạch</Text>
            <DropdownComponent
              styleValue={{
                height: 40,
                width: 200,
              }}
              placeholderStyleValue={{ fontSize: 14, color: "#707070" }}
              options={qualityOPtions}
              placeholder="Chọn chất lượng"
              value={qualityPlantExpect}
              setValue={(value) => {
                setQualityPlantExpect(value);
              }}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Ghi chú</Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              textAlignVertical="top"
              style={[styles.textinput, { minHeight: 100 }]}
              multiline
              numberOfLines={4}
              maxLength={50}
              placeholder="Ghi chú hoạt động"
              inputMode="text"
            />
          </View>
          <View
            style={[
              styles.rowContainer,
              {
                justifyContent: "space-between",
                marginTop: 40,
                alignItems: "center",
              },
            ]}
          >
            <Text style={[styles.title, { width: "50%" }]}>
              Hình ảnh báo cáo
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                icon="video-plus"
                iconColor="#ffffff"
                style={styles.fab}
                onPress={pickVideo}
              />
              <IconButton
                icon="image-plus"
                iconColor="#ffffff"
                style={styles.fab}
                onPress={pickImage}
              />
            </View>
          </View>
          <View style={styles.imageReportContainer}>
            {imageReports.length == 0 && !videoReport && (
              <Text
                style={{
                  color: "#cccccc",
                  width: "100%",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Chưa có hình ảnh
              </Text>
            )}
            {imageReports.length > 0 &&
              imageReports.map((image, index) => {
                console.log("file image", image.uri);
                return (
                  <View key={index} style={styles.imageWrapper}>
                    <Image
                      style={styles.imageReport}
                      source={{
                        uri: image.uri,
                      }}
                    />
                    <TouchableOpacity
                      style={styles.closeIcon}
                      onPress={() => {
                        const newImageList = imageReports.filter(
                          (imageReport) => imageReport.uri != image.uri
                        );
                        setImageReports(newImageList);
                      }}
                    >
                      <AntDesign name="closecircle" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            {videoReport && (
              <View style={styles.containerVideo}>
                <Video
                  ref={video}
                  style={styles.video}
                  source={{ uri: videoReport.uri }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  isMuted={false}
                />
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => {
                    setVideoReport(null);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitBtnContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={(e) => handleSubmit(e)}
        >
          <Text style={styles.submitButtonText}>Gửi báo cáo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 150,
  },
  fab: {
    backgroundColor: "#7FB640",
    borderRadius: 7,
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 30,
    position: "relative",
  },
  title: {
    width: "25%",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    fontSize: 16,
    color: "#342E37",
  },
  textinput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#707070",
    width: "70%",
    borderRadius: 5,
    color: "#342E37",
  },
  imageReportContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  imageReport: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: "center",
    objectFit: "cover",
    objectPosition: "center",
  },
  closeIcon: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  submitBtnContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  submitButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerVideo: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
