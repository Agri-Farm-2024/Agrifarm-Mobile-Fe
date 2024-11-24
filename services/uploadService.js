import axios from "axios";
import { convertImageURL } from "../utils";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const API = "https://api.agrifarm.site";

export const uploadFile = async (formData) => {
  //   const formData = new FormData();
  //   formData.append("file", file, file.name);

  try {
    const response = await axios.post(convertImageURL(`/upload`), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", JSON.stringify(error));
    if (error.response.data.message === "File already exist") {
      Toast.show({
        type: "error",
        text1: "File đã tồn tại ở hệ thống",
      });
    }
    throw error;
  }
};
