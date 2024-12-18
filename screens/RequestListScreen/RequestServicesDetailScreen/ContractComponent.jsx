import React, { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  capitalizeFirstLetter,
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

  const tableHeaders = ["STT", "Sản phẩm", "Diện tích sản phẩm", "Đơn giá"];
  const tableData = [
    {
      id: 1,
      productName: contract?.productName,
      area: `${contract?.area} m2`,
      price: `${formatNumber(contract?.price)} VND`,
    },
  ];

  const renderTableRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.productName}</Text>
      <Text style={styles.cell}>{item.area}</Text>
      <Text style={styles.cell}>{item.price}</Text>
    </View>
  );

  if (!contract) return;
  <EmptyComponent message="Không có hợp đồng" />;

  return (
    <View>
      <View style={styles.buttonContainer}>
        {/* {isDownload && (
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
        )} */}
      </View>
      <ScrollView style={styles.container}>
        <Text style={[styles.textCenter, styles.header]}>HỢP ĐỒNG DỊCH VỤ</Text>
        <Text>
          <Text style={styles.bold}>Số:</Text> …..
        </Text>
        <Text style={styles.textCenter}>
          <Text style={styles.bold}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
          {"\n"}Độc lập - Tự do - Hạnh phúc
        </Text>
        <Text style={styles.textRight}>
          <Text style={styles.bold}>
            Đồng Nai,{" "}
            <Text style={styles.italic}>
              {formatDateToVN(contract?.createAt)}
            </Text>
          </Text>
        </Text>
        <Text>
          <Text style={styles.bold}>Căn cứ:</Text>
        </Text>
        <Text>• Bộ luật dân sự số 91/2015/QH13;</Text>
        <Text>• Luật Thương mại số 36/2005/QH11;</Text>
        <Text>• Thỏa thuận của các bên.</Text>
        <Text>
          Hôm nay, ngày {formatDateToVN(contract?.date || new Date())}, tại địa
          chỉ {contract?.location}, chúng tôi bao gồm:
        </Text>
        <Text>
          <Text style={styles.bold}>BÊN A (CANH TÁC):</Text>{" "}
          {contract?.landrenter?.full_name}
        </Text>
        <Text>Email: {contract?.landrenter?.email}</Text>
        <Text>
          <Text style={styles.bold}>BÊN B (DOANH NGHIỆP):</Text>{" "}
          {contract?.farmOwner}
        </Text>
        <Text>
          Dưới đây là nội dung điều khoản đã được bổ sung và hoàn chỉnh:
        </Text>
        <View>
          <Text style={styles.sectionHeader}>Điều khoản 1: Bao tiêu</Text>
          <Text style={{ fontWeight: "bold" }}>
            Điều 1: Giá thành sản phẩm bao tiêu
          </Text>
          <Text>
            Bên A và bên B ký kết Hợp đồng bao tiêu sản phẩm theo đó, bên B ứng
            vốn, công nghệ và kỹ thuật để bên A sản xuất các mặt hàng sau đó
            giao bán lại cho bên B tiêu thụ đối với những sản phẩm như sau:
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>STT</Text>
              <Text style={styles.tableCell}>Sản phẩm</Text>
              <Text style={styles.tableCell}>Diện tích sản phẩm</Text>
              <Text style={styles.tableCell}>Đơn giá</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.italic]}>1</Text>
              <Text style={[styles.tableCell, styles.italic]}>
                {capitalizeFirstLetter(contract?.productName)}
              </Text>
              <Text style={[styles.tableCell, styles.italic]}>
                {contract?.area} m2
              </Text>
              <Text style={[styles.tableCell, styles.italic]}>
                {formatNumber(contract?.price)} VND
              </Text>
            </View>
          </View>
          <Text>
            <Text style={styles.bold}>
              Quy định giá thu mua và giá dịch vụ bao tiêu:
            </Text>
          </Text>
          <Text>
            • <Text style={styles.bold}>Giá thu mua:</Text>
          </Text>
          <Text>
            {" "}
            • Khấu trừ 20% so với giá thị trường bao gồm: chi phí lợi nhuận, giá
            cả thị trường.
          </Text>
          <Text> • Khấu trừ chất lượng tại thời điểm thu hoạch (≤ 10%).</Text>
          <Text>
            {" "}
            • Sản phẩm đạt chất lượng tốt (100%) sẽ không bị khấu trừ chất
            lượng.
          </Text>
          <Text>
            {" "}
            • Sản phẩm đạt chất lượng khá (khấu trừ 5%), sản phẩm đạt trung bình
            (khấu trừ 10%).
          </Text>
          <Text>
            • <Text style={styles.bold}>Giá dịch vụ bao tiêu:</Text> Bao gồm chi
            phí nhân công thu hoạch, đóng gói, vận chuyển.
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Điều 2: Yêu cầu về sản xuất sản phẩm
          </Text>
          <Text>
            Nguồn gốc sản phẩm: Bên A phải đảm bảo được chất lượng nguồn gốc sản
            phẩm;
          </Text>
          <Text>
            Sử dụng quy trình chuẩn: bên A cam kết sử dụng cách thức quy trình
            quy chuẩn và quy định pháp luật về sản xuất các sản phẩm trong hợp
            đồng;
          </Text>
          <Text>
            Thu hoạch: bên A đảm bảo thu hoạch theo đúng quy trình, cách thức
            theo các quy chuẩn về thu hoạch;
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Điều 3: Kiểm soát chất lượng sản phẩm sau thu hoạch
          </Text>
          <Text>
            • Chuyên viên kiểm tra chất lượng sản phẩm về màu sắc, mùi vị, kích
            thước và trạng thái sản phẩm sau thu hoạch;
          </Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Điều 4: Quyền lợi và nghĩa vụ của các bên
          </Text>
          <Text>
            • Được cung cấp công nghệ, kỹ thuật để thực hiện sản xuất;
          </Text>
          <Text>
            • Được thanh toán theo quy định của Hợp đồng bao tiêu sản phẩm.
          </Text>
          <Text>
            • Bao tiêu theo giá thành tại thời điểm ký hợp đồng dịch vụ.
          </Text>
          <Text>
            • Doanh nghiệp đảm bảo bao tiêu sản phẩm có sử dụng dịch vụ canh tác
            theo quy trình chuẩn của chuyên viên thuộc doanh nghiệp.
          </Text>
          <Text>
            • Doanh nghiệp phân công chuyên viên phụ trách canh tác cùng bên A
            để đảm bảo quá trình canh tác đạt chất lượng và hiệu suất cao. Giảm
            hao hụt chất lượng và lợi nhuận cho cả hai bên.
          </Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Điều 5: Chấm dứt điều khoản bao tiêu
          </Text>
          <Text>1. Hợp đồng có thể chấm dứt trong các trường hợp sau đây:</Text>
          <Text>
            • Bên A hủy hợp đồng lúc báo cáo kiểm định hủy hợp đồng; bên hủy
            phải bồi thường gấp 3 lần tổng sản lượng dự kiến nhân với giá tiền
            lúc ký dịch vụ bao tiêu.
          </Text>
          <Text>
            • Bất kể Hợp đồng chấm dứt trong trường hợp nào, Bên B có trách
            nhiệm thanh toán đầy đủ các chi phí Bên A đến thời điểm Hợp đồng
            chấm dứt.
          </Text>
          <Text>
            • Các khoản phạt và bồi thường thiệt hại, cùng với nghĩa vụ thanh
            toán của bất kỳ Bên nào đối với Bên còn lại, phải được thực hiện
            trong vòng ba mươi (30) ngày kể từ ngày chấm dứt Hợp đồng.
          </Text>
          <Text>
            • Trường hợp bất khả kháng (thiên tai), doanh nghiệp sẽ miễn trách
            nhiệm thu mua. Doanh nghiệp sẽ đàm phán với khách hàng để hỗ trợ một
            phần tài chính và phối hợp với chính quyền để có chính sách hỗ trợ.
          </Text>

          {/* Điều khoản 2 */}
          <Text style={styles.sectionHeader}>
            Điều khoản 2: Bao thiết bị vật tư
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Điều 1: Phạm vi cung cấp vật phẩm thiết bị
          </Text>
          <Text>
            • Doanh nghiệp đảm bảo cung cấp đủ số lượng,phân loại và chất lượng
            vật tư
          </Text>
          <Text>
            • Các vật tư thiết bị được chuyên viên mang đến mảnh vườn theo từng
            giai đoạn canh tác của quy trình.
          </Text>
          <Text>
            • Thời gian giao vật tư đảm bảo trong quá trình canh tác của khách
            hàng.
          </Text>
          <Text style={{ fontWeight: "bold" }}>Điều 2:Quyền lợi công dân</Text>
          <Text> • Hàng hóa được thanh toán từ lúc mua dịch vụ.</Text>
          <Text>
            {" "}
            • Các vật tư thiết bị được bảo hành theo định kỳ máy móc..
          </Text>

          <Text style={{ fontWeight: "bold" }}>Điều 3:Vi phạm hợp đồng</Text>
          <Text>
            {" "}
            • Nếu bên doanh nghiệp không cung cấp đủ vật tư cho người canh tác
            thì đền bù thiệt hại cho quá trình canh tác của người thuê.
          </Text>

          {/* Điều khoản 3 */}
          <Text style={styles.sectionHeader}>
            Điều khoản 3: Đặc quyền quy trình
          </Text>
          <Text>
            {" "}
            • Gói dịch vụ canh tác sạch VietGAP sẽ được phân công cho nhân viên
            kỹ thuật để canh tác theo yêu cầu
          </Text>
          <Text>
            {" "}
            • Với quy trình chuẩn doanh nghiệp đưa vào sử dụng doanh nghiệp đã
            dự báo tính toán chất lượng và năng suất cho quy trình đó và định
            giá thị trường thu mua tại mùa vụ của quy trình ngay lúc mua dịch
            vụ.
          </Text>
          <Text>
            {" "}
            • Expert tạo quy trình chuẩn đảm nhận review khi tạo ra quy trình cụ
            thể
          </Text>
          <Text>
            {" "}
            • Quy trình cụ thể để thông báo từng giai đoạn quan trọng cho ng
            thuê vào 5:00pm trước ngày giai đoạn quan trọng bắt đầu.
          </Text>
          <Text>
            {" "}
            • Các giai đoạn trong quy trình được hệ thống thông báo nhắc nhở kĩ
            càng
          </Text>
          <Text>
            {" "}
            • Khi tạo quy trình kỹ thuật chuẩn có giá vật tư không thay
            đổi.Trong khi tạo quy trình canh tác cụ thể vẫn giữ nguyên giá vật
            tư ban đầu dù có phát sinh thêm vấn đề.
          </Text>

          {/* Điều khoản 5 */}
          <Text style={styles.sectionHeader}>
            Điều khoản 4: Hiệu lực của hợp đồng
          </Text>
          <Text>
            1. Hợp đồng này có hiệu lực kể từ ngày ký và được thực hiện trong
            thời gian thỏa thuận giữa các bên.
          </Text>
          <Text>
            2. Mọi sửa đổi, bổ sung hợp đồng phải được lập thành văn bản và có
            sự đồng ý của cả hai bên.
          </Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>
              <Text style={styles.bold}>ĐẠI DIỆN BÊN A</Text>
              {"\n"}(Ký, ghi rõ họ tên)
            </Text>
            <Text>
              <Text style={styles.bold}>ĐẠI DIỆN BÊN B</Text>
              {"\n"}(Ký, ghi rõ họ tên)
            </Text>
          </View>
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
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  header: { fontSize: 24, marginBottom: 16 },
  sectionHeader: { fontSize: 20, marginTop: 16, fontWeight: "bold" },
  subSectionHeader: { fontSize: 18, marginTop: 8, fontWeight: "bold" },
  table: { marginTop: 16, borderWidth: 1 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1 },
  tableCell: { flex: 1, padding: 8, borderRightWidth: 1 },
});

export default ContractComponent;
