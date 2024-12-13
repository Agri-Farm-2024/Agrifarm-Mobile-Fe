import React, { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  formatDate,
  formatDateToDDMMYYYY,
  formatDateToVN,
  formatNumber,
} from "../../../utils";
import EmptyComponent from "../../../components/EmptyComponent/EmptyComponent";
import { DownloadPDF } from "../../../components/DownloadPDF/DownloadPDF";

const ContractComponent = ({ contract, isDownload }) => {
  const downLoadRef = useRef();
  const [textSize, setTextSize] = useState(16);
  console.log(contract);

  if (!contract) return;
  <EmptyComponent message="Không có hợp đồng" />;

  return (
    <View>
      <View style={styles.buttonContainer}>
        {/* <Button
          mode="contained"
          onPress={increaseTextSize}
          style={styles.textButton}
          accessibilityLabel="Increase text size"
        >
          Phóng to
        </Button>
        <Button
          mode="contained"
          onPress={decreaseTextSize}
          style={styles.textButton}
          accessibilityLabel="Decrease text size"
        >
          Thu nhỏ
        </Button> */}
        {isDownload && (
          <Button
            mode="contained"
            onPress={() => {
              if (downLoadRef.current) {
                downLoadRef.current.handleDownloadPdf();
              }
            }}
            style={{
              borderColor: "orange",
              backgroundColor: "white",
              borderWidth: 1,
            }}
            textColor="orange"
          >
            Tải PDF
          </Button>
        )}
      </View>
      <ScrollView style={styles.container}>
        <Text>
          <Text style={styles.bold}>Số:</Text> ......
        </Text>

        <View style={styles.centered}>
          <Text style={[styles.bold, styles.centered]}>
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Text>
          <Text style={styles.centered}>Độc lập - Tự do - Hạnh phúc</Text>
        </View>

        <View style={styles.rightAligned}>
          <Text style={[styles.bold, styles.rightAligned]}>
            Đồng Nai,{" "}
            <Text style={[styles.italic, styles.rightAligned]}>
              {formatDateToDDMMYYYY(contract?.createAt)}
            </Text>
          </Text>
        </View>

        <Text style={styles.centered}>HỢP ĐỒNG THUÊ ĐẤT</Text>

        <Text style={styles.justify}>
          Căn cứ Luật Đất đai ngày 29 tháng 11 năm 2013;
        </Text>

        <Text style={styles.justify}>
          Căn cứ Nghị định số 43/2014/NĐ-CP ngày 15 tháng 5 năm 2014 của Chính
          phủ quy định chi tiết thi hành một số điều của Luật Đất đai;
        </Text>

        <Text style={styles.justify}>
          Căn cứ Thông tư số 30/2014/TT-BTNMT ngày 02 tháng 6 năm 2014 của Bộ
          trưởng Bộ Tài nguyên và Môi trường quy định về hồ sơ giao đất, cho
          thuê đất, chuyển mục đích sử dụng đất, thu hồi đất;
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          I. Bên cho thuê đất:
        </Text>
        <Text style={styles.bold}>{contract.farmOwner}</Text>
        <Text>
          <Text>Địa chỉ: </Text>268 Ấp Trung Tâm, Thanh Bình, Trảng Bom, Đồng
          Nai
        </Text>
        <Text>
          <Text>Điện thoại: </Text>0909 123 456
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>II. Bên thuê đất:</Text>
        <Text>
          <Text>Tên: </Text>
          <Text style={styles.bold}>{contract.landrenter}</Text>
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          III. Các điều khoản của hợp đồng thuê đất:
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 1. Diện tích đất cho thuê:
        </Text>
        <Text>
          1. Diện tích đất: <Text style={styles.italic}>{contract.area}</Text>{" "}
          m² (ghi rõ bằng số và bằng chữ, đơn vị là mét vuông)
        </Text>
        <Text>
          2. Vị trí: <Text style={styles.italic}>{contract.position}</Text> của
          trang trại
        </Text>
        <Text>
          3. Thời hạn thuê đất:{" "}
          <Text style={styles.italic}>{contract.totalMonth}</Text> tháng
        </Text>
        <Text>
          4. Mục đích sử dụng đất thuê:{" "}
          <Text style={styles.italic}>{contract.purpose}</Text>
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 2. Tiền thuê đất:
        </Text>
        <Text>
          1. Giá thuê đất là{" "}
          <Text style={styles.italic}>
            {formatNumber(contract.pricePerMonth)}
          </Text>{" "}
          VND
        </Text>
        <Text>3. Phương thức thanh toán: Chuyển Khoản</Text>
        <Text>4. Nơi nộp tiền: MB Bank</Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 3. Việc sử dụng đất trên khu đất thuê phải phù hợp với mục đích
          sử dụng đất đã ghi tại Điều 1 của Hợp đồng này
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 4.Quyền và nghĩa vụ của các bên :
        </Text>
        <Text>
          1. Bên cho thuê đất bảo đảm việc sử dụng đất của Bên thuê đất trong
          thời gian thực hiện hợp đồng, không được chuyển giao quyền sử dụng khu
          đất trên cho bên thứ ba, chấp hành quyết định thu hồi đất theo quy
          định của pháp luật về đất đai;
        </Text>
        <Text>
          2. Trong thời gian thực hiện hợp đồng, Bên thuê đất có các quyền và
          nghĩa vụ theo quy định của pháp luật về đất đai.
        </Text>
        <Text>
          3. Trong thời hạn hợp đồng còn hiệu lực thi hành Nếu bên thuê đất có
          gia hạn hợp đồng: Nếu muốn tiếp tục thuê đất sau khi hợp đồng kết
          thúc, yêu cầu phải được gửi trước 2 tháng. Trường hợp có bên thứ ba
          thuê sau khi hết hợp đồng thì sẽ gửi yêu cầu cho bên thuê đất thuê là
          có muốn thuê tiếp sau khi hết hợp đồng hay không.Bên cho thuê sẽ xem
          tình trạng đất có phù hợp cho gia hạn hay không (xử lí trong 1 tuần từ
          ngày nhận đơn yêu cầu)
        </Text>
        <Text>
          4. Bên thuê đất không có quyền chuyển nhượng đất cho bên thứ ba trong
          thời gian hợp đồng còn hiệu lực.
        </Text>
        <Text>
          5. Vi phạm hợp đồng: Nếu bên thuê đất làm hư đất canh tác thì phải đền
          bù theo quy định tiền do bên cho thuê quyết định
        </Text>
        <Text>
          6. Thời gian thuê: Nếu chọn quy trình chuẩn VietGap sẽ thuê ngắn hạn.
          Nếu tự canh tác sẽ tùy thời gian thuê của người thuê đất.
        </Text>
        <Text>
          7.Thu tiền hợp đồng Hợp đồng từ 1 năm trở lên sẽ thu tiền theo mốc (6
          tháng thu 1 lần). Nếu HĐ 1 năm sẽ thu 1 lần
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 5. Chấm dứt hợp đồng:
        </Text>
        <Text>1. Hợp đồng hết thời hạn thuê và không được gia hạn.</Text>
        <Text>
          2. Các bên thống nhất chấm dứt hợp đồng theo yêu cầu của một bên và
          được cơ quan nhà nước có thẩm quyền chấp thuận.
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 6. Giải quyết tài sản gắn liền với đất:
        </Text>
        <Text>
          Việc giải quyết tài sản gắn liền với đất sau khi kết thúc hợp đồng sẽ
          được thực hiện theo quy định của pháp luật.
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>Điều 7. Cam kết:</Text>
        <Text>
          Hai bên cam kết thực hiện đúng các điều khoản hợp đồng. Nếu vi phạm,
          bên vi phạm phải bồi thường thiệt hại.
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 8. Hiệu lực hợp đồng:
        </Text>
        <Text>
          Hợp đồng có hiệu lực từ ngày ký và được lập thành 04 bản, mỗi bên giữ
          một bản và gửi đến cơ quan thuế, kho bạc nhà nước nơi thu tiền thuê
          đất.
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 9. Điều khoản bảo mật:
        </Text>
        <Text>
          Các bên cam kết bảo mật thông tin về hợp đồng, các điều khoản trong
          hợp đồng cũng như thông tin tài chính liên quan đến hợp đồng thuê đất
          này.
        </Text>

        <Text style={[styles.leftAligned, styles.bold]}>
          Điều 10. Giải quyết tranh chấp:
        </Text>
        <Text>
          Mọi tranh chấp phát sinh từ hợp đồng này sẽ được giải quyết qua thương
          lượng. Nếu không thể thương lượng thành công, tranh chấp sẽ được giải
          quyết tại Tòa án có thẩm quyền.
        </Text>

        <View style={styles.signatureContainer}>
          <Text>Bên thuê đất </Text>
          <Text>Bên cho thuê đất </Text>
        </View>
      </ScrollView>
      <DownloadPDF ref={downLoadRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textButton: {
    backgroundColor: "#7fb640",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
    marginTop: 10,
  },
  italic: {
    fontStyle: "italic",
    marginTop: 10,
  },
  centered: {
    textAlign: "center",
    marginTop: 10,
  },
  rightAligned: {
    textAlign: "right",
    marginTop: 10,
  },
  justify: {
    textAlign: "justify",
    marginTop: 10,
  },
  leftAligned: {
    textAlign: "left",
    marginTop: 10,
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});

export default ContractComponent;
