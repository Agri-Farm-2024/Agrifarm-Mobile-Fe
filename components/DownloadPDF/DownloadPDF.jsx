import React, { forwardRef } from "react";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native-paper";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export const DownloadPDF = forwardRef((props, ref) => {
  const handleDownloadPdf = async () => {
    console.log("Download PDF");
    try {
      const contract = {
        booking_id: "454-5454-5454-4554-Ư4545W",
        createAt: "2024-11-24",
        farmOwner: "John Doe",
        landrenter: "Jane Smith",
        pricePerMonth: 500,
        position: "District A",
        purpose: "Agriculture",
      };

      const htmlContent = `
            <html>
              <body>
                <h1 style="text-align: center;">HỢP ĐỒNG THUÊ ĐẤT</h1>
                <p style="text-align: right;">Đồng Nai, ${contract.createAt}</p>
                <h3>I. Bên cho thuê đất:</h3>
                <p>${contract.farmOwner}</p>
                <h3>II. Bên thuê đất:</h3>
                <p>${contract.landrenter}</p>
                <h3>III. Điều khoản hợp đồng:</h3>
                <p>1. Diện tích đất: ${contract.pricePerMonth} m2</p>
                <p>2. Vị trí: ${contract.position}</p>
                <p>3. Mục đích sử dụng: ${contract.purpose}</p>
              </body>
            </html>
          `;

      // Generate PDF from HTML content
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // Ensure the file has a .pdf extension
      const fileName = `Hợp_đồng_${contract.booking_id}.pdf`;
      const downloadUri = FileSystem.documentDirectory + fileName;

      // Move the generated PDF to the device's local storage
      await FileSystem.moveAsync({
        from: uri,
        to: downloadUri,
      });

      // Check if the file exists and is accessible
      const fileExists = await FileSystem.getInfoAsync(downloadUri);
      if (fileExists.exists) {
        console.log("File saved successfully:", downloadUri);

        // Notify the user
        Toast.show({
          type: "info",
          text1: "PDF đã được tải xuống",
          text2: `Tệp PDF đã được lưu tại: ${downloadUri}`,
        });
      } else {
        throw new Error("File not found after download.");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi khi tải PDF",
        text2: error.message,
      });
    }
  };

  React.useImperativeHandle(ref, () => ({
    handleDownloadPdf,
  }));

  return <View></View>;
});
